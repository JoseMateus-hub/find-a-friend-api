import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { registerOrgUseCase } from '../../use-cases/register-org'

export async function registerOrgController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsapp: z.string(),
    cep: z.string(),
    city: z.string(),
    state: z.string(),
    address: z.string(),
  })

  const data = registerBodySchema.parse(request.body)

  try {
    await registerOrgUseCase(data)
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}