import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { PrismaStudentRepository } from "../../repositories/prisma/prisma-students-repository"
import { AuthenticateUseCase } from "@/use-cases/student/authenticate-student"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error"

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  const authenticadeBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticadeBodySchema.parse(request.body)

  try {
    const studentsRepository = new PrismaStudentRepository()
    const authenticateUseCase = new AuthenticateUseCase(studentsRepository)

    const { student } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({}, {
      sign: {
        sub: student.id
      }
    })

    return reply.status(200).send({ token })
  } catch (err) {

    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
