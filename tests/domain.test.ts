import test from "node:test";
import assert from "node:assert/strict";

import {
  inferenceId,
  modelId,
  timestamp,
  type InferenceRecord,
  type VerificationRecord,
} from "../../src/domain/index.js";

import { InferenceLifecycleService } from "../../src/inference/services/inference-lifecycle.service.js";

test("creates strongly typed domain identifiers", () => {
  const id = inferenceId("inf-001");
  const model = modelId("model-001");
  const createdAt = timestamp("2026-09-16T15:00:00.000Z");

  assert.equal(id, "inf-001");
  assert.equal(model, "model-001");
  assert.equal(createdAt, "2026-09-16T15:00:00.000Z");
});

test("allows valid inference lifecycle transitions", () => {
  const service = new InferenceLifecycleService();

  assert.equal(
    service.canTransition("PENDING", "RUNNING"),
    true,
  );

  assert.equal(
    service.canTransition("RUNNING", "COMPLETED"),
    true,
  );

  assert.equal(
    service.canTransition("RUNNING", "FAILED"),
    true,
  );

  assert.equal(
    service.canTransition("PENDING", "FAILED"),
    true,
  );
});

test("rejects invalid inference lifecycle transitions", () => {
  const service = new InferenceLifecycleService();

  assert.equal(
    service.canTransition("COMPLETED", "RUNNING"),
    false,
  );

  assert.equal(
    service.canTransition("FAILED", "RUNNING"),
    false,
  );
});

test("verification remains separate from inference execution", () => {
  const inference: InferenceRecord = {
    id: inferenceId("inf-001"),
    model: {
      id: modelId("model-001"),
    },
    status: "COMPLETED",
    createdAt: timestamp("2026-09-16T15:00:00.000Z"),
    updatedAt: timestamp("2026-09-16T15:00:05.000Z"),
  };

  const verification: VerificationRecord = {
    id: "verification-001" as VerificationRecord["id"],
    inferenceId: inference.id,
    status: "VERIFIED",
    proof: {
      id: "proof-001" as VerificationRecord["id"],
    },
    createdAt: timestamp("2026-09-16T15:00:06.000Z"),
    updatedAt: timestamp("2026-09-16T15:00:07.000Z"),
  };

  assert.equal(inference.status, "COMPLETED");
  assert.equal(verification.status, "VERIFIED");
  assert.equal(verification.inferenceId, inference.id);
});