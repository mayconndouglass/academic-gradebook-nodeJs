import { Grade } from "@prisma/client"

export interface GradesRepository {
  findManyBySubject(subjectId: string): Promise<Grade[]>
}
