import type {
  InferenceId,
  VerificationRecord,
  VerificationId,
} from "../../domain/index.js";

/**
 * POST /verification/proofs
 */
export interface SubmitProofRequest {
  inferenceId: InferenceId;

  proof: {
    id?: VerificationId;

    system?: string;

    commitment?: string;

    payload?: unknown;
  };
}

export interface SubmitProofResponse {
  verification: VerificationRecord;
}

/**
 * GET /verification/:id
 */
export interface GetVerificationResponse {
  verification: VerificationRecord;
}