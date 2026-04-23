import { prisma } from '../lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterOrgUseCaseRequest {
  name: string
  email: string
  password: string
  whatsapp: string
  cep: string
  city: string
  state: string
  address: string
}

export async function registerOrgUseCase({
  name,
  email,
  password,
  whatsapp,
  cep,
  city,
  state,
  address,
}: RegisterOrgUseCaseRequest) {
  const orgAlreadyExists = await prisma.org.findUnique({
    where: { email },
  })

  if (orgAlreadyExists) {
    throw new Error('E-mail already registered.')
  }

  const password_hash = await hash(password, 6)

  const org = await prisma.org.create({
    data: {
      name,
      email,
      password_hash,
      whatsapp,
      cep,
      city,
      state,
      address,
    },
  })

  return { org }
}