import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaGradesRepository } from "@/repositories/prisma/prisma-grades-repository"
import { RegisterGradeUseCase } from "@/use-cases/grade/register-grade"
import { TheGradeLimiteHasBeenExceeded } from "@/use-cases/errors/the-grade-limit-has-been-exceeded-erro"

export const RegisterGrade = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    grade: z.number(),
    description: z.string().optional(),
    subjectId: z.string(),
  })

  const data = registerBodySchema.parse(request.body)

  try {
    const prismaGradeRepository = new PrismaGradesRepository()
    const registerGrade = new RegisterGradeUseCase(prismaGradeRepository)

    await registerGrade.execute(data)
  } catch (err) {
    if (err instanceof TheGradeLimiteHasBeenExceeded) {
      return reply.status(403).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
