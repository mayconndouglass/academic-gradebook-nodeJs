import { GradeRepository } from "@/repositories/interfaces/grade-repository"
import { Grade } from "@prisma/client"

interface FetchGradesBySubjectUseCaseRequest {
  subjectId: string
}

interface FetchGradesBySubjectUseCaseResponse {
  grades: Grade[]
}

export class FetchGradesBySubjectUseCase {
  private gradeRepository: GradeRepository

  constructor(gradeRepository: GradeRepository) {
    this.gradeRepository = gradeRepository
  }

  async execute({
    subjectId
  }: FetchGradesBySubjectUseCaseRequest)
    : Promise<FetchGradesBySubjectUseCaseResponse> {

    const grades = await this.gradeRepository.findManyBySubject(subjectId)

    return {
      grades
    }
  }
}
