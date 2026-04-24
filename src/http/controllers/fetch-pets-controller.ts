import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { fetchPetsUseCase } from '../../use-cases/fetch-pets'

export async function fetchPetsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPetsQuerySchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    size: z.string().optional(),
    energy: z.string().optional(),
    independence: z.string().optional(),
    environment: z.string().optional(),
  })

  const filters = fetchPetsQuerySchema.parse(request.query)
  
  console.log('Filters received:', filters)

  try {
    const { pets } = await fetchPetsUseCase(filters)
    
    console.log('Pets found:', pets.length)

    return reply.status(200).send({ pets })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}