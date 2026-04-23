import { prisma } from '../lib/prisma'

interface FetchPetsUseCaseRequest {
  city: string
  age?: string
  size?: string
  energy?: string
  independence?: string
  environment?: string
}

export async function fetchPetsUseCase({
  city,
  age,
  size,
  energy,
  independence,
  environment,
}: FetchPetsUseCaseRequest) {
  const pets = await prisma.pet.findMany({
    where: {
      city,
      ...(age && { age }),
      ...(size && { size }),
      ...(energy && { energy }),
      ...(independence && { independence }),
      ...(environment && { environment }),
    },
    include: {
      org: {
        select: {
          name: true,
          whatsapp: true,
          address: true,
        },
      },
    },
  })

  return { pets }
}