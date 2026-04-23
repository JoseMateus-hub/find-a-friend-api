import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../app'

async function createAndAuthenticateOrg(email: string) {
  await request(app.server)
    .post('/orgs')
    .send({
      name: 'PetAmigo ONG',
      email,
      password: '123456',
      whatsapp: '85999999999',
      cep: '60000-000',
      city: 'Fortaleza',
      state: 'CE',
      address: 'Rua das Flores, 123',
    })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({ email, password: '123456' })

  return authResponse.body.token
}

describe('Pets', () => {
  it('should be able to register a pet', async () => {
    const token = await createAndAuthenticateOrg('pets1@test.com')

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Rex',
        about: 'Um cachorro brincalhão',
        age: '2 anos',
        size: 'Médio',
        energy: 'Alta',
        independence: 'Baixa',
        environment: 'Espaço amplo',
        city: 'Fortaleza',
      })

    expect(response.status).toBe(201)
    expect(response.body.pet).toHaveProperty('id')
  })

  it('should not be able to register a pet without token', async () => {
    const response = await request(app.server)
      .post('/pets')
      .send({
        name: 'Rex',
        about: 'Um cachorro brincalhão',
        age: '2 anos',
        size: 'Médio',
        energy: 'Alta',
        independence: 'Baixa',
        environment: 'Espaço amplo',
        city: 'Fortaleza',
      })

    expect(response.status).toBe(401)
  })

it('should be able to fetch pets by city', async () => {
  const token = await createAndAuthenticateOrg('pets2@test.com')

  await request(app.server)
    .post('/pets')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Mia',
      about: 'Uma gatinha muito dócil',
      age: '1 ano',
      size: 'Pequeno',
      energy: 'Baixa',
      independence: 'Alta',
      environment: 'Apartamento',
      city: 'Recife',
    })

  const response = await request(app.server)
    .get('/pets?city=Recife')

  expect(response.status).toBe(200)
  expect(response.body.pets.length).toBeGreaterThan(0)
})

  it('should be able to fetch pets by city with filters', async () => {
    const token = await createAndAuthenticateOrg('pets3@test.com')

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Thor',
        about: 'Um cachorro grande e energético',
        age: '3 anos',
        size: 'Grande',
        energy: 'Alta',
        independence: 'Baixa',
        environment: 'Espaço amplo',
        city: 'Fortaleza',
      })

    const response = await request(app.server)
      .get('/pets?city=Fortaleza&size=Grande&energy=Alta')

    expect(response.status).toBe(200)
    expect(response.body.pets.length).toBeGreaterThan(0)
  })
})