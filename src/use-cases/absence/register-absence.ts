import { AbsenceRepository } from "@/repositories/interfaces/absence-repository"
import { Absence } from "@prisma/client"
import { RegisterAbsenceAlreadyExistsError } from "../errors/register-absence-already-exists-error"

interface RegisterAbsenceUseCaseRequest {
  number_absences: number
  max_absences?: number
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

    const absenceAlreadyExist = await this.
      absenceRepository.findAbsenceByStudentId(subject_id)

    if (absenceAlreadyExist) {
      throw new RegisterAbsenceAlreadyExistsError()
    }

    const absence = await this.absenceRepository.create({
      number_absences,
      max_absences,
      description,
      subject_id,
    })

    return { absence }
  }
}
