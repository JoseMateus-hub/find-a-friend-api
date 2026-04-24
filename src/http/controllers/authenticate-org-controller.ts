import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { authenticateOrgUseCase } from '../../use-cases/authenticate-org'

export async function authenticateOrgController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const { org } = await authenticateOrgUseCase({ email, password })

    const token = await reply.jwtSign(
  { sub: org.id },
  {
    sign: {
      sub: org.id,
    },
  },
)
    

    return reply.status(200).send({ token })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(401).send({ message: err.message })
    }
    throw err
  }
}