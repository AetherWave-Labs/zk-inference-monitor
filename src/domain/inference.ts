import type {
  InferenceId,
  ModelId,
  Timestamp,
} from "./common.js";

import type { InferenceMetrics } from "./metrics.js";

/**
 * Execution state of an inference.
 *
 * Verification is deliberately NOT included here.
 */
export type InferenceStatus =
  | "PENDING"
  | "RUNNING"
  | "FAILED"
  | "COMPLETED";

/**
 * Information about a model involved in an inference.
 */
export interface ModelReference {
  id: ModelId;
  version?: string;
}

/**
 * Optional inference input/output references.
 *
 * The domain layer does not assume a specific storage mechanism.
 */
export interface InferencePayload {
  input?: unknown;
  output?: unknown;
}

/**
 * Error information for a failed inference.
 */
export interface InferenceError {
  code: string;
  message: string;
  details?: unknown;
}

/**
 * Core inference record.
 *
 * This represents inference execution only.
 * Verification is represented separately by VerificationRecord.
 */
export interface InferenceRecord {
  id: InferenceId;

  model: ModelReference;

  status: InferenceStatus;

  createdAt: Timestamp;

  startedAt?: Timestamp;

  completedAt?: Timestamp;

  updatedAt: Timestamp;

  payload?: InferencePayload;

  metrics?: InferenceMetrics;

  error?: InferenceError;
}