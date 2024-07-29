import { expect, describe, it, beforeEach } from "vitest"

import { UpdateSubjectNameUseCase } from "./update-subject-name"
import { InMemorySubjectRepository } from "@/repositories/in-memory/in-memory-subjects-repository"
import { ResourceNotFoundError } from "../errors/resource-not-fount-error"

describe("Update subject name Use Case", () => {
  let subjectRepository: InMemorySubjectRepository
  let updateSubjectNameUseCase: UpdateSubjectNameUseCase

  beforeEach(() => {
    subjectRepository = new InMemorySubjectRepository()
    updateSubjectNameUseCase = new UpdateSubjectNameUseCase(subjectRepository)
  })

  it("should be able to edit subject name", async () => {
    const subject = await subjectRepository.create({
      id: "subject01",
      name: "nameInicial",
      hours: 10,
      student_id: "studentTeste",
    })

    const { subject: subjectWithNameEdited } = await updateSubjectNameUseCase.execute({
      id: subject.id,
      name: "newName",
    })

    expect(subjectWithNameEdited).toEqual(
      expect.objectContaining({ name: "newName" })
    )
  })

  it("should return an error if the subject is not found", async () => {
    await expect(() => updateSubjectNameUseCase.execute({
      id: "non-existent subject",
      name: "newName",
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
