/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

router.get('/', () => {
  return { hello: 'world' }
})

// Especificação OpenAPI em formato JSON
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Interface Gráfica Interativa Swagger UI
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store']).as('signup')
        router.post('customer/signup', [() => import('#controllers/user_customers_controller'), 'store']).as('customer.signup')
        router.post('establishment/signup', [() => import('#controllers/user_establishments_controller'), 'store']).as('establishment.signup')
        router.post('login', [controllers.AccessTokens, 'store']).as('login')
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show']).as('profile')
        router.get('customer/profile', [() => import('#controllers/user_customers_controller'), 'show']).as('customer.profile')
        router.put('customer/profile', [() => import('#controllers/user_customers_controller'), 'update']).as('customer.update')
        router.get('establishment/profile', [() => import('#controllers/user_establishments_controller'), 'show']).as('establishment.profile')
        router.put('establishment/profile', [() => import('#controllers/user_establishments_controller'), 'update']).as('establishment.update')
        router.post('logout', [controllers.AccessTokens, 'destroy']).as('logout')
      })
      .prefix('account')
      .as('account')
      .use(middleware.auth())

    router
      .group(() => {
        router.post('validate', [() => import('#controllers/nfce_controller'), 'validate']).as('validate')
        router.post('parse', [() => import('#controllers/nfce_controller'), 'parse']).as('parse')
      })
      .prefix('nfce')
      .as('nfce')
  })
  .prefix('/api/v1')
