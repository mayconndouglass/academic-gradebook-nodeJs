import { expect, describe, it, beforeEach } from "vitest"
import { RegisterUseCase } from "./register"
import { compare } from "bcryptjs"
import { InMemoryStudentsRepository } from "@/repositories/in-memory/in-memory-students-repository"
import { StudentAlreadyExistsError } from "./errors/student-already-exists-error"

describe("Register Use Case", () => {
  let usersRepository: InMemoryStudentsRepository
  let registerUseCase: RegisterUseCase

  beforeEach(() => {
    usersRepository = new InMemoryStudentsRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
  })

  it("should hash user passowrd upon registration", async () => {
    const { student } = await registerUseCase.execute({
      name: "Maycon Douglas",
      email: "maycondor@gmail.com",
      password: "123456"
    })

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      student.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it("should not be able register with same email twice", async () => {
    const email = "student@example.com"

    await registerUseCase.execute({
      name: "Mayc",
      email,
      password: "123456",
    })

    await expect(() => registerUseCase.execute({
      name: "Mayc",
      email,
      password: "123456",
    })).rejects.toBeInstanceOf(StudentAlreadyExistsError)
  })

  it("should be able to register", async () => {
    const { student } = await registerUseCase.execute({
      name: "Mayc",
      email: "user@example.com",
      password: "123456",
    })

    expect(student.id).toEqual(expect.any(String))
  })
})
