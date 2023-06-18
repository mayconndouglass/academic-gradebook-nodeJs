import { Prisma, Absence } from "@prisma/client"
import { AbsenceRepository } from "../absence-repository"
import { randomUUID } from "crypto"

export class InMemoryAbsenceRepository implements AbsenceRepository {
  public items: Absence[] = []

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
