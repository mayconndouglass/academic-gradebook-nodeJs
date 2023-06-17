import { GradeRepository } from "@/repositories/grade-repository"
import { Grade } from "@prisma/client"
import { TheGradeLimiteHasBeenExceeded } from "./errors/the-grade-limit-has-been-exceeded-erro"

interface RegisterGradeUseCaseRequest {
  grade: number
  description?: string
  subjectId: string
}

interface RegisterGradetUseCaseResponse {
  grade: Grade
}

export class RegisterGradeUseCase {
  private gradeRepository

  constructor(gradeRepository: GradeRepository) {
    this.gradeRepository = gradeRepository
  }

  async execute({
    grade,
    description,
    subjectId,
  }: RegisterGradeUseCaseRequest)
    : Promise<RegisterGradetUseCaseResponse> {

    const numberOfGrades = await this.gradeRepository.findManyBySubject(subjectId)

    if (numberOfGrades.length === 10) {
      throw new TheGradeLimiteHasBeenExceeded()
    }

    const gradee = await this.gradeRepository.create({
      grade,
      description,
      subject_id: subjectId
    })

    return {
      grade: gradee
    }
  }
}
