import { FastifyInstance } from "fastify"
import { register } from "./controllers/register"

export const appRoutes = async (app: FastifyInstance) => {
  app.post("/students", register)
}
