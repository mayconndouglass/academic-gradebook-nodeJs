import { SubjectSchedule, Subject } from "@prisma/client"

export interface SubjectScheduleRepository {
  create(data: Omit<SubjectSchedule, "id">): Promise<SubjectSchedule>
}
