import type {
  InferenceId,
  ProofId,
  VerificationRecord,
} from "../../domain/index.js";

/**
 * POST /verification/proofs
 */
export interface SubmitProofRequest {
  inferenceId: InferenceId;

  proof: {
    id?: ProofId;

    system?: string;

    commitment?: string;

    payload?: unknown;
  };
}

/**
 * Response returned after a proof is submitted.
 */
export interface SubmitProofResponse {
  verification: VerificationRecord;
}

/**
 * GET /verification/:id
 */
export interface GetVerificationResponse {
  verification: VerificationRecord;
}

/**
 * GET /verification
 */
export interface ListVerificationsRequest {
  inferenceId?: InferenceId;

  status?: VerificationRecord["status"];

  limit?: number;

  cursor?: string;
}

/**
 * Response for GET /verification.
 */
export interface ListVerificationsResponse {
  items: VerificationRecord[];

  nextCursor?: string;
}