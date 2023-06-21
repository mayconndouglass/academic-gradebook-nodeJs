import { expect, describe, it, beforeEach } from "vitest"

import { FetchStudentSubjectsUseCase } from "./fetch-student-subjects"
import { InMemorySubjectRepository } from "@/repositories/in-memory/in-memory-subjects-repository"

describe("Fetch Student Subjects Use Case", () => {
  let subjectRepository: InMemorySubjectRepository
  let fetchStudentSubjectsUseCase: FetchStudentSubjectsUseCase

  beforeEach(() => {
    subjectRepository = new InMemorySubjectRepository()
    fetchStudentSubjectsUseCase = new FetchStudentSubjectsUseCase(subjectRepository)
  })

  it("should be able to fetch subjetcs from a student", async () => {
    subjectRepository.create({
      id: "subject01",
      name: "teste",
      hours: 10,
      student_id: "studentTeste",
    })

    subjectRepository.create({
      id: "subject02",
      name: "teste",
      hours: 10,
      student_id: "studentTeste",
    })

    subjectRepository.create({
      id: "subject03",
      name: "teste",
      hours: 10,
      student_id: "studentTeste",
    })

    const { subjects } = await fetchStudentSubjectsUseCase.execute({
      studentId: "studentTeste",
    })

    expect(subjects).toHaveLength(3)
    expect(subjects).toEqual([
      expect.objectContaining({ id: "subject01" }),
      expect.objectContaining({ id: "subject02" }),
      expect.objectContaining({ id: "subject03" }),
    ])
  })
})
