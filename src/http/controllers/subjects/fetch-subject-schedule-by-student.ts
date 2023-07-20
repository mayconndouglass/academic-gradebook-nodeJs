import { PrismaSubjectsRepository } from "@/repositories/prisma/prisma-subjects-repository"
import { FetchSubjectScheduleByStudentUseCase } from "@/use-cases/subject/fetch-subject-schedules-by-student"
import { FastifyReply, FastifyRequest } from "fastify"

export const fetchSubjectScheduleByStudent = async (request: FastifyRequest, reply: FastifyReply) => {
  const subjectRepository = new PrismaSubjectsRepository()
  const fetchSubjectScheduleByStudent =
    new FetchSubjectScheduleByStudentUseCase(subjectRepository)

  const subjects = await fetchSubjectScheduleByStudent.execute({
    studentId: request.user.sub
  })

  return reply.status(200).send(subjects)
}
