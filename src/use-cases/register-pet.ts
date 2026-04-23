import { prisma } from '../lib/prisma'

interface RegisterPetUseCaseRequest {
  name: string
  about: string
  age: string
  size: string
  energy: string
  independence: string
  environment: string
  city: string
  org_id: string
}

export async function registerPetUseCase({
  name,
  about,
  age,
  size,
  energy,
  independence,
  environment,
  city,
  org_id,
}: RegisterPetUseCaseRequest) {
  const org = await prisma.org.findUnique({
    where: { id: org_id },
  })

  if (!org) {
    throw new Error('Org not found.')
  }

  const pet = await prisma.pet.create({
    data: {
      name,
      about,
      age,
      size,
      energy,
      independence,
      environment,
      city,
      org_id,
    },
  })

  return { pet }
}