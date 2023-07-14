import { fastify } from "fastify"
import { studentsRoutes } from "./http/controllers/students/routes"
import { ZodError } from "zod"
import { env } from "./env"
import fastifyJwt from "@fastify/jwt"
import { subjectsRoutes } from "./http/controllers/subjects/routes"
import { gradesRoutes } from "./http/controllers/grades/routes"

export const app = fastify()
app.register(fastifyJwt, { secret: env.JWT_SECRET })

app.register(studentsRoutes)
app.register(subjectsRoutes)
app.register(gradesRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() })
  }

  if (env.NODE_ENV !== "production") {
    console.error(error)
  }

  return reply.status(500).send({ message: "Internal server error" })
})
