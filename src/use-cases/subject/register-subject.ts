import { SubjectRepository } from "@/repositories/interfaces/subject-repository"
import { Subject } from "@prisma/client"
import { SubjectAlreadyExistsError } from "../errors/subject-already-exists-error"

interface RegisterSubjectUseCaseRequest {
  name: string
  teacher_name?: string | undefined
  hours: number
  student_id: string
}

interface RegisterSubjectUseCaseResponse {
  subject: Subject
}

export class RegisterSubjectUseCase {
  private subjectRepository: SubjectRepository

  constructor(subjectRepository: SubjectRepository) {
    this.subjectRepository = subjectRepository
  }

  async execute({
    name,
    teacher_name,
    hours,
    student_id
  }: RegisterSubjectUseCaseRequest): Promise<RegisterSubjectUseCaseResponse> {
    const subjectWithSameName = await this.subjectRepository.findByName(student_id, name)

    if (subjectWithSameName) {
      throw new SubjectAlreadyExistsError()
    }

    const subject = await this.subjectRepository.create({
      name,
      hours,
      teacher_name,
      student_id
    })

    return {
      subject,
    }
  }
}
