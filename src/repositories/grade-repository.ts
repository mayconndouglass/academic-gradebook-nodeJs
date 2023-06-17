import { Grade, Prisma } from "@prisma/client"

export interface GradeRepository {
  create(data: Prisma.GradeUncheckedCreateInput): Promise<Grade>
  findManyBySubject(subjectId: string): Promise<Grade[]>
  updateGrade(id: string, grade: number): Promise<Grade | null>
  delete(id: string): Promise<void | null>
  findById(id: string): Promise<Grade | null>
}
