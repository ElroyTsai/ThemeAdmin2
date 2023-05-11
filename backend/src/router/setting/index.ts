import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginAsync,
} from "fastify";
import { setting } from "../../api";
import dayjs from "dayjs";

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
};

export default SettingRoute;
