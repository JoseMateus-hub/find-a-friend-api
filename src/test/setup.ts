import { afterAll, beforeAll } from 'vitest'
import { app } from '../app'
import { prisma } from '../lib/prisma'

beforeAll(async () => {
  await app.ready()
}, 30000)

afterAll(async () => {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "pets", "orgs" RESTART IDENTITY CASCADE;
  `)
  await prisma.$disconnect()
  await app.close()
})