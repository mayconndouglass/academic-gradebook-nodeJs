import { expect, describe, it, beforeEach } from "vitest"

import { RegisterSubjectUseCase } from "./register-subject"
import { InMemorySubjectRepository } from "@/repositories/in-memory/in-memory-subjects-repository"
import { RegisterGradeUseCase } from "./register-grade"
import { GradeRepository } from "@/repositories/grade-repository"
import { InMemoryGradesRepository } from "@/repositories/in-memory/in-memory-grades-repository"
import { TheGradeLimiteHasBeenExceeded } from "./errors/the-grade-limit-has-been-exceeded-erro"

describe("Register Grade Use Case", () => {
  let subjectRepository: InMemorySubjectRepository
  let gradeRepository: GradeRepository
  let registerSubjectUseCase: RegisterSubjectUseCase
  let registerGradeUseCase: RegisterGradeUseCase

  beforeEach(() => {
    subjectRepository = new InMemorySubjectRepository()
    gradeRepository = new InMemoryGradesRepository()
    registerSubjectUseCase = new RegisterSubjectUseCase(subjectRepository)
    registerGradeUseCase = new RegisterGradeUseCase(gradeRepository)
  })

  it("should be able to register a new grade", async () => {
    const { subject } = await registerSubjectUseCase.execute({
      name: "Filosofia",
      teacher_name: "Fiódor Dostoiévski ",
      hours: 120,
      student_id: "123456",
    })

    const { grade } = await registerGradeUseCase.execute({
      grade: 10,
      description: "notão",
      subjectId: subject.id,
    })

    expect(grade.id).toEqual(expect.any(String))
  })

  it("should not be able to register more than 10 grades", async () => {
    const { subject } = await registerSubjectUseCase.execute({
      name: "Defesa contra as artes das trevas",
      teacher_name: "Severo Snape",
      hours: 200,
      student_id: "123456",
    })

    for (let i = 0; i <= 9; i++) {
      await registerGradeUseCase.execute({
        grade: 10,
        description: "notão",
        subjectId: subject.id,
      })
    }

    await expect(() => registerGradeUseCase.execute({
      grade: 0,
      subjectId: subject.id,
    })).rejects.toBeInstanceOf(TheGradeLimiteHasBeenExceeded)
  })
})
