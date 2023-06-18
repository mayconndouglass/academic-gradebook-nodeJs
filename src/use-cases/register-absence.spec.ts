import { expect, describe, it, beforeEach } from "vitest"

import { RegisterAbsenceUseCase } from "./register-absence"
import { InMemoryAbsenceRepository } from "@/repositories/in-memory/in-memory-absence-repository"

describe("Register Absence Use Case", () => {
  let absenceRepository: InMemoryAbsenceRepository
  let registerAbsenceUseCase: RegisterAbsenceUseCase

  beforeEach(() => {
    absenceRepository = new InMemoryAbsenceRepository()
    registerAbsenceUseCase = new RegisterAbsenceUseCase(absenceRepository)
  })

  it("should be able to register a new Absence", async () => {
    const { absence } = await registerAbsenceUseCase.execute({
      max_absences: 15,
      number_absences: 2,
      subject_id: "subjectID",
    })

    expect(absence.id).toEqual(expect.any(String))
  })
})

