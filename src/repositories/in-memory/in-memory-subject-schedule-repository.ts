import { SubjectSchedule } from "@prisma/client"
import { SubjectScheduleRepository } from "../interfaces/subject-schedule-repository"
import { randomUUID } from "crypto"

export class InMemorySubjectSchedule implements SubjectScheduleRepository {
  public items: SubjectSchedule[] = []

  async create(data: Omit<SubjectSchedule, "id">): Promise<SubjectSchedule> {
    const subjectSchedule: SubjectSchedule = {
      id: randomUUID(),
      days: data.days,
      start_time: data.start_time,
      end_time: data.end_time,
      subject_id: data.subject_id,
    }

    this.items.push(subjectSchedule)

    return subjectSchedule
  }
}
