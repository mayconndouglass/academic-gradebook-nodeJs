import { Prisma, Absence } from "@prisma/client"
import { AbsenceRepository } from "../interfaces/absence-repository"
import { prisma } from "@/lib/prisma"

export class PrismaAbsencesRepository implements AbsenceRepository {
  async create(data: Prisma.AbsenceUncheckedCreateInput): Promise<Absence> {
    const absence = await prisma.absence.create({
      data
    })

    return absence
  }

  async update(id: string, number_absences: number): Promise<Absence | null> {
    const absence = await prisma.absence.update({
      where: {
        id,
      },
      data: {
        number_absences
      }
    })

    return absence
  }
}
