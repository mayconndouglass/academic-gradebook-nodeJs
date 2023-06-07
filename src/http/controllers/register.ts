import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { RegisterUseCase } from "@/use-cases/register"
import { PrismaStudentRepository } from "../../repositories/prisma/prisma-students-repository"
import { StudentAlreadyExistsError } from "@/use-cases/errors/student-already-exists-error"

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const prismaStudentsRepository = new PrismaStudentRepository()
    const registerUseCase = new RegisterUseCase(prismaStudentsRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {

    if (err instanceof StudentAlreadyExistsError) {
      return reply.status(409).send()
    }

    throw err
  }

  return reply.status(201).send()
}
