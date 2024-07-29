import { expect, describe, it, beforeEach } from "vitest"
import { RegisterSubjectUseCase } from "./register-subject"
import { InMemorySubjectRepository } from "@/repositories/in-memory/in-memory-subjects-repository"
import { SubjectAlreadyExistsError } from "../errors/subject-already-exists-error"

describe("Register Subject Use Case", () => {
  let subjectRepository: InMemorySubjectRepository
  let registerSubjectUseCase: RegisterSubjectUseCase

  beforeEach(() => {
    subjectRepository = new InMemorySubjectRepository()
    registerSubjectUseCase = new RegisterSubjectUseCase(subjectRepository)
  })

  it("should not be able to register two subjects with the same name", async () => {
    const name = "Astronomia"

    await registerSubjectUseCase.execute({
      name,
      teacher_name: "Sergio Sacani",
      hours: 90,
      student_id: "123456",
    })

    await expect(() => registerSubjectUseCase.execute({
      name,
      teacher_name: "Sergio Sacani",
      hours: 90,
      student_id: "12345",
    })).rejects.toBeInstanceOf(SubjectAlreadyExistsError)
  })

  it("should be able to register a new subject", async () => {
    const { subject } = await registerSubjectUseCase.execute({
      name: "Filosofia",
      teacher_name: "Fiódor Dostoiévski ",
      hours: 120,
      student_id: "123456",
    })

    expect(subject.id).toEqual(expect.any(String))
  })
})
