import { PrismaSubjectsRepository } from "@/repositories/prisma/prisma-subjects-repository"
import { FetchStudentSubjectsUseCase } from "@/use-cases/subject/fetch-student-subjects"
import { FastifyReply, FastifyRequest } from "fastify"

export const fetchStudentsSubject = async (request: FastifyRequest, reply: FastifyReply) => {
  const prismaSubjectRepository = new PrismaSubjectsRepository()
  const fetchStudentsSubject =
    new FetchStudentSubjectsUseCase(prismaSubjectRepository)

  const subjects = await fetchStudentsSubject.execute({
    studentId: request.user.sub
  })

  return reply.status(200).send(subjects)
}
