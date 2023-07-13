import { SubjectRepository } from "@/repositories/interfaces/subject-repository"
import { Subject } from "@prisma/client"

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

    const subject = await this.subjectRepository.updateName(id, name)

    return {
      subject
    }
  }
}
