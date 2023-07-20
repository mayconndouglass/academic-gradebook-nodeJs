import { SubjectRepository } from "@/repositories/interfaces/subject-repository"
import { Subject } from "@prisma/client"

interface FetchAllDataOfStudentSubjectsUseCaseRequest {
  studentId: string
}

interface FetchAllDataOfStudentSubjectsUseCaseResponse {
  subjects: Subject[]
}

export class FetchAllDataOfStudentSubjectsUseCase {
  private subjectRepository: SubjectRepository

  constructor(subjectRepository: SubjectRepository) {
    this.subjectRepository = subjectRepository
  }

  async execute({ studentId }: FetchAllDataOfStudentSubjectsUseCaseRequest)
    : Promise<FetchAllDataOfStudentSubjectsUseCaseResponse> {

    const subjects = await this.subjectRepository.
      findAllDatafromSubject(studentId)

    return {
      subjects
    }
  }
}
