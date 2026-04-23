import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { registerPetUseCase } from '../../use-cases/register-pet'

export async function registerPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy: z.string(),
    independence: z.string(),
    environment: z.string(),
    city: z.string(),
  })

  const data = registerPetBodySchema.parse(request.body)

  try {
    const { pet } = await registerPetUseCase({
      ...data,
      org_id: request.user.sub,
    })

    return reply.status(201).send({ pet })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}