import { Prisma, Absence } from "@prisma/client"
import { AbsenceRepository } from "../interfaces/absence-repository"
import { randomUUID } from "crypto"

export class InMemoryAbsenceRepository implements AbsenceRepository {
  public items: Absence[] = []

  async findAbsenceByStudentId(subjectId: string): Promise<Absence | null> {
    const absence = this.items.find(item => item.id === subjectId)

    if (!absence) {
      return null
    }

    return absence
  }

  async update(id: string, number_absences: number): Promise<Absence | null> {
    const absence = this.items.find(item => item.id === id)

    if (!absence) {
      return null
    }

    absence.number_absences = number_absences

    return absence
  }

  async create(data: Prisma.AbsenceUncheckedCreateInput): Promise<Absence> {
    const absence = {
      id: data.id ?? randomUUID(),
      number_absences: data.number_absences,
      max_absences: data.max_absences,
      description: data.description,
      subject_id: data.subject_id,
    }

    this.items.push(absence as Absence)

    return absence as Absence
  }
}
