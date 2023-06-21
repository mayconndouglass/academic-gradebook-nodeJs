import { expect, describe, it, beforeEach } from "vitest"
import { hash } from "bcryptjs"

import { InMemoryStudentsRepository } from "../../repositories/in-memory/in-memory-students-repository"
import { GetStudentProfileUseCase } from "./get-student-profile"
import { ResourceNotFoundError } from "../errors/resource-not-fount-error"

describe("Get Profile Use Case", () => {
  let studentsRepository: InMemoryStudentsRepository
  let getStudentProfileUseCase: GetStudentProfileUseCase

  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository()
    getStudentProfileUseCase = new GetStudentProfileUseCase(studentsRepository)
  })

  it("should be able to get student profile", async () => {
    const createdStudent = await studentsRepository.create({
      name: "Maycon",
      email: "maycon@gmail.com",
      password_hash: await hash("123456", 6)
    })

    const { student } = await getStudentProfileUseCase.execute({
      studentId: createdStudent.id
    })

    expect(student.id).toEqual(expect.any(String))
    expect(student.name).toEqual("Maycon")
  })

  it("should not be able to get student profile with wrong id", async () => {
    expect(() => getStudentProfileUseCase.execute({
      studentId: "non-existing-id"
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
