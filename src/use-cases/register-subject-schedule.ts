import { SubjectScheduleRepository } from "@/repositories/subject-schedule-repository"

interface RegisterSubjectScheduleUseCaseRequest {
  id: string
  days: string[]
  start_time: string
  end_time: string
  subject_id: string
}

export class RegisterSubjectScheduleUseCase {
  private subjectScheduleRepository: SubjectScheduleRepository

  constructor(
    subjectScheduleRepository: SubjectScheduleRepository
  ) {
    this.subjectScheduleRepository = subjectScheduleRepository
  }

  async execute({
    id,
    days,
    start_time,
    end_time,
    subject_id,
  }: RegisterSubjectScheduleUseCaseRequest) {

    const subjectSchedule = this.subjectScheduleRepository.create({
      id,
      days,
      start_time,
      end_time,
      subject_id,
    })

    return {
      subjectSchedule
    }
  }
}
