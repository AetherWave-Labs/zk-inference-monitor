import type {
  InferenceId,
  ProofId,
  Timestamp,
  VerificationId,
} from "./common.js";

/**
 * Verification lifecycle.
 *
 * This lifecycle is independent from inference execution status.
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
   * Unique proof identifier.
   */
  id: ProofId;

  /**
   * Proof system or verifier implementation.
   *
   * Example:
   * "groth16"
   * "plonk"
   * "custom-verifier"
   */
  system?: string;

  /**
   * Optional proof commitment or hash.
   */
  commitment?: string;
}

/**
 * Result returned by a proof verifier.
 */
export interface VerificationResult {
  /**
   * Whether the proof was cryptographically valid.
   */
  valid: boolean;

  /**
   * Optional verifier-specific result information.
   */
  details?: unknown;
}

/**
 * Error information generated during verification.
 */
export interface VerificationError {
  code: string;

  message: string;

  details?: unknown;
}

/**
 * Core verification record.
 *
 * A verification record belongs to an inference but maintains
 * its own independent lifecycle.
 */
export interface VerificationRecord {
  /**
   * Unique verification identifier.
   */
  id: VerificationId;

  /**
   * Inference associated with this verification.
   */
  inferenceId: InferenceId;

  /**
   * Current verification status.
   */
  status: VerificationStatus;

  /**
   * Proof being verified.
   */
  proof: ProofReference;

  /**
   * Time verification was created.
   */
  createdAt: Timestamp;

  /**
   * Time verification started.
   */
  startedAt?: Timestamp;

  /**
   * Time verification completed.
   */
  completedAt?: Timestamp;

  /**
   * Last update time.
   */
  updatedAt: Timestamp;

  /**
   * Verification result.
   */
  result?: VerificationResult;

  /**
   * Verification error.
   */
  error?: VerificationError;
}