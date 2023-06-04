import { StudentsRepository } from "@/repositories/student-respository"
import { hash } from "bcryptjs"
import { StudentAlreadyExistsError } from "./errors/student-already-exists-error"

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
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
  }: RegisterUseCaseRequest) {

    const password_hash = await hash(password, 6)

    const studentWithSameEmail = await this.studentRepository.findByEmail(email)

    if (studentWithSameEmail) {
      console.log("Entrou")
      throw new StudentAlreadyExistsError()
    }

    await this.studentRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
