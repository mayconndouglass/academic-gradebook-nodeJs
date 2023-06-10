import { StudentsRepository } from "../repositories/student-respository"
import { Student } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-fount-error"

interface GetStudentProfileUseCaseRequest {
  studentId: string
}

interface GetStudentProfileUseCaseResponse {
  student: Student
}

export class GetUserProfileUseCase {
  constructor(private studentsRepository: StudentsRepository) { }

  async execute({
    studentId
  }: GetStudentProfileUseCaseRequest): Promise<GetStudentProfileUseCaseResponse> {
    const student = await this.studentsRepository.findById(studentId)

    if (!student) {
      throw new ResourceNotFoundError()
    }

    return {
      student,
    }
  }
}
