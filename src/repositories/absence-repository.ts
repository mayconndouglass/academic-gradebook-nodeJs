import { Absence, Prisma } from "@prisma/client"

export interface AbsenceRepository {
  create(data: Prisma.AbsenceUncheckedCreateInput): Promise<Absence>
}
