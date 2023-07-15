import { PrismaAbsencesRepository } from "@/repositories/prisma/prisma-absences-repository"
import { RegisterAbsenceUseCase } from "@/use-cases/absence/register-absence"
import { RegisterAbsenceAlreadyExistsError } from "@/use-cases/errors/register-absence-already-exists-error"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const registerAbsence = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    number_absences: z.number(),
    max_absences: z.number().optional(),
    description: z.string().optional(),
    subject_id: z.string()
  })

  const data = registerBodySchema.parse(request.body)
  try {
    const absenceRepository = new PrismaAbsencesRepository()
    const registerAbsence = new RegisterAbsenceUseCase(absenceRepository)

    await registerAbsence.execute(data)
  } catch (err) {
    if (err instanceof RegisterAbsenceAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }


  return reply.status(201).send()
}
