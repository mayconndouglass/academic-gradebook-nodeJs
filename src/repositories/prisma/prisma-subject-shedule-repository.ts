import { SubjectSchedule } from "@prisma/client"
import { SubjectScheduleRepository } from "../interfaces/subject-schedule-repository"
import { prisma } from "@/lib/prisma"

export class PrismaSubjectScheduleRepository implements SubjectScheduleRepository {
  async create(data: Omit<SubjectSchedule, "id">): Promise<SubjectSchedule> {
    const subjectSchedule = await prisma.subjectSchedule.create({
      data
    })

    return subjectSchedule
  }
}
