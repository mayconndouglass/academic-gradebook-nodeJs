import { SubjectRepository } from "@/repositories/subject-repository"

interface FetchSubjectScheduleByStudentUseCaseRequest {
  studentId: string
}

//TODO: Pode ser necessário retrabalhar essa idea
//TODO: Não foi criado testes
export class FetchSubjectScheduleByStudentUseCase {
  private subjectRepository: SubjectRepository

  constructor(subjectRepository: SubjectRepository) {
    this.subjectRepository = subjectRepository
  }

  async execute({
    studentId
  }: FetchSubjectScheduleByStudentUseCaseRequest) {
    const subjects = await this.subjectRepository.findManySubjectsWithSubjectScheduleByStudent(studentId)

    return {
      subjects
    }
  }
}

