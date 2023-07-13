import { PrismaSubjectsRepository } from "@/repositories/prisma/prisma-subjects-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error"
import { UpdateSubjectNameUseCase } from "@/use-cases/subject/update-subject-name"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const updateSubject = async (request: FastifyRequest, reply: FastifyReply) => {
  const updateBodySchema = z.object({
    id: z.string(),
    name: z.string(),
  })

  const data = updateBodySchema.parse(request.body)

  try {
    const prismaSubjectRepository = new PrismaSubjectsRepository()
    const updateSubjectName = new UpdateSubjectNameUseCase(prismaSubjectRepository)

    const { subject } = await updateSubjectName.execute(data)

    return reply.status(200).send(subject)
  } catch (err) {
    throw new ResourceNotFoundError()
  }
}
