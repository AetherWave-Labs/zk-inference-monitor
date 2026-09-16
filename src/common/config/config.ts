import "dotenv/config";

export interface AppConfig {
  nodeEnv: string;
  host: string;
  port: number;
  logLevel: string;
}

function parsePort(value: string | undefined): number {
  const port = Number(value ?? 3000);

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error(
      "PORT must be an integer between 1 and 65535",
    );
  }

  return port;
}

export function loadConfig(): AppConfig {
  return {
    nodeEnv: process.env.NODE_ENV ?? "development",
    host: process.env.HOST ?? "127.0.0.1",
    port: parsePort(process.env.PORT),
    logLevel: process.env.LOG_LEVEL ?? "info",
  };
}