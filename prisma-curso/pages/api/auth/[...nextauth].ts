import { NextApiHandler } from "next";
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email"
import Adapter from "next-auth/adapters";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


const authHandler : NextApiHandler = (req, res) => NextAuth(req, res, options)

export default authHandler

const options = {
  provders: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM
    })
  ],
  adaptor: Adapter(prisma)
}