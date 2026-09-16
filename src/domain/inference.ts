import type {
  InferenceId,
  ModelId,
  Timestamp,
} from "./common.js";

import type {
  InferenceMetrics,
} from "./metrics.js";

/**
 * Execution status of an inference.
 *
 * Verification is intentionally excluded.
 */
export type InferenceStatus =
  | "PENDING"
  | "RUNNING"
  | "FAILED"
  | "COMPLETED";

/**
 * Valid execution-state transitions.
 *
 * Verification states are deliberately excluded because verification
 * belongs to a separate domain lifecycle.
 */
export type InferenceTransition =
  | {
      from: "PENDING";
      to: "RUNNING";
    }
  | {
      from: "PENDING";
      to: "FAILED";
    }
  | {
      from: "RUNNING";
      to: "FAILED";
    }
  | {
      from: "RUNNING";
      to: "COMPLETED";
    };

/**
 * Reference to the model used for an inference.
 */
export interface ModelReference {
  id: ModelId;

  /**
   * Optional model version.
   */
  version?: string;
}

/**
 * Input and output associated with an inference.
 */
export interface InferencePayload {
  input?: unknown;

  output?: unknown;
}

/**
 * Error information associated with a failed inference.
 */
export interface InferenceError {
  code: string;

  message: string;

  details?: unknown;
}

/**
 * Core inference record.
 *
 * This record represents inference execution.
 * Verification is represented separately by VerificationRecord.
 */
export interface InferenceRecord {
  /**
   * Unique inference identifier.
   */
  id: InferenceId;

  /**
   * Model associated with the inference.
   */
  model: ModelReference;

  /**
   * Current execution status.
   */
  status: InferenceStatus;

  /**
   * Time the inference record was created.
   */
  createdAt: Timestamp;

  /**
   * Time inference execution started.
   */
  startedAt?: Timestamp;

  /**
   * Time inference execution completed or failed.
   */
  completedAt?: Timestamp;

  /**
   * Last time the inference record was updated.
   */
  updatedAt: Timestamp;

  /**
   * Optional inference input/output payload.
   */
  payload?: InferencePayload;

  /**
   * Performance metrics collected during execution.
   */
  metrics?: InferenceMetrics;

  /**
   * Error information when status is FAILED.
   */
  error?: InferenceError;
}