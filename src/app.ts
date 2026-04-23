import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import { orgsRoutes } from './http/routes/orgs-routes'
import { petsRoutes } from './http/routes/pets-routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET ?? 'fallback-secret',
})

app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  return reply.status(500).send({
    message: 'Internal server error.',
  })
})