import { hash } from "bcryptjs"

import { StudentsRepository } from "@/repositories/student-respository"
import { StudentAlreadyExistsError } from "./errors/student-already-exists-error"
import { Student } from "@prisma/client"

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  student: Student
}

export class RegisterUseCase {
  private studentRepository: StudentsRepository

  constructor(
    studentRepository: StudentsRepository
  ) {
    this.studentRepository = studentRepository
  }

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

    const password_hash = await hash(password, 6)

    const studentWithSameEmail = await this.studentRepository.findByEmail(email)

    if (studentWithSameEmail) {
      throw new StudentAlreadyExistsError()
    }

    const student = await this.studentRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      student,
    }
  }
}
