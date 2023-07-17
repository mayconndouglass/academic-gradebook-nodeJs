import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaSubjectScheduleRepository } from "@/repositories/prisma/prisma-subject-shedule-repository"
import { RegisterSubjectScheduleUseCase } from "@/use-cases/subject-schedules/register-subject-schedule"

export const registerSubjectSchedule = async (request: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    days: z.array(z.string()),
    start_time: z.string(),
    end_time: z.string(),
    subject_id: z.string(),
  })

  const data = registerBodySchema.parse(request.body)

  const subjectScheduleRepository = new PrismaSubjectScheduleRepository()
  const subjectScheduleUseCase = new RegisterSubjectScheduleUseCase(subjectScheduleRepository)

  const subjectsSchedule = await subjectScheduleUseCase.execute(data)

  reply.status(200).send(subjectsSchedule)
}
