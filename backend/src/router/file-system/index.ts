import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginAsync,
  FastifyRequest,
} from "fastify";
import { fileSystem } from "../../api";
import dayjs from "dayjs";

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
    async (request: FastifyRequest<{ Body: { site: string } }>, reply) => {
      try {
        const resp = await fileSystem.copyFolder(request.body.site);
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
};

export default FileSystemRoute;