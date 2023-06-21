import { expect, describe, it, beforeEach } from "vitest"

import { RemoveGradeUseCase } from "./remove-grade"
import { InMemoryGradesRepository } from "@/repositories/in-memory/in-memory-grades-repository"
import { ResourceNotFoundError } from "../errors/resource-not-fount-error"

describe("Remove Grade Use Case", () => {
  let gradeRepository: InMemoryGradesRepository
  let removeGradeUseCase: RemoveGradeUseCase

  beforeEach(() => {
    gradeRepository = new InMemoryGradesRepository()
    removeGradeUseCase = new RemoveGradeUseCase(gradeRepository)
  })

  it("should delete a grade", async () => {
    const grade = await gradeRepository.create({
      grade: 5,
      subject_id: "teste"
    })

    await removeGradeUseCase.execute({
      gradeId: grade.id
    })

    const test = await gradeRepository.findById(grade.id)

    expect(test).toEqual(null)
  })

  it("should return an error if the grade is not found", async () => {
    await expect(() => removeGradeUseCase.execute({
      gradeId: "non-existent subject",
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
