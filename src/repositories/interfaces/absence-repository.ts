import { Absence, Prisma } from "@prisma/client"

export interface AbsenceRepository {
  create(data: Prisma.AbsenceUncheckedCreateInput): Promise<Absence>
  update(id: string, number_absences: number): Promise<Absence | null>
}
