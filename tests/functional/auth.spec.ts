import { test } from "@japa/runner";
import User from "#models/user";

test.group("Auth API — Testes Exploratórios", (group) => {
  group.each.setup(async () => {
    // Limpeza de testes anteriores
    await User.query().where("email", "teste@cashme.com.br").delete();
  });

  test("deve cadastrar um novo usuário com sucesso", async ({ client, assert }) => {
    const response = await client.post("/api/v1/auth/signup").json({
      fullName: "Consumidor Teste",
      email: "teste@cashme.com.br",
      password: "password123",
      passwordConfirmation: "password123",
    });

    response.assertStatus(200);
    const body = response.body().data || response.body();
    assert.properties(body, ["user", "token"]);
    assert.equal(body.user.email, "teste@cashme.com.br");
    assert.equal(body.user.fullName, "Consumidor Teste");
    assert.exists(body.token);
  });

  test("deve rejeitar cadastro com senhas não coincidentes", async ({ client }) => {
    const response = await client.post("/api/v1/auth/signup").json({
      fullName: "Consumidor Teste",
      email: "teste@cashme.com.br",
      password: "password123",
      passwordConfirmation: "diferente123",
    });

    response.assertStatus(422);
  });

  test("deve realizar login com credenciais válidas e retornar token", async ({ client, assert }) => {
    // Primeiro cria o usuário
    await User.create({
      fullName: "Consumidor Teste",
      email: "teste@cashme.com.br",
      password: "password123",
    });

    const response = await client.post("/api/v1/auth/login").json({
      email: "teste@cashme.com.br",
      password: "password123",
    });

    response.assertStatus(200);
    const body = response.body().data || response.body();
    assert.properties(body, ["user", "token"]);
    assert.equal(body.user.email, "teste@cashme.com.br");
  });

  test("deve rejeitar login com senha incorreta", async ({ client }) => {
    await User.create({
      fullName: "Consumidor Teste",
      email: "teste@cashme.com.br",
      password: "password123",
    });

    const response = await client.post("/api/v1/auth/login").json({
      email: "teste@cashme.com.br",
      password: "senha_errada",
    });

    response.assertStatus(400);
  });

  test("deve consultar o perfil autenticado via Bearer Token", async ({ client, assert }) => {
    const user = await User.create({
      fullName: "Consumidor Teste",
      email: "teste@cashme.com.br",
      password: "password123",
    });

    const token = await User.accessTokens.create(user);

    const response = await client
      .get("/api/v1/account/profile")
      .header("Authorization", `Bearer ${token.value!.release()}`);

    response.assertStatus(200);
    const body = response.body().data || response.body();
    assert.equal(body.email, "teste@cashme.com.br");
    assert.equal(body.fullName, "Consumidor Teste");
  });

  test("deve realizar logout revogando o token", async ({ client, assert }) => {
    const user = await User.create({
      fullName: "Consumidor Teste",
      email: "teste@cashme.com.br",
      password: "password123",
    });

    const token = await User.accessTokens.create(user);
    const rawToken = token.value!.release();

    const response = await client
      .post("/api/v1/account/logout")
      .header("Authorization", `Bearer ${rawToken}`);

    response.assertStatus(200);
    assert.equal(response.body().message, "Logged out successfully");
  });
});
