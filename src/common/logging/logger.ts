export interface Logger {
  info(message: string, context?: Record<string, unknown>): void;

  warn(message: string, context?: Record<string, unknown>): void;

  error(message: string, context?: Record<string, unknown>): void;

  debug(message: string, context?: Record<string, unknown>): void;
}

function formatContext(
  context?: Record<string, unknown>,
): string {
  if (!context) {
    return "";
  }

  return ` ${JSON.stringify(context)}`;
}

/**
 * Lightweight application logger.
 *
 * This keeps API components independent from a specific logging
 * implementation. A structured logger can replace this adapter later.
 */
export function createLogger(): Logger {
  return {
    info(message, context) {
      console.info(
        `[INFO] ${message}${formatContext(context)}`,
      );
    },

    warn(message, context) {
      console.warn(
        `[WARN] ${message}${formatContext(context)}`,
      );
    },

    error(message, context) {
      console.error(
        `[ERROR] ${message}${formatContext(context)}`,
      );
    },

    debug(message, context) {
      if (process.env.NODE_ENV === "development") {
        console.debug(
          `[DEBUG] ${message}${formatContext(context)}`,
        );
      }
    },
  };
}