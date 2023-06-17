import { SubjectRepository } from "@/repositories/subject-repository"
import { Subject } from "@prisma/client"
import { SubjectAlreadyExistsError } from "./errors/subject-already-exists-error"

interface RegisterSubjectUseCaseRequest {
  name: string
  teacher_name: string | null
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
    //TODO: Será que deveria verificar se o student existe ?

    const subjectWithSameName = await this.subjectRepository.findByName(name)

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
