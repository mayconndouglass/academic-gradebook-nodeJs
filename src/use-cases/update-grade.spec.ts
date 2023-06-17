import { expect, describe, it, beforeEach } from "vitest"

import { UpdateGradeUseCase } from "./update-grade"
import { InMemoryGradesRepository } from "@/repositories/in-memory/in-memory-grades-repository"
import { ResourceNotFoundError } from "./errors/resource-not-fount-error"

describe("Update subject name Use Case", () => {
  let gradeRepository: InMemoryGradesRepository
  let updateGradeUseCase: UpdateGradeUseCase

  beforeEach(() => {
    gradeRepository = new InMemoryGradesRepository()
    updateGradeUseCase = new UpdateGradeUseCase(gradeRepository)
  })

  it("should be able to edit grade", async () => {
    const grade = await gradeRepository.create({
      id: "gradeTest",
      grade: 6,
      subject_id: "123456"
    })

    updateGradeUseCase.execute({
      gradeId: "gradeTest",
      grade: 10,
    })

    expect(grade).toEqual(
      expect.objectContaining({ grade: 10 })
    )
  })

  it("should return an error if the grade is not found", async () => {
    await expect(() => updateGradeUseCase.execute({
      gradeId: "non-existent subject",
      grade: 10,
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
