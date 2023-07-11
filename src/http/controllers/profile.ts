import { PrismaStudentRepository } from "@/repositories/prisma/prisma-students-repository"
import { GetStudentProfileUseCase } from "@/use-cases/student/get-student-profile"
import { FastifyRequest, FastifyReply } from "fastify"

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
  const studentsRepository = new PrismaStudentRepository()
  const getStudentProfile = new GetStudentProfileUseCase(studentsRepository)

  const student = getStudentProfile.execute({
    studentId: request.user.sub
  })

  return reply.status(200).send({
    ...student,
    password_hash: undefined,
  })
}
