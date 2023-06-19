import { SubjectSchedule } from "@prisma/client"

export interface SubjectScheduleRepository {
  create(data: SubjectSchedule): Promise<SubjectSchedule>
}
