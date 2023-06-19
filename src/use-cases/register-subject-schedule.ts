import { SubjectScheduleRepository } from "@/repositories/subject-schedule-repository"
import { SubjectSchedule } from "@prisma/client"

//TODO: MTO provavelmenet esse use case está errado
interface RegisterSubjectScheduleUseCaseRequest {
  days: string[]
  start_time: string
  end_time: string
  subject_id: string
}

interface RegisterSubjectScheduleUseCaseResponse {
  subjectSchedule: SubjectSchedule
}

export class RegisterSubjectScheduleUseCase {
  private subjectScheduleRepository: SubjectScheduleRepository

  constructor(
    subjectScheduleRepository: SubjectScheduleRepository
  ) {
    this.subjectScheduleRepository = subjectScheduleRepository
  }

  async execute({
    days,
    start_time,
    end_time,
    subject_id,
  }: RegisterSubjectScheduleUseCaseRequest)
    : Promise<RegisterSubjectScheduleUseCaseResponse> {

    const subjectSchedule = await this.subjectScheduleRepository.create({
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
