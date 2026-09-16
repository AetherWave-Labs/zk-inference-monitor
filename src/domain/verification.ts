import type {
  InferenceId,
  Timestamp,
  VerificationId,
} from "./common.js";

/**
 * Verification lifecycle.
 *
 * This lifecycle is independent from inference execution.
 */
export type VerificationStatus =
  | "PENDING"
  | "VERIFIED"
  | "INVALID"
  | "MALFORMED"
  | "ERROR";

/**
 * Reference to a proof submitted for verification.
 */
export interface ProofReference {
  /**
   * Identifier assigned by the verification subsystem.
   */
  id: VerificationId;

  /**
   * Proof system identifier.
   *
   * Examples could include a future verifier implementation name.
   */
  system?: string;

  /**
   * Optional commitment/hash/reference to the proof.
   */
  commitment?: string;
}

/**
 * Result produced by the verifier.
 */
export interface VerificationResult {
  valid: boolean;

  /**
   * Optional verifier-specific information.
   */
  details?: unknown;
}

/**
 * Core verification record.
 *
 * Verification is associated with an inference but is not part
 * of the inference execution state.
 */
export interface VerificationRecord {
  id: VerificationId;

  inferenceId: InferenceId;

  status: VerificationStatus;

  proof: ProofReference;

  createdAt: Timestamp;

  startedAt?: Timestamp;

  completedAt?: Timestamp;

  updatedAt: Timestamp;

  result?: VerificationResult;

  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}