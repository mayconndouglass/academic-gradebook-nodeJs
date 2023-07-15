import { PrismaAbsencesRepository } from "@/repositories/prisma/prisma-absences-repository"
import { UpdateAbsenceUseCase } from "@/use-cases/absence/update-absence"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const updateAbsence = async (request: FastifyRequest, reply: FastifyReply) => {
  const absenceBodySchema = z.object({
    absenceId: z.string(),
    numberAbsence: z.number(),
  })

  const data = absenceBodySchema.parse(request.body)

  try {
    const absenceRepository = new PrismaAbsencesRepository()
    const updateAbsence = new UpdateAbsenceUseCase(absenceRepository)

    await updateAbsence.execute(data)

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  reply.status(200).send()
}
