import { expect, describe, it, beforeEach } from "vitest"

import { RegisterSubjectUseCase } from "./register-subject"
import { InMemorySubjectRepository } from "@/repositories/in-memory/in-memory-subjects-repository"
import { RegisterGradeUseCase } from "./register-grade"
import { GradeRepository } from "@/repositories/grade-repository"
import { InMemoryGradesRepository } from "@/repositories/in-memory/in-memory-grades-repository"
import { FetchGradesBySubjectUseCase } from "./fetch-grades-by-subject"

describe("Fetch Grades by Subjects Use Case", () => {
  let subjectRepository: InMemorySubjectRepository
  let gradeRepository: GradeRepository
  let registerSubjectUseCase: RegisterSubjectUseCase
  let registerGradeUseCase: RegisterGradeUseCase
  let fetchGradesBySubjectUseCase: FetchGradesBySubjectUseCase

  beforeEach(() => {
    subjectRepository = new InMemorySubjectRepository()
    gradeRepository = new InMemoryGradesRepository()
    registerSubjectUseCase = new RegisterSubjectUseCase(subjectRepository)
    registerGradeUseCase = new RegisterGradeUseCase(gradeRepository)
    fetchGradesBySubjectUseCase = new FetchGradesBySubjectUseCase(gradeRepository)
  })

  it("should be able to fetch grades from a subject", async () => {
    const { subject } = await registerSubjectUseCase.execute({
      name: "Filosofia",
      teacher_name: "Fiódor Dostoiévski ",
      hours: 120,
      student_id: "123456",
    })

    await registerGradeUseCase.execute({
      grade: 10,
      description: "nota01",
      subjectId: subject.id,
    })

    await registerGradeUseCase.execute({
      grade: 10,
      description: "nota02",
      subjectId: subject.id,
    })

    const { grades } = await fetchGradesBySubjectUseCase.execute({ subjectId: subject.id })

    expect(grades).toHaveLength(2)
    expect(grades).toEqual([
      expect.objectContaining({ description: "nota01" }),
      expect.objectContaining({ description: "nota02" }),
    ])
  })
})


