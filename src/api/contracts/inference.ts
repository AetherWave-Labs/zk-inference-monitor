import type {
  InferenceId,
  InferenceRecord,
  ModelId,
  Timestamp,
} from "../../domain/index.js";

/**
 * POST /inferences
 */
export interface CreateInferenceRequest {
  modelId: ModelId;

  input?: unknown;
}

/**
 * Response returned after an inference is created.
 */
export interface CreateInferenceResponse {
  inference: InferenceRecord;
}

/**
 * GET /inferences/:id
 */
export interface GetInferenceResponse {
  inference: InferenceRecord;
}

/**
 * GET /inferences
 */
export interface ListInferencesRequest {
  status?: InferenceRecord["status"];

  modelId?: ModelId;

  from?: Timestamp;

  to?: Timestamp;

  limit?: number;

  cursor?: string;
}

/**
 * Response for GET /inferences.
 */
export interface ListInferencesResponse {
  items: InferenceRecord[];

  nextCursor?: string;
}

/**
 * GET /inferences/:id/metrics
 */
export interface GetInferenceMetricsResponse {
  inferenceId: InferenceId;

  metrics: InferenceRecord["metrics"];
}