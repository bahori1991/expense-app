import app from "./app";

const server = Bun.serve({
  fetch: app.fetch,
});

console.log("server is running...", server.port);
