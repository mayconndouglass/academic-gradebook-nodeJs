import { expect, describe, it, beforeEach } from "vitest"

import { RemoveSubjectUseCase } from "./remove-subject"
import { InMemorySubjectRepository } from "@/repositories/in-memory/in-memory-subjects-repository"
import { ResourceNotFoundError } from "../errors/resource-not-fount-error"

describe("Remove subject Use Case", () => {
  let subjectRepository: InMemorySubjectRepository
  let removeSubjectUseCase: RemoveSubjectUseCase

  beforeEach(() => {
    subjectRepository = new InMemorySubjectRepository()
    removeSubjectUseCase = new RemoveSubjectUseCase(subjectRepository)
  })

  it("should delete a subject", async () => {
    const subject = await subjectRepository.create({
      id: "subject01",
      name: "name",
      hours: 10,
      student_id: "studentTeste",
    })

    await removeSubjectUseCase.execute({
      subjectId: subject.id,
    })

    const test = await subjectRepository.findById(subject.id)

    expect(test).toEqual(null)
  })

  it("should return an error if the subject is not found", async () => {
    await expect(() => removeSubjectUseCase.execute({
      subjectId: "non-existent subject",
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
