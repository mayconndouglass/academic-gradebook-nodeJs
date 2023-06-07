import { prisma } from "@/lib/prisma"
import { Prisma, Student } from "@prisma/client"
import { StudentsRepository } from "../student-respository"

export class PrismaStudentRepository implements StudentsRepository {
  async create(data: Prisma.StudentCreateInput) {
    const student = await prisma.student.create({
      data
    })

    return student
  }

  async findByEmail(email: string): Promise<Student | null> {
    const student = await prisma.student.findUnique({
      where: {
        email,
      }
    })

    return student
  }
}