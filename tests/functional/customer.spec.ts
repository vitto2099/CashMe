import { test } from '@japa/runner'
import User from '#models/user'
import UserCustomer from '#models/user_customer'

test.group('Functional | Customer Auth & Profile', (group) => {
  group.each.setup(async () => {
    await User.query().whereIn('email', ['maria@gmail.com', 'customer@gmail.com', 'customer.update@gmail.com']).delete()
  })

  test('should register new customer account with profile and return access token', async ({ client, assert }) => {
    const response = await client.post('/api/v1/auth/customer/signup').json({
      fullName: 'Maria Silva',
      email: 'maria@gmail.com',
      password: 'password123',
      passwordConfirmation: 'password123',
      cpf: '12345678901',
      phone: '47999991111',
      termsAccepted: true,
    })

    response.assertStatus(200)
    const body = response.body().data || response.body()
    assert.equal(body.user.email, 'maria@gmail.com')
    assert.equal(body.user.userType, 'CUSTOMER')
    assert.equal(body.profile.fullName, 'Maria Silva')
    assert.equal(body.profile.cpf, '12345678901')
    assert.exists(body.token)

    const user = await User.findBy('email', 'maria@gmail.com')
    assert.isNotNull(user)
    const profile = await UserCustomer.findBy('userId', user!.id)
    assert.isNotNull(profile)
    assert.equal(profile!.fullName, 'Maria Silva')
  })

  test('should fetch customer profile for authenticated user', async ({ client, assert }) => {
    const user = await User.create({
      fullName: 'Carlos Santos',
      email: 'customer@gmail.com',
      password: 'password123',
      userType: 'CUSTOMER',
    })
    await UserCustomer.create({
      userId: user.id,
      fullName: 'Carlos Santos',
    })

    const token = await User.accessTokens.create(user)

    const response = await client
      .get('/api/v1/account/customer/profile')
      .header('Authorization', `Bearer ${token.value!.release()}`)

    response.assertStatus(200)
    const body = response.body().data || response.body()
    assert.equal(body.profile.fullName, 'Carlos Santos')
  })

  test('should update customer profile details', async ({ client, assert }) => {
    const user = await User.create({
      fullName: 'Old Name',
      email: 'customer.update@gmail.com',
      password: 'password123',
      userType: 'CUSTOMER',
    })
    const profile = await UserCustomer.create({
      userId: user.id,
      fullName: 'Old Name',
    })

    const token = await User.accessTokens.create(user)

    const response = await client
      .put('/api/v1/account/customer/profile')
      .header('Authorization', `Bearer ${token.value!.release()}`)
      .json({
        fullName: 'New Name',
        phone: '47988887777',
      })

    response.assertStatus(200)
    const body = response.body().data || response.body()
    assert.equal(body.profile.fullName, 'New Name')
    assert.equal(body.profile.phone, '47988887777')

    await profile.refresh()
    assert.equal(profile.fullName, 'New Name')
  })
})
