import { AbsenceRepository } from "@/repositories/absence-repository"
import { ResourceNotFoundError } from "./errors/resource-not-fount-error"
import { Absence } from "@prisma/client"

interface UpdateAbsenceRepository {
  absenceId: string
  number_absence: number
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
    number_absence
  }: UpdateAbsenceRepository)
    : Promise<UpdateAbsenceResponse> {
    const absence = await this.absenceRepository.update(absenceId, number_absence)

    if (!absence) {
      throw new ResourceNotFoundError()
    }

    return { absence }
  }
}
