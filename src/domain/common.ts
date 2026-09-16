/**
 * Shared primitive domain types.
 *
 * These branded types prevent accidental interchange of identifiers
 * that are all represented as strings at runtime.
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

export type ProofId = string & {
  readonly __brand: "ProofId";
};

/**
 * ISO-8601 timestamp represented as a branded string.
 */
export type Timestamp = string & {
  readonly __brand: "Timestamp";
};

/**
 * Create an InferenceId.
 */
export function inferenceId(value: string): InferenceId {
  if (!value.trim()) {
    throw new Error("Inference ID cannot be empty");
  }

  return value as InferenceId;
}

/**
 * Create a ModelId.
 */
export function modelId(value: string): ModelId {
  if (!value.trim()) {
    throw new Error("Model ID cannot be empty");
  }

  return value as ModelId;
}

/**
 * Create a VerificationId.
 */
export function verificationId(value: string): VerificationId {
  if (!value.trim()) {
    throw new Error("Verification ID cannot be empty");
  }

  return value as VerificationId;
}

/**
 * Create a ProofId.
 */
export function proofId(value: string): ProofId {
  if (!value.trim()) {
    throw new Error("Proof ID cannot be empty");
  }

  return value as ProofId;
}

/**
 * Create a validated ISO-8601 timestamp.
 */
export function timestamp(value: string): Timestamp {
  if (!value.trim()) {
    throw new Error("Timestamp cannot be empty");
  }

  const parsed = Date.parse(value);

  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid timestamp: ${value}`);
  }

  return value as Timestamp;
}