import { PrismaSubjectsRepository } from "@/repositories/prisma/prisma-subjects-repository"
import { FetchAllDataOfStudentSubjectsUseCase } from "@/use-cases/subject/Fetch-all-data-of-student-subjects"
import { FastifyReply, FastifyRequest } from "fastify"

export const fetchAllDataOfStudentSubjects = async (request: FastifyRequest, reply: FastifyReply) => {
  const subjectRepository = new PrismaSubjectsRepository()
  const fetchAllDataOfStudentSubjects =
    new FetchAllDataOfStudentSubjectsUseCase(subjectRepository)

  const data = await fetchAllDataOfStudentSubjects.execute({
    studentId: request.user.sub
  })

  reply.status(200).send(data)
}
