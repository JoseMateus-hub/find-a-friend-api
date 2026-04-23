import { FastifyInstance } from 'fastify'
import { registerOrgController } from '../controllers/register-org-controller'
import { authenticateOrgController } from '../controllers/authenticate-org-controller'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrgController)
  app.post('/sessions', authenticateOrgController)
}