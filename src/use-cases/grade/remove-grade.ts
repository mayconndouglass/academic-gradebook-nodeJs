import { GradeRepository } from "@/repositories/grade-repository"
import { ResourceNotFoundError } from "../errors/resource-not-fount-error"

interface RemoveGradeUseCaseRequest {
  gradeId: string
}

export class RemoveGradeUseCase {
  private gradeRepository: GradeRepository

  constructor(gradeRepository: GradeRepository) {
    this.gradeRepository = gradeRepository
  }

  async execute({ gradeId }: RemoveGradeUseCaseRequest) {
    const grade = await this.gradeRepository.findById(gradeId)

    if (!grade) {
      throw new ResourceNotFoundError()
    }

    await this.gradeRepository.delete(gradeId)
  }
}
