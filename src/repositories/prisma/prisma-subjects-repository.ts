import { Prisma, Subject } from "@prisma/client"
import { SubjectRepository } from "../interfaces/subject-repository"
import { prisma } from "@/lib/prisma"

export class PrismaSubjectsRepository implements SubjectRepository {
  async create(data: Prisma.SubjectUncheckedCreateInput): Promise<Subject> {
    const subject = await prisma.subject.create({
      data
    })

    return subject
  }

  async findByName(name: string): Promise<Subject | null> {
    const subject = await prisma.subject.findUnique({
      where: {
        name,
      }
    })

    return subject
  }

  async findManyByStudentId(studentId: string): Promise<Subject[]> {
    const subjects = await prisma.subject.findMany({
      where: {
        student_id: studentId
      }
    })

    return subjects
  }

  async findById(id: string): Promise<Subject | null> {
    const subject = await prisma.subject.findUnique({
      where: {
        id
      }
    })

    return subject
  }

  async updateName(id: string, name: string): Promise<Subject | null> {
    const subject = await prisma.subject.update({
      where: {
        id
      },
      data: {
        name
      }
    })

    return subject
  }

  async delete(id: string): Promise<void | null> {
    await prisma.subject.delete({
      where: {
        id
      }
    })
  }

  async findManySubjectsWithSubjectScheduleByStudent(studentId: string): Promise<Subject[]> {
    const subjects = await prisma.subject.findMany({
      where: {
        student_id: studentId
      },
      include: {
        SubjectSchedule: true
      }
    })

    return subjects
  }


}
