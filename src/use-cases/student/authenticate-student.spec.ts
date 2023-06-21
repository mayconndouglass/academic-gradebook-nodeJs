import { expect, describe, it, beforeEach } from "vitest"
import { hash } from "bcryptjs"

import { InMemoryStudentsRepository } from "../../repositories/in-memory/in-memory-students-repository"
import { AuthenticateUseCase } from "./authenticate-student"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error"

describe("Authenticate Use Case", () => {
  let usersRepository: InMemoryStudentsRepository
  let authenticateUseCase: AuthenticateUseCase

  beforeEach(() => {
    usersRepository = new InMemoryStudentsRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Maycon",
      email: "maycon@gmail.com",
      password_hash: await hash("123456", 6)
    })

    const { student } = await authenticateUseCase.execute({
      email: "maycon@gmail.com",
      password: "123456",
    })

    expect(student.id).toEqual(expect.any(String))
  })

  it("should not be able to authenticante with wrong email", async () => {
    expect(() => authenticateUseCase.execute({
      email: "maycon@gmail.com",
      password: "123456",
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it("should not be able to authenticante with wrong password", async () => {
    await usersRepository.create({
      name: "Maycon",
      email: "maycon@gmail.com",
      password_hash: await hash("123456", 6)
    })

    expect(() => authenticateUseCase.execute({
      email: "maycon@gmail.com",
      password: "654321",
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
