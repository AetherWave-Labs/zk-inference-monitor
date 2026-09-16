import type { FastifyInstance } from "fastify";

import { AppError } from "../../common/errors/app-error.js";

export function registerApiErrorHandler(
  app: FastifyInstance,
): void {
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
      request.log.warn(
        {
          code: error.code,
          statusCode: error.statusCode,
          path: request.url,
        },
        error.message,
      );

      return reply.status(error.statusCode).send({
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      });
    }

    request.log.error(
      {
        path: request.url,
        method: request.method,
        error: error.message,
      },
      "Unhandled API error",
    );

    return reply.status(500).send({
      error: {
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred",
      },
    });
  });
}