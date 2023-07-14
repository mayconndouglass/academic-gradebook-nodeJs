import { verifyJwt } from "@/http/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { registerGrade } from "./register-grade"
import { removeGrade } from "./remove-grade"
import { updateGrade } from "./update-grade"

export const gradesRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt)

  app.post("/grades/register", registerGrade)
  app.delete("/grades/delete", removeGrade)
  app.patch("/grades/update", updateGrade)
}
