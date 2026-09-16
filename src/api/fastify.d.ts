import type { Logger } from "../common/logging/logger.js";

declare module "fastify" {
  interface FastifyInstance {
    appLogger: Logger;
  }
}