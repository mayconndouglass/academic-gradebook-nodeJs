import { GradeRepository } from "@/repositories/interfaces/grade-repository"
import { ResourceNotFoundError } from "../errors/resource-not-fount-error"
import { Grade } from "@prisma/client"

interface UpdateGradeUseCaseRequest {
  gradeId: string
  grade: number
}

interface UpdateGradeUseCaseResponse {
  gradee: Grade
}

export class UpdateGradeUseCase {
  private gradeRepository: GradeRepository

  constructor(gradeRepository: GradeRepository) {
    this.gradeRepository = gradeRepository
  }

  async execute({
    gradeId,
    grade
  }: UpdateGradeUseCaseRequest)
    : Promise<UpdateGradeUseCaseResponse> {
    const gradee = await this.gradeRepository.updateGrade(gradeId, grade)

    if (!gradee) {
      throw new ResourceNotFoundError()
    }

    return {
      gradee
    }
  }
}
