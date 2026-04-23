import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../app'

describe('Orgs', () => {
  it('should be able to register an org', async () => {
    const response = await request(app.server)
      .post('/orgs')
      .send({
        name: 'PetAmigo ONG',
        email: 'petamigo@test.com',
        password: '123456',
        whatsapp: '85999999999',
        cep: '60000-000',
        city: 'Fortaleza',
        state: 'CE',
        address: 'Rua das Flores, 123',
      })

    expect(response.status).toBe(201)
  })

  it('should not be able to register an org with duplicate email', async () => {
    await request(app.server)
      .post('/orgs')
      .send({
        name: 'PetAmigo ONG',
        email: 'duplicate@test.com',
        password: '123456',
        whatsapp: '85999999999',
        cep: '60000-000',
        city: 'Fortaleza',
        state: 'CE',
        address: 'Rua das Flores, 123',
      })

    const response = await request(app.server)
      .post('/orgs')
      .send({
        name: 'PetAmigo ONG',
        email: 'duplicate@test.com',
        password: '123456',
        whatsapp: '85999999999',
        cep: '60000-000',
        city: 'Fortaleza',
        state: 'CE',
        address: 'Rua das Flores, 123',
      })

    expect(response.status).toBe(409)
  })

  it('should be able to authenticate an org', async () => {
    await request(app.server)
      .post('/orgs')
      .send({
        name: 'Auth ONG',
        email: 'auth@test.com',
        password: '123456',
        whatsapp: '85999999999',
        cep: '60000-000',
        city: 'Fortaleza',
        state: 'CE',
        address: 'Rua das Flores, 123',
      })

    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'auth@test.com',
        password: '123456',
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  it('should not be able to authenticate with wrong password', async () => {
    await request(app.server)
      .post('/orgs')
      .send({
        name: 'Wrong Pass ONG',
        email: 'wrongpass@test.com',
        password: '123456',
        whatsapp: '85999999999',
        cep: '60000-000',
        city: 'Fortaleza',
        state: 'CE',
        address: 'Rua das Flores, 123',
      })

    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'wrongpass@test.com',
        password: 'wrong-password',
      })

    expect(response.status).toBe(401)
  })
})