import { PrismaGradesRepository } from "@/repositories/prisma/prisma-grades-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error"
import { RemoveGradeUseCase } from "@/use-cases/grade/remove-grade"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const removeGrade = async (request: FastifyRequest, reply: FastifyReply) => {
  const removeBodySchema = z.object({
    gradeId: z.string(),
  })

  const data = removeBodySchema.parse(request.body)

  try {
    const prismaGradeRepository = new PrismaGradesRepository()
    const removeGrade = new RemoveGradeUseCase(prismaGradeRepository)

    await removeGrade.execute(data)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(204).send()
}
