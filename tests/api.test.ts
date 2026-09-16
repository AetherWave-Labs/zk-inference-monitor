import {
  createServer,
} from "../src/api/server";

import {
  loadConfig,
} from "../src/common/config/config";

import {
  createLogger,
} from "../src/common/logging/logger";

describe("API service", () => {
  const config = loadConfig();

  const logger = createLogger();

  const app = createServer({
    config,
    logger,
  });

  afterAll(async () => {
    await app.close();
  });

  it("responds to the health endpoint", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(200);

    expect(response.json()).toEqual({
      status: "ok",
      service: "zk-inference-monitor",
    });
  });
});