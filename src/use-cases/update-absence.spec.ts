import { expect, describe, it, beforeEach } from "vitest"

import { UpdateAbsenceUseCase } from "./update-absence"
import { InMemoryAbsenceRepository } from "@/repositories/in-memory/in-memory-absence-repository"
import { ResourceNotFoundError } from "./errors/resource-not-fount-error"

describe("Update absence Use Case", () => {
  let absenceRepository: InMemoryAbsenceRepository
  let updateAbsenceUseCase: UpdateAbsenceUseCase

  beforeEach(() => {
    absenceRepository = new InMemoryAbsenceRepository()
    updateAbsenceUseCase = new UpdateAbsenceUseCase(absenceRepository)
  })

  it("should be able to edit grade", async () => {
    const absence = await absenceRepository.create({
      number_absences: 1,
      subject_id: "123456"
    })

    updateAbsenceUseCase.execute({
      absenceId: absence.id,
      number_absence: 14
    })

    expect(absence).toEqual(
      expect.objectContaining({ number_absences: 14 })
    )
  })

  it("should return an error if the absence is not found", async () => {
    await expect(() => updateAbsenceUseCase.execute({
      absenceId: "non-existent subject",
      number_absence: 10,
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
