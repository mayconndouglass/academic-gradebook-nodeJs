import { SubjectRepository } from "@/repositories/subject-repository"
import { Subject } from "@prisma/client"

//TODO: Sem teste unitario
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

  async execute({
    studentId
  }: FetchAllDataOfStudentSubjectsUseCaseRequest)
    : Promise<FetchAllDataOfStudentSubjectsUseCaseResponse> {
    const subjects = await this.subjectRepository.
      findManySubjectsWithSubjectScheduleByStudent(studentId)

    return {
      subjects
    }
  }
}
