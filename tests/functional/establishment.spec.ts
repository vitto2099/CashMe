import { test } from '@japa/runner'
import User from '#models/user'
import UserEstablishment from '#models/user_establishment'

test.group('Functional | Establishment Auth & Profile', (group) => {
  group.each.setup(async () => {
    await User.query().whereIn('email', ['manager@store.com', 'operator@store.com', 'update@store.com']).delete()
  })

  test('should register new establishment user account with profile and return access token', async ({ client, assert }) => {
    const response = await client.post('/api/v1/auth/establishment/signup').json({
      fullName: 'Manager User',
      email: 'manager@store.com',
      password: 'password123',
      passwordConfirmation: 'password123',
      role: 'LOJISTA_ADMIN',
    })

    response.assertStatus(200)
    const body = response.body().data || response.body()
    assert.equal(body.user.email, 'manager@store.com')
    assert.equal(body.user.userType, 'ESTABLISHMENT')
    assert.equal(body.profile.fullName, 'Manager User')
    assert.equal(body.profile.role, 'LOJISTA_ADMIN')
    assert.exists(body.token)

    const user = await User.findBy('email', 'manager@store.com')
    assert.isNotNull(user)
    const profile = await UserEstablishment.findBy('userId', user!.id)
    assert.isNotNull(profile)
    assert.equal(profile!.fullName, 'Manager User')
  })

  test('should fetch establishment user profile for authenticated user', async ({ client, assert }) => {
    const user = await User.create({
      fullName: 'Operator User',
      email: 'operator@store.com',
      password: 'password123',
      userType: 'ESTABLISHMENT',
    })
    await UserEstablishment.create({
      userId: user.id,
      fullName: 'Operator User',
      role: 'LOJISTA_OPERADOR',
    })

    const token = await User.accessTokens.create(user)

    const response = await client
      .get('/api/v1/account/establishment/profile')
      .header('Authorization', `Bearer ${token.value!.release()}`)

    response.assertStatus(200)
    const body = response.body().data || response.body()
    assert.equal(body.profile.fullName, 'Operator User')
    assert.equal(body.profile.role, 'LOJISTA_OPERADOR')
  })

  test('should update establishment user profile details', async ({ client, assert }) => {
    const user = await User.create({
      fullName: 'Initial Name',
      email: 'update@store.com',
      password: 'password123',
      userType: 'ESTABLISHMENT',
    })
    const profile = await UserEstablishment.create({
      userId: user.id,
      fullName: 'Initial Name',
      role: 'LOJISTA_OPERADOR',
    })

    const token = await User.accessTokens.create(user)

    const response = await client
      .put('/api/v1/account/establishment/profile')
      .header('Authorization', `Bearer ${token.value!.release()}`)
      .json({
        fullName: 'Updated Name',
        role: 'LOJISTA_ADMIN',
      })

    response.assertStatus(200)
    const body = response.body().data || response.body()
    assert.equal(body.profile.fullName, 'Updated Name')
    assert.equal(body.profile.role, 'LOJISTA_ADMIN')

    await profile.refresh()
    assert.equal(profile.fullName, 'Updated Name')
    assert.equal(profile.role, 'LOJISTA_ADMIN')
  })
})
