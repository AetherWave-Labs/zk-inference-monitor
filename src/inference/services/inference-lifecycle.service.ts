import type {
  InferenceRecord,
  InferenceStatus,
  InferenceTransition,
} from "../../domain/index.js";

/**
 * Handles valid state transitions for inference execution.
 *
 * Verification is intentionally outside this service.
 */
export class InferenceLifecycleService {
  /**
   * Determine whether a transition is valid.
   */
  canTransition(
    from: InferenceStatus,
    to: InferenceStatus,
  ): boolean {
    return (
      (from === "PENDING" && to === "RUNNING") ||
      (from === "PENDING" && to === "FAILED") ||
      (from === "RUNNING" && to === "FAILED") ||
      (from === "RUNNING" && to === "COMPLETED")
    );
  }

  /**
   * Apply a valid inference execution transition.
   *
   * The transition type itself prevents verification states such
   * as VERIFIED from being supplied here.
   */
  transition(
    inference: InferenceRecord,
    transition: InferenceTransition,
  ): InferenceRecord {
    if (inference.status !== transition.from) {
      throw new Error(
        `Invalid inference transition: expected current status ` +
        `${transition.from}, but received ${inference.status}`,
      );
    }

    return {
      ...inference,
      status: transition.to,
      updatedAt: inference.updatedAt,
    };
  }
}