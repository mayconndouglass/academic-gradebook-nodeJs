import { Grade, Prisma } from "@prisma/client"

export interface GradesRepository {
  create(data: Prisma.GradeUncheckedCreateInput): Promise<Grade>
  findManyBySubject(subjectId: string): Promise<Grade[]>
}
