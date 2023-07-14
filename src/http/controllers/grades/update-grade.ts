import { PrismaGradesRepository } from "@/repositories/prisma/prisma-grades-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error"
import { UpdateGradeUseCase } from "@/use-cases/grade/update-grade"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const updateGrade = async (request: FastifyRequest, reply: FastifyReply) => {
  const updateBodySchema = z.object({
    gradeId: z.string(),
    grade: z.number()
  })

  const { grade, gradeId } = updateBodySchema.parse(request.body)

  reply.status(200).send({ gradeId, grade })

  try {
    const gradeRepository = new PrismaGradesRepository()
    const updateGrade = new UpdateGradeUseCase(gradeRepository)

    await updateGrade.execute({ gradeId, grade })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
