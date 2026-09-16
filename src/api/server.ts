import Fastify, {
  type FastifyInstance,
} from "fastify";

import type { AppConfig } from "../common/config/config.js";
import type { Logger } from "../common/logging/logger.js";

import { registerApiErrorHandler } from "./errors/api-error-handler.js";
import { registerRoutes } from "./routes/index.js";

export interface CreateServerOptions {
  config: AppConfig;
  logger: Logger;
}

export function createServer(
  options: CreateServerOptions,
): FastifyInstance {
  const app = Fastify({
    logger: false,
  });

  const { logger } = options;

  /**
   * Make the application logger available to request handlers
   * without coupling those handlers to a concrete logger.
   */
  app.decorate("appLogger", logger);

  registerApiErrorHandler(app);

  app.register(registerRoutes);

  return app;
}