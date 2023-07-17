import { verifyJwt } from "@/http/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { registerSubjectSchedule } from "./register-subject-schedule"

export const subjectSchedulesRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt)

  app.post("/subject-schedules/register", registerSubjectSchedule)
}
