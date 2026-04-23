import { prisma } from '../lib/prisma'
import { compare } from 'bcryptjs'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

export async function authenticateOrgUseCase({
  email,
  password,
}: AuthenticateOrgUseCaseRequest) {
  const org = await prisma.org.findUnique({
    where: { email },
  })

  if (!org) {
    throw new Error('Invalid credentials.')
  }

  const doesPasswordMatch = await compare(password, org.password_hash)

  if (!doesPasswordMatch) {
    throw new Error('Invalid credentials.')
  }

  return { org }
}