import { defineConfig, type ViteDevServer } from "vite";
import { saveCompletedGame, topScoresForPlayer } from "./src/data/database";
import type { ResultData } from "./src/data/resultModel";

export default defineConfig({
  plugins: [
    {
      name: "save-score",
      configureServer(server: ViteDevServer) {
        server.middlewares.use("/api/scores", (req, res, next) => {
          if (req.method === "GET") {
            const url = new URL(req.url ?? "", "http://localhost");
            const name = url.searchParams.get("name") ?? "";
            res.setHeader("content-type", "application/json");
            res.end(JSON.stringify(topScoresForPlayer(name)));
            return;
          }
          if (req.method !== "POST") return next();
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", () => {
            const message = JSON.parse(body) as { name: string; result: ResultData };
            saveCompletedGame(message.name, message.result);
            res.statusCode = 204;
            res.end();
          });
        });
      },
    },
  ],
});
