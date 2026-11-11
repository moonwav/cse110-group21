import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/data/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "game.sqlite",
  },
});
