export type AppErrorCode =
  | "BAD_REQUEST"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "INTERNAL_ERROR";

export interface AppErrorOptions {
  code: AppErrorCode;
  message: string;
  statusCode: number;
  details?: unknown;
  cause?: unknown;
}

/**
 * Normalized application error.
 *
 * API adapters can translate this error into HTTP responses
 * without coupling the domain layer to HTTP.
 */
export class AppError extends Error {
  public readonly code: AppErrorCode;

  public readonly statusCode: number;

  public readonly details?: unknown;

  public readonly cause?: unknown;

  constructor(options: AppErrorOptions) {
    super(options.message);

    this.name = "AppError";
    this.code = options.code;
    this.statusCode = options.statusCode;
    this.details = options.details;
    this.cause = options.cause;
  }
}