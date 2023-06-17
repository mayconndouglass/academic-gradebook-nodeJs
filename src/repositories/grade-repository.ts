import { Grade, Prisma } from "@prisma/client"

export interface GradeRepository {
  create(data: Prisma.GradeUncheckedCreateInput): Promise<Grade>
  findManyBySubject(subjectId: string): Promise<Grade[]>
}
