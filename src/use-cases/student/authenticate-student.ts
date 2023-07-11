import { compare } from "bcryptjs"

import { StudentsRepository } from "@/repositories/interfaces/student-respository"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error"
import { Student } from "@prisma/client"

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateStudentUseCaseResponse {
  student: Student
}

export class AuthenticateUseCase {
  private studentRepository: StudentsRepository

  constructor(studentRepository: StudentsRepository) {
    this.studentRepository = studentRepository
  }

  async execute({
    email,
    password
  }: AuthenticateStudentUseCaseRequest):
    Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentRepository.findByEmail(email)

    if (!student) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordsMatch = await compare(password, student.password_hash)

    if (!doesPasswordsMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      student,
    }
  }
}
