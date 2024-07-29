import { Subject, Prisma } from "@prisma/client"
import { randomUUID } from "crypto"
import { SubjectRepository } from "../interfaces/subject-repository"

export class InMemorySubjectRepository implements SubjectRepository {
  public items: Subject[] = []

  async findById(id: string): Promise<Subject | null> {
    const subject = this.items.find(item => item.id === id)

    if (!subject) {
      return null
    }

    return subject
  }

  async delete(id: string): Promise<void | null> {
    const subject = this.items.findIndex(item => item.id === id)

    if (subject === - 1) {
      return null
    }

    this.items.splice(subject, 1)
  }

  async updateName(id: string, name: string): Promise<Subject> {
    const subject = this.items.find(item => item.id === id)

    if (!subject) {
      throw console.error("Erro")
    }

    subject.name = name

    return subject
  }

  async findManyByStudentId(studentId: string): Promise<Subject[]> {
    const subjects = this.items.filter(item => item.student_id === studentId)

    return subjects
  }

  async findByName(student_id: string, name: string): Promise<Subject | null> {
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

    this.items.push(subject as Subject)

    return subject as Subject
  }

  async findAllDatafromSubject(studentId: string): Promise<Subject[]> {
    console.log(studentId)
    throw new Error("Method not implemented.")
  }

  async findManySubjectsWithSubjectScheduleByStudent(studentId: string)
    : Promise<Subject[]> {
    console.log(studentId)
    throw new Error("Method not implemented.")
  }
}
