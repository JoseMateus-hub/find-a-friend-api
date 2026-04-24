import { FastifyRequest, FastifyReply } from 'fastify'
import { getPetByIdUseCase } from '../../use-cases/get-pet-by-id'

export async function getPetByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = request.params as { id: string }

  try {
    const { pet } = await getPetByIdUseCase(id)

    return reply.status(200).send({ pet })
  } catch {
    return reply.status(404).send({ message: 'Pet not found' })
  }
}