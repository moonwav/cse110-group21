import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/backend/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "game.sqlite",
  },
});
