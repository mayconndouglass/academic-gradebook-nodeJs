import { verifyJwt } from "@/http/middlewares/verify-jwt"
import { registerAbsence } from "./register-absence"
import { FastifyInstance } from "fastify"
import { updateAbsence } from "./update-absence"

export const absencesRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt)

  app.post("/absences/register", registerAbsence)
  app.post("/absences/update", updateAbsence)
}
