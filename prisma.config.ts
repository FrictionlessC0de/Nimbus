import path from "node:path"
import { defineConfig } from "prisma/config"
import { config } from "dotenv"

config({ path: ".env.local" })

const connectionString = process.env.DIRECT_URL!

export default defineConfig({
  earlyAccess: true,
  schema: path.join("prisma", "schema.prisma"),
  migrate: {
    async adapter() {
      const { PrismaNeon } = await import("@prisma/adapter-neon")
      return new PrismaNeon({ connectionString })
    },
  },
  datasource: {
    url: connectionString,
  },
})