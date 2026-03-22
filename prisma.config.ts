import path from "node:path"
import { defineConfig } from "prisma/config"

export default defineConfig({
  earlyAccess: true,
  schema: path.join("prisma", "schema.prisma"),
  migrate: {
    async adapter() {
      const { PrismaNeon } = await import("@prisma/adapter-neon")
      const { neon } = await import("@neondatabase/serverless")
      const connectionString = process.env.DATABASE_URL!
      const pool = neon(connectionString)
      return new PrismaNeon({ connectionString })
    },
  },
})