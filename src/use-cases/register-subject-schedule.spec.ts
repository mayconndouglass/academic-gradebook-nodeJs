import { expect, describe, it, beforeEach } from "vitest"

import { RegisterSubjectScheduleUseCase } from "./register-subject-schedule"
import { InMemorySubjectSchedule } from "@/repositories/in-memory/in-memory-subject-schedule-repository"

describe("Register Subject Schedule Use Case", () => {
  let subjectScheduleRepository: InMemorySubjectSchedule
  let registerSubjectScheduleUseCase: RegisterSubjectScheduleUseCase

  beforeEach(() => {
    subjectScheduleRepository = new InMemorySubjectSchedule()
    registerSubjectScheduleUseCase = new RegisterSubjectScheduleUseCase(subjectScheduleRepository)
  })

  it("should be able to register a new subject schedule", async () => {
    const { subjectSchedule } = await registerSubjectScheduleUseCase.execute({
      days: ["Sun", "Mon", "Tue",],
      start_time: "14:00",
      end_time: "16:00",
      subject_id: "subjectId"
    })

    expect(subjectSchedule.id).toEqual(expect.any(String))
  })
})


