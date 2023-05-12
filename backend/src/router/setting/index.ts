import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginAsync,
  FastifyRequest,
} from "fastify";
import { fileSystem, setting } from "../../api";
import dayjs from "dayjs";
import { ISetting } from "../../interface/setting";

const SettingRoute: FastifyPluginAsync = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.get("/getSetting", {}, async (request, reply) => {
    try {
      const resp = await setting.getSetting();
      return reply.code(200).send({
        statusCode: 200,
        result: resp,
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
    "/setSetting",
    {},
    async (request: FastifyRequest<{ Body: ISetting }>, reply) => {
      try {
        await setting.setSetting(request.body);
        await fileSystem.updateSetting();
        return reply.code(200).send({
          statusCode: 200,
          result: {
            message: "成功!",
            status: "success",
          },
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

export default SettingRoute;
