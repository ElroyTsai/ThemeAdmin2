import fastify, { FastifyInstance } from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import FileSystemRoute from "../router/file-system";
import SettingRoute from "../router/setting";
import cors from "@fastify/cors";

const server: FastifyInstance = fastify();

const startServer: (port: number) => FastifyInstance = (port) => {
  const listenAddress = "0.0.0.0";
  const fastifyConfig = {
    port: port,
    host: listenAddress,
  };

  server.register(cors, {
    origin: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Accept",
      "Content-Type",
      "Authorization",
    ],
    methods: ["GET", "PUT", "OPTIONS", "POST", "DELETE"],
  });

  server.register(FileSystemRoute);
  server.register(SettingRoute);

  server.listen(fastifyConfig, (error, _) => {
    if (error) {
      console.error(error);
    }
  });

  server.register(fastifyStatic, {
    root: path.join(__dirname, "../../../dist"),
    prefix: "/",
  });

  return server;
};

export default startServer;
