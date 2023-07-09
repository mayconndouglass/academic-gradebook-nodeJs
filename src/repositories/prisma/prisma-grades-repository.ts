import { Prisma, Grade } from "@prisma/client"
import { GradeRepository } from "../interfaces/grade-repository"
import { prisma } from "@/lib/prisma"

export class PrismaGradesRepository implements GradeRepository {
  async create(data: Prisma.GradeUncheckedCreateInput): Promise<Grade> {
    const grade = await prisma.grade.create({
      data
    })

    return grade
  }

  async findManyBySubject(subjectId: string): Promise<Grade[]> {
    const grades = await prisma.grade.findMany({
      where: {
        id: subjectId
      }
    })

    return grades
  }

  async updateGrade(id: string, gradeInput: number): Promise<Grade | null> {
    const grade = await prisma.grade.update({
      where: {
        id
      },
      data: {
        grade: gradeInput
      }
    })

    return grade
  }

  async delete(id: string): Promise<void | null> {
    await prisma.grade.delete({
      where: {
        id
      }
    })
  }

  async findById(id: string): Promise<Grade | null> {
    const grade = await prisma.grade.findUnique({
      where: {
        id
      }
    })

    return grade
  }
}

