import { verifyJwt } from "@/http/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { registerSubject } from "./register-subject"

export const subjectsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt)

  app.post("/subjects/register", registerSubject)
}
