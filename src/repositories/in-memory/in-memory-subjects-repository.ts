import { Subject, Prisma } from "@prisma/client"
import { SubjectRepository } from "../subject-repository"
import { randomUUID } from "crypto"

export class InMemorySubjectRepository implements SubjectRepository {
  public items: Subject[] = []

  async findManyByStudentId(studentId: string): Promise<Subject[]> {
    const subjects = this.items.filter(item => item.student_id === studentId)

    return subjects
  }

  async findByName(name: string): Promise<Subject | null> {
    const subject = this.items.find(item => item.name === name)

    if (!subject) {
      return null
    }

    return subject
  }

  async create(data: Prisma.SubjectUncheckedCreateInput): Promise<Subject> {
    const subject = {
      id: data.id ?? randomUUID(),
      name: data.name,
      teacher_name: data.teacher_name,
      hours: data.hours,
      student_id: data.student_id,
    }

    this.items.push(subject)

    return subject
  }
}
