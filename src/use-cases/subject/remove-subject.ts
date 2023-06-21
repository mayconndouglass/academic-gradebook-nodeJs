import { SubjectRepository } from "@/repositories/subject-repository"
import { ResourceNotFoundError } from "../errors/resource-not-fount-error"

interface RemoveSubjectUseCaseRequest {
  subjectId: string
}

export class RemoveSubjectUseCase {
  private subjectRepository: SubjectRepository

  constructor(subjectRepository: SubjectRepository) {
    this.subjectRepository = subjectRepository
  }

  async execute({
    subjectId
  }: RemoveSubjectUseCaseRequest) {
    const subject = await this.subjectRepository.findById(subjectId)

    if (!subject) {
      throw new ResourceNotFoundError()
    }

    await this.subjectRepository.delete(subjectId)
  }
}
