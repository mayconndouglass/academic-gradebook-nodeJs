import { AbsenceRepository } from "@/repositories/interfaces/absence-repository"
import { ResourceNotFoundError } from "../errors/resource-not-fount-error"
import { Absence } from "@prisma/client"

interface UpdateAbsenceRepository {
  absenceId: string
  numberAbsence: number
}

interface UpdateAbsenceResponse {
  absence: Absence
}

export class UpdateAbsenceUseCase {
  private absenceRepository: AbsenceRepository

  constructor(absenceRepository: AbsenceRepository) {
    this.absenceRepository = absenceRepository
  }

  async execute({
    absenceId,
    numberAbsence
  }: UpdateAbsenceRepository)
    : Promise<UpdateAbsenceResponse> {
    const absence = await this.absenceRepository.update(absenceId, numberAbsence)

    if (!absence) {
      throw new ResourceNotFoundError()
    }

    return { absence }
  }
}
