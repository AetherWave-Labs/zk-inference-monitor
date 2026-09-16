/**
 * Shared primitive domain types.
 */

/**
 * Branded string types prevent accidentally passing one identifier
 * where another identifier is expected.
 */
export type InferenceId = string & {
  readonly __brand: "InferenceId";
};

export type ModelId = string & {
  readonly __brand: "ModelId";
};

export type VerificationId = string & {
  readonly __brand: "VerificationId";
};

/**
 * ISO-8601 timestamp represented as a branded string.
 *
 * Example:
 * 2026-09-16T15:30:00.000Z
 */
export type Timestamp = string & {
  readonly __brand: "Timestamp";
};

/**
 * Helpers for constructing branded identifiers/timestamps.
 */
export function inferenceId(value: string): InferenceId {
  if (!value.trim()) {
    throw new Error("Inference ID cannot be empty");
  }

  return value as InferenceId;
}

export function modelId(value: string): ModelId {
  if (!value.trim()) {
    throw new Error("Model ID cannot be empty");
  }

  return value as ModelId;
}

export function verificationId(value: string): VerificationId {
  if (!value.trim()) {
    throw new Error("Verification ID cannot be empty");
  }

  return value as VerificationId;
}

export function timestamp(value: string): Timestamp {
  const parsed = Date.parse(value);

  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid timestamp: ${value}`);
  }

  return value as Timestamp;
}