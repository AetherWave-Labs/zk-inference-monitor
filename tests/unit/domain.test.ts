import test from "node:test";
import assert from "node:assert/strict";

import {
  inferenceId,
  modelId,
  proofId,
  timestamp,
  verificationId,
  type InferenceRecord,
  type VerificationRecord,
} from "../../src/domain";

import {
  InferenceLifecycleService,
} from "../../src/inference/services/inference-lifecycle.service";

test("creates strongly typed identifiers", () => {
  const inference = inferenceId("inf-001");
  const model = modelId("model-001");
  const proof = proofId("proof-001");
  const verification = verificationId("verification-001");

  assert.equal(inference, "inf-001");
  assert.equal(model, "model-001");
  assert.equal(proof, "proof-001");
  assert.equal(verification, "verification-001");
});

test("creates a valid timestamp", () => {
  const value = timestamp(
    "2026-09-16T15:00:00.000Z",
  );

  assert.equal(
    value,
    "2026-09-16T15:00:00.000Z",
  );
});

test("rejects empty identifiers", () => {
  assert.throws(
    () => inferenceId(""),
    /Inference ID cannot be empty/,
  );

  assert.throws(
    () => modelId(""),
    /Model ID cannot be empty/,
  );

  assert.throws(
    () => proofId(""),
    /Proof ID cannot be empty/,
  );

  assert.throws(
    () => verificationId(""),
    /Verification ID cannot be empty/,
  );
});

test("rejects invalid timestamps", () => {
  assert.throws(
    () => timestamp("not-a-timestamp"),
    /Invalid timestamp/,
  );
});

test("allows valid inference lifecycle transitions", () => {
  const service = new InferenceLifecycleService();

  assert.equal(
    service.canTransition("PENDING", "RUNNING"),
    true,
  );

  assert.equal(
    service.canTransition("PENDING", "FAILED"),
    true,
  );

  assert.equal(
    service.canTransition("RUNNING", "FAILED"),
    true,
  );

  assert.equal(
    service.canTransition("RUNNING", "COMPLETED"),
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
    service.canTransition("COMPLETED", "FAILED"),
    false,
  );

  assert.equal(
    service.canTransition("FAILED", "RUNNING"),
    false,
  );

  assert.equal(
    service.canTransition("FAILED", "COMPLETED"),
    false,
  );
});

test("applies a valid inference transition", () => {
  const service = new InferenceLifecycleService();

  const inference: InferenceRecord = {
    id: inferenceId("inf-001"),

    model: {
      id: modelId("model-001"),
      version: "1.0.0",
    },

    status: "PENDING",

    createdAt: timestamp(
      "2026-09-16T15:00:00.000Z",
    ),

    updatedAt: timestamp(
      "2026-09-16T15:00:00.000Z",
    ),
  };

  const updated = service.transition(
    inference,
    {
      from: "PENDING",
      to: "RUNNING",
    },
  );

  assert.equal(updated.status, "RUNNING");
  assert.equal(updated.id, inference.id);
});

test("rejects transition when current state does not match", () => {
  const service = new InferenceLifecycleService();

  const inference: InferenceRecord = {
    id: inferenceId("inf-002"),

    model: {
      id: modelId("model-002"),
    },

    status: "RUNNING",

    createdAt: timestamp(
      "2026-09-16T15:00:00.000Z",
    ),

    updatedAt: timestamp(
      "2026-09-16T15:00:01.000Z",
    ),
  };

  assert.throws(
    () =>
      service.transition(
        inference,
        {
          from: "PENDING",
          to: "RUNNING",
        },
      ),
    /Invalid inference transition/,
  );
});

test("keeps inference and verification states separate", () => {
  const inference: InferenceRecord = {
    id: inferenceId("inf-003"),

    model: {
      id: modelId("model-003"),
    },

    status: "COMPLETED",

    createdAt: timestamp(
      "2026-09-16T15:00:00.000Z",
    ),

    completedAt: timestamp(
      "2026-09-16T15:00:05.000Z",
    ),

    updatedAt: timestamp(
      "2026-09-16T15:00:05.000Z",
    ),
  };

  const verification: VerificationRecord = {
    id: verificationId("verification-003"),

    inferenceId: inference.id,

    status: "VERIFIED",

    proof: {
      id: proofId("proof-003"),
      system: "test-verifier",
    },

    createdAt: timestamp(
      "2026-09-16T15:00:06.000Z",
    ),

    completedAt: timestamp(
      "2026-09-16T15:00:07.000Z",
    ),

    updatedAt: timestamp(
      "2026-09-16T15:00:07.000Z",
    ),

    result: {
      valid: true,
    },
  };

  assert.equal(inference.status, "COMPLETED");
  assert.equal(verification.status, "VERIFIED");
  assert.equal(
    verification.inferenceId,
    inference.id,
  );
});