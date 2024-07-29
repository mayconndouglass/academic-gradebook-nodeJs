import { SubjectRepository } from "@/repositories/interfaces/subject-repository"
import { Subject } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-fount-error"

interface UpdateSubjectNameUseCaseRequest {
  id: string
  name: string
}

interface UpdateSubjectNameUseCaseResponse {
  subject: Subject
}

export class UpdateSubjectNameUseCase {
  private subjectRepository: SubjectRepository

  constructor(subjectRepository: SubjectRepository) {
    this.subjectRepository = subjectRepository
  }

  async execute({
    id,
    name,
  }: UpdateSubjectNameUseCaseRequest):
    Promise<UpdateSubjectNameUseCaseResponse> {
    let subject = await this.subjectRepository.findById(id)

    if (!subject) {
      throw new ResourceNotFoundError()
    }

    subject = await this.subjectRepository.updateName(id, name)

    return { subject }
  }
}
