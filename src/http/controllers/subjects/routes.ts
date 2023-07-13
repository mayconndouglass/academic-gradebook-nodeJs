import { verifyJwt } from "@/http/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { registerSubject } from "./register-subject"
import { updateSubject } from "./update-subject"
import { removeSubject } from "./remove-subject"
import { fetchStudentsSubject } from "./fetch-students-subject"

export const subjectsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt)

  app.post("/subjects/register", registerSubject)
  app.patch("/subjects/update", updateSubject)
  app.delete("/subjects/delete", removeSubject)
  app.get("/subjects/students", fetchStudentsSubject)
}
