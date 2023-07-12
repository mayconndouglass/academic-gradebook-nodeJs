import { SubjectRepository } from "@/repositories/interfaces/subject-repository"
import { Subject } from "@prisma/client"

interface FetchStudantSubjectsUseCaseRequest {
  studentId: string
}

interface FetchStudentSubjectsUsecaseResponse {
  subjects: Subject[]
}

export class FetchStudentSubjectsUseCase {
  private subjectRepository

  constructor(subjectRepository: SubjectRepository) {
    this.subjectRepository = subjectRepository
  }

  async execute({
    studentId
  }: FetchStudantSubjectsUseCaseRequest)
    : Promise<FetchStudentSubjectsUsecaseResponse> {

    const subjects = await this.subjectRepository.findManyByStudentId(studentId)

    return {
      subjects
    }
  }
}
