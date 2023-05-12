import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginAsync,
  FastifyRequest,
} from "fastify";
import { fileSystem } from "../../api";
import dayjs from "dayjs";
import readdir from "readdirp";

const FileSystemRoute: FastifyPluginAsync = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.get("/getAllFolder", {}, async (request, reply) => {
    try {
      const resp = await fileSystem.getAllFolder();
      return reply.code(200).send({
        statusCode: 200,
        result: { folder: resp },
        time: dayjs().unix(),
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        statusCode: 500,
        error: "未知錯誤",
        time: dayjs().unix(),
      });
    }
  });

  server.post(
    "/copyFolder",
    {},
    async (request: FastifyRequest<{ Body: { webSite: string } }>, reply) => {
      try {
        const resp = await fileSystem.copyFolder(request.body.webSite);
        return reply.code(200).send({
          statusCode: 200,
          result: { ...resp },
          time: dayjs().unix(),
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({
          statusCode: 500,
          error: "未知錯誤",
          time: dayjs().unix(),
        });
      }
    }
  );

  server.post(
    "/moveUpFolder",
    {},
    async (
      request: FastifyRequest<{
        Body: { webSite: string; lastData: readdir.EntryInfo[] };
      }>,
      reply
    ) => {
      try {
        const resp = await fileSystem.moveUpFolder({
          webSite: request.body.webSite,
          lastData: request.body.lastData,
        });

        return reply.code(200).send({
          statusCode: 200,
          result: { ...resp },
          time: dayjs().unix(),
        });
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({
          statusCode: 500,
          error: "未知錯誤",
          time: dayjs().unix(),
        });
      }
    }
  );

  server.post("/deleteFolder", {}, async (request, reply) => {
    try {
      const resp = await fileSystem.deleteFolder();
      return reply.code(200).send({
        statusCode: 200,
        result: { ...resp },
        time: dayjs().unix(),
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        statusCode: 500,
        error: "未知錯誤",
        time: dayjs().unix(),
      });
    }
  });
};

export default FileSystemRoute;
