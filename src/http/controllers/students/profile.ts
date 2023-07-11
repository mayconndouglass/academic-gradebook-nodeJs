import { PrismaStudentRepository } from "@/repositories/prisma/prisma-students-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error"
import { GetStudentProfileUseCase } from "@/use-cases/student/get-student-profile"
import { FastifyRequest, FastifyReply } from "fastify"

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const studentsRepository = new PrismaStudentRepository()
    const getStudentProfile = new GetStudentProfileUseCase(studentsRepository)

    const { student } = await getStudentProfile.execute({
      studentId: request.user.sub
    })

    return reply.status(200).send({
      ...student,
      password_hash: undefined,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}