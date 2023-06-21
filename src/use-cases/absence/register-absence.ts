import { AbsenceRepository } from "@/repositories/absence-repository"
import { Absence } from "@prisma/client"

interface RegisterAbsenceUseCaseRequest {
  number_absences: number
  max_absences: number
  description?: string
  subject_id: string
}

interface RegisterAbsenceUseCaseResponse {
  absence: Absence
}

export class RegisterAbsenceUseCase {
  private absenceRepository: AbsenceRepository

  constructor(absenceRepository: AbsenceRepository) {
    this.absenceRepository = absenceRepository
  }

  async execute({
    number_absences,
    max_absences,
    description,
    subject_id
  }: RegisterAbsenceUseCaseRequest)
    : Promise<RegisterAbsenceUseCaseResponse> {

    const absence = await this.absenceRepository.create({
      number_absences,
      max_absences,
      description,
      subject_id,
    })

    return { absence }
  }
}
