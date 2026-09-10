export interface NfceValidationResult {
  isValid: boolean
  uf: 'SC' | 'PR' | 'OUTRO' | null
  chaveAcesso: string
  isEligible: boolean
  reasons: string[]
}

export interface NfceItemDTO {
  codigo: string
  descricao: string
  quantidade: number
  unidade: string
  valorUnitario: number
  valorTotal: number
}

export interface NfceParsedDTO {
  chaveAcesso: string
  emitente: {
    razaoSocial: string
    cnpj: string
  }
  itens: NfceItemDTO[]
  totais: {
    qtdItens: number
    valorTotal: number
    valorPagar: number
    desconto?: number
    formaPagamento?: string
  }
  pontosEstimados: number
  dataEmissao?: string
  protocolo?: string
  uf: 'SC' | 'PR' | 'OUTRO'
}

export class NfceService {
  /**
   * Registro em memória de chaves já processadas para garantia de unicidade (RN02)
   */
  private static processedKeys = new Set<string>()

  /**
   * Extrai a chave de acesso de 44 dígitos numéricos de um texto, URL ou query string
   */
  static extractAccessKey(input: string): string | null {
    if (!input) return null

    // 1. Tenta query params (p=, chNFe=, chave=)
    const urlParamMatch = input.match(/(?:[?&](?:p|chNFe|chave|ch)=)([0-9]{44})/i)
    if (urlParamMatch) return urlParamMatch[1]

    // 2. Tenta formato padrão com pipe do QR Code SEFAZ (4226...|2|1|1|...)
    const pipeMatch = input.match(/\b([0-9]{44})\|/)
    if (pipeMatch) return pipeMatch[1]

    // 3. Sequência de 44 dígitos
    const digitsMatch = input.match(/\b([0-9]{44})\b/)
    if (digitsMatch) return digitsMatch[1]

    // 4. Sequência com separadores
    const formattedMatch = input.match(/\b(\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4})\b/)
    if (formattedMatch) {
      const clean = formattedMatch[1].replace(/[\s-]/g, '')
      if (clean.length === 44) return clean
    }

    return null
  }

  /**
   * Valida a URL ou chave da SEFAZ aplicando as regras de negócio:
   * - RN02: Unicidade e 44 dígitos
   * - RN07: Exclusividade SC (42) e PR (41)
   */
  static validate(input: string): NfceValidationResult {
    const reasons: string[] = []
    const trimmed = (input || '').trim()

    if (!trimmed) {
      return {
        isValid: false,
        uf: null,
        chaveAcesso: '',
        isEligible: false,
        reasons: ['Entrada vazia. Forneça a URL do QR Code ou a Chave de Acesso de 44 dígitos.'],
      }
    }

    let isUrl = false
    let host = ''
    try {
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        const parsed = new URL(trimmed)
        host = parsed.hostname.toLowerCase()
        isUrl = true
      }
    } catch {
      // Não é URL válida, trata como chave
    }

    const chave = this.extractAccessKey(trimmed)

    if (isUrl) {
      const isSC = host.includes('sef.sc.gov.br') || host.includes('sat.sef.sc.gov.br')
      const isPR = host.includes('fazenda.pr.gov.br') || (host.includes('svrs.rs.gov.br') && trimmed.includes('pr.gov.br'))

      if (!isSC && !isPR) {
        if (host.endsWith('.gov.br')) {
          reasons.push('A URL pertence a outro estado. O MVP aceita apenas notas da SEFAZ SC e PR (RN07).')
        } else {
          reasons.push(`O domínio "${host}" não é um portal oficial reconhecido da SEFAZ.`)
        }
      }
    }

    if (!chave) {
      reasons.push('Não foi possível extrair uma Chave de Acesso válida de 44 dígitos (RN02).')
      return {
        isValid: false,
        uf: null,
        chaveAcesso: '',
        isEligible: false,
        reasons,
      }
    }

    // RN02: 44 dígitos numéricos
    if (chave.length !== 44) {
      reasons.push(`Chave de acesso com ${chave.length} dígitos. Deve possuir exatamente 44 dígitos numéricos (RN02).`)
    }

    // RN07: UF 42 (SC) ou 41 (PR)
    const ufCode = chave.substring(0, 2)
    let uf: 'SC' | 'PR' | 'OUTRO' = 'OUTRO'
    if (ufCode === '42') {
      uf = 'SC'
    } else if (ufCode === '41') {
      uf = 'PR'
    } else {
      reasons.push(`A Chave de Acesso inicia com UF ${ufCode}. No momento, apenas notas de SC (42) e PR (41) são aceitas (RN07).`)
    }

    // RN02: Verificação anti-fraude de chave duplicada
    if (this.processedKeys.has(chave)) {
      reasons.push('Esta nota fiscal já foi processada anteriormente na plataforma (RN02).')
    }

    const isEligible = reasons.length === 0

    return {
      isValid: chave.length === 44,
      uf,
      chaveAcesso: chave,
      isEligible,
      reasons,
    }
  }

  /**
   * Marca uma chave como processada para evitar duplicidade (RN02)
   */
  static markAsProcessed(chave: string) {
    if (chave && chave.length === 44) {
      this.processedKeys.add(chave)
    }
  }

  /**
   * Converte string de valor brasileiro para float
   */
  static parseBrlNumber(val: string): number {
    if (!val) return 0
    const cleaned = val.replace(/[^\d,-]/g, '').replace(',', '.')
    const num = parseFloat(cleaned)
    return isNaN(num) ? 0 : num
  }

  /**
   * Remove tags HTML e decodifica entidades básicas
   */
  static stripHtml(html: string): string {
    if (!html) return ''
    return html
      .replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '')
      .replace(/<style[^>]*>([\S\s]*?)<\/style>/gim, '')
      .replace(/<[^>]+>/gm, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/\s+/g, ' ')
      .trim()
  }

  /**
   * Parser de HTML de NFC-e (baseado no motor do web-scrap-app)
   */
  static parseHtml(html: string, pageUrl?: string, factor: number = 1.0): NfceParsedDTO {
    const plainText = this.stripHtml(html)
    const chave = this.extractAccessKey(html) || this.extractAccessKey(plainText) || (pageUrl ? this.extractAccessKey(pageUrl) : null) || ''

    // CNPJ
    let cnpj = ''
    const cnpjMatch = html.match(/\b(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})\b/) || plainText.match(/CNPJ[:\s]*(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})/i)
    if (cnpjMatch) cnpj = cnpjMatch[1]

    // Razão Social
    let razaoSocial = ''
    const topoMatch = html.match(/class=["'][^"']*(?:txtTopo|nomeEmpresa|razaoSocial|u20)[^"']*["'][^>]*>([^<]+)/i)
    if (topoMatch) {
      razaoSocial = this.stripHtml(topoMatch[1])
    }
    if (!razaoSocial && cnpj) {
      razaoSocial = 'Estabelecimento Comercial Credenciado'
    }

    // Itens
    const itens: NfceItemDTO[] = []
    const trMatches = html.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi)
    if (trMatches) {
      for (const tr of trMatches) {
        if (tr.includes('<th') && !tr.includes('<td')) continue

        const descMatch = tr.match(/class=["'][^"']*(?:txtTit|descricao|nome)[^"']*["'][^>]*>([\s\S]*?)<\/(?:span|td|div)>/i)
        const vlTotalMatch = tr.match(/class=["'][^"']*(?:valor|Rval|total|vlTotal)[^"']*["'][^>]*>([\s\S]*?)<\/(?:span|td|div)>/i)
        const qtdMatch = tr.match(/class=["'][^"']*(?:Rqty|qtd|quantidade)[^"']*["'][^>]*>([\s\S]*?)<\/(?:span|td|div)>/i)
        const codMatch = tr.match(/class=["'][^"']*(?:RCod|codigo)[^"']*["'][^>]*>([\s\S]*?)<\/(?:span|td|div)>/i)

        if (descMatch || vlTotalMatch) {
          const desc = descMatch ? this.stripHtml(descMatch[1]) : 'Item'
          const rawVlTotal = vlTotalMatch ? this.stripHtml(vlTotalMatch[1]) : '0'
          const rawQtd = qtdMatch ? this.stripHtml(qtdMatch[1]) : '1'
          const rawCod = codMatch ? this.stripHtml(codMatch[1]).replace(/[^\d]/g, '') : ''

          const vlTotal = this.parseBrlNumber(rawVlTotal)
          const qtd = this.parseBrlNumber(rawQtd) || 1

          if (desc && (vlTotal > 0 || desc.length > 2)) {
            itens.push({
              codigo: rawCod || String(itens.length + 1),
              descricao: desc,
              quantidade: qtd,
              unidade: 'UN',
              valorUnitario: qtd > 0 && vlTotal > 0 ? vlTotal / qtd : vlTotal,
              valorTotal: vlTotal,
            })
          }
        }
      }
    }

    // Totais
    let valorPagar = 0
    const valorPagarMatch = html.match(/(?:Valor\s+a\s+pagar)[^<]*<\/label>[\s\S]*?<span[^>]*class=["'][^"']*(?:txtMax|totalNumb)[^"']*["'][^>]*>([\d.,]+)<\/span>/i)
    if (valorPagarMatch) {
      valorPagar = this.parseBrlNumber(valorPagarMatch[1])
    }

    const sumItens = itens.reduce((acc, curr) => acc + curr.valorTotal, 0)
    if (valorPagar === 0 && sumItens > 0) {
      valorPagar = sumItens
    }

    const ufPrefix = chave.substring(0, 2)
    const uf: 'SC' | 'PR' | 'OUTRO' = ufPrefix === '42' ? 'SC' : ufPrefix === '41' ? 'PR' : 'OUTRO'
    const pontosEstimados = Math.floor(valorPagar * factor)

    return {
      chaveAcesso: chave,
      emitente: {
        razaoSocial: razaoSocial || 'Estabelecimento Local',
        cnpj: cnpj || '00.000.000/0000-00',
      },
      itens,
      totais: {
        qtdItens: itens.length || 1,
        valorTotal: valorPagar,
        valorPagar,
      },
      pontosEstimados,
      uf,
    }
  }
}
