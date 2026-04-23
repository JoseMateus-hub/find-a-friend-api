import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../middlewares/verify-jwt'
import { registerPetController } from '../controllers/register-pet-controller'
import { fetchPetsController } from '../controllers/fetch-pets-controller'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', fetchPetsController)

  app.post('/pets', { onRequest: [verifyJwt] }, registerPetController)
}