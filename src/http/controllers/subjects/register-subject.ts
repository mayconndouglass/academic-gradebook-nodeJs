import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaSubjectsRepository } from "@/repositories/prisma/prisma-subjects-repository"
import { RegisterSubjectUseCase } from "@/use-cases/subject/register-subject"
import { SubjectAlreadyExistsError } from "@/use-cases/errors/subject-already-exists-error"

export const registerSubject = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    hours: z.number(),
    teacher_name: z.string().optional(),
    student_id: z.string(),
  })

  const data = registerBodySchema.parse(request.body)

  try {
    const prismaSubjectRepository = new PrismaSubjectsRepository()
    const registerSubject = new RegisterSubjectUseCase(prismaSubjectRepository)

    await registerSubject.execute(data)
  } catch (err) {
    if (err instanceof SubjectAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
