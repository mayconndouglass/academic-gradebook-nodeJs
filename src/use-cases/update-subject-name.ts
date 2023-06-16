import { SubjectRepository } from "@/repositories/subject-repository"
import { Subject } from "@prisma/client"

interface UpdateSubjectNameUseCaseRequest {
  subjectId: string
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
    subjectId,
    name,
  }: UpdateSubjectNameUseCaseRequest):
    Promise<UpdateSubjectNameUseCaseResponse> {

    const subject = await this.subjectRepository.updateName(subjectId, name)

    return {
      subject
    }
  }
}
