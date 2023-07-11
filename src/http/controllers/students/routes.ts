import { FastifyInstance } from "fastify"
import { register } from "./register"
import { authenticate } from "./authenticate"
import { profile } from "./profile"
import { verifyJwt } from "../../middlewares/verify-jwt"

export const appRoutes = async (app: FastifyInstance) => {
  app.post("/students", register)
  app.post("/sessions", authenticate)

  /* Authenticated */
  app.get("/me", { onRequest: [verifyJwt] }, profile)
}
