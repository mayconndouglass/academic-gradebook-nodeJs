import { StudentsRepository } from "@/repositories/interfaces/student-respository"
import { Student } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-fount-error"

interface GetStudentProfileUseCaseRequest {
  studentId: string
}

interface GetStudentProfileUseCaseResponse {
  student: Student
}

export class GetStudentProfileUseCase {
  private studentsRepository

  constructor(studentsRepository: StudentsRepository) {
    this.studentsRepository = studentsRepository
  }

  async execute({
    studentId
  }: GetStudentProfileUseCaseRequest):
    Promise<GetStudentProfileUseCaseResponse> {

    const student = await this.studentsRepository.findById(studentId)

    if (!student) {
      throw new ResourceNotFoundError()
    }

    return {
      student,
    }
  }
}
