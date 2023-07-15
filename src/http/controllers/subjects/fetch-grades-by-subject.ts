import { PrismaGradesRepository } from "@/repositories/prisma/prisma-grades-repository"
import { FetchGradesBySubjectUseCase } from "@/use-cases/subject/fetch-grades-by-subject"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export const fetchGradesBySuject = async (request: FastifyRequest, reply: FastifyReply) => {
  const gradesQuerySchema = z.object({
    subjectId: z.string()
  })

  const data = gradesQuerySchema.parse(request.query)

  const gradeRepository = new PrismaGradesRepository()
  const fetchGradesBySubject = new FetchGradesBySubjectUseCase(gradeRepository)

  const grades = await fetchGradesBySubject.execute(data)

  return reply.status(200).send(grades)
}
