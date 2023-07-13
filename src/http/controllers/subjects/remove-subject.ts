import { PrismaSubjectsRepository } from "@/repositories/prisma/prisma-subjects-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error"
import { RemoveSubjectUseCase } from "@/use-cases/subject/remove-subject"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const removeSubject = async (request: FastifyRequest, reply: FastifyReply) => {
  const updateBodySchema = z.object({
    subjectId: z.string(),
  })

  const data = updateBodySchema.parse(request.body)

  try {
    const prismaSubjectRepository = new PrismaSubjectsRepository()
    const removeSubject = new RemoveSubjectUseCase(prismaSubjectRepository)

    const subject = removeSubject.execute(data)

    return reply.status(204).send(subject)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
} 
