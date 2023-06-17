import { GradesRepository } from "@/repositories/grade-repository"
import { Grade } from "@prisma/client"

interface FetchGradesBySubjectUseCaseRequest {
  subjectId: string
}

interface FetchGradesBySubjectUseCaseResponse {
  grades: Grade[]
}

export class FetchGradesBySubjectUseCase {
  private gradeRepository: GradesRepository

  constructor(gradeRepository: GradesRepository) {
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
