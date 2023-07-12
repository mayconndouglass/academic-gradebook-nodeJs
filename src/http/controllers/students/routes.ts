import { FastifyInstance } from "fastify"
import { registerStudent } from "./register-student"
import { authenticate } from "./authenticate"
import { profile } from "./profile"
import { verifyJwt } from "../../middlewares/verify-jwt"

export const studentsRoutes = async (app: FastifyInstance) => {
  app.post("/students", registerStudent)
  app.post("/sessions", authenticate)

  /* Authenticated */
  app.get("/me", { onRequest: [verifyJwt] }, profile)
}
