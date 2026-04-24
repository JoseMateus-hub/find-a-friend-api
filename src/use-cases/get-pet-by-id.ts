import { prisma } from '../lib/prisma'

export async function getPetByIdUseCase(id: string) {
  const pet = await prisma.pet.findUnique({
    where: { id },
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

  if (!pet) {
    throw new Error('Pet not found')
  }

  return { pet }
}