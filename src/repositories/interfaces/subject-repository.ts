import { Prisma, Subject } from "@prisma/client"

export interface SubjectRepository {
  create(data: Prisma.SubjectUncheckedCreateInput): Promise<Subject>
  findByName(studentId: string, name: string): Promise<Subject | null>
  findManyByStudentId(studentId: string): Promise<Subject[]>
  findById(id: string): Promise<Subject | null>
  updateName(id: string, name: string): Promise<Subject>
  delete(id: string): Promise<void | null>
  findManySubjectsWithSubjectScheduleByStudent(studentId: string): Promise<Subject[]>
}
