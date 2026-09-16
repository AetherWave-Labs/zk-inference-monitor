import { createServer } from "./api/server.js";
import { loadConfig } from "./common/config/config.js";
import { createLogger } from "./common/logging/logger.js";

async function main(): Promise<void> {
  const config = loadConfig();
  const logger = createLogger();

  const app = createServer({
    config,
    logger,
  });

  try {
    await app.listen({
      host: config.host,
      port: config.port,
    });

    logger.info(
      "zk-inference-monitor API started",
      {
        host: config.host,
        port: config.port,
        environment: config.nodeEnv,
      },
    );
  } catch (error) {
    logger.error(
      "Failed to start API server",
      {
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
    );

    process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  console.error(
    "Fatal application error",
    error,
  );

  process.exitCode = 1;
});