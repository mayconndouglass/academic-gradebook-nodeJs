import { Prisma, Grade } from "@prisma/client"
import { GradeRepository } from "../grade-repository"
import { randomUUID } from "crypto"

export class InMemoryGradesRepository implements GradeRepository {
  public items: Grade[] = []

  async updateGrade(id: string, grade: number): Promise<Grade | null> {
    const gradee = this.items.find(grade => grade.id === id)

    if (!gradee) {
      return null
    }

    gradee.grade = grade

    return gradee
  }

  async create(data: Prisma.GradeUncheckedCreateInput): Promise<Grade> {
    const gradee: Grade = {
      id: data.id ?? randomUUID(),
      grade: data.grade,
      description: data.description,
      subject_id: data.subject_id
    }

    this.items.push(gradee)

    return gradee
  }

  async findManyBySubject(subjectId: string): Promise<Grade[]> {
    const grades = this.items.filter(item => item.subject_id === subjectId)

    return grades
  }

}
