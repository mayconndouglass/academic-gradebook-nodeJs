import { fastify } from "fastify"
import { PrismaClient } from "@prisma/client"

export const app = fastify()

const prisma = new PrismaClient()

prisma.student.create({
  data: {
    name: "Maycon Douglas",
    email: "maycondouglas1414@gmail.com",
    password_hash: "123456"
  }
})
