import type {
  InferenceRecord,
  InferenceStatus,
  InferenceTransition,
} from "../../domain/index.js";

export class InferenceLifecycleService {
  /**
   * Determine whether an inference status transition is valid.
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
   * Verification states are deliberately rejected because they
   * belong to the verification domain.
   */
  transition(
    inference: InferenceRecord,
    transition: InferenceTransition,
  ): InferenceRecord {
    if (inference.status !== transition.from) {
      throw new Error(
        `Invalid transition: expected ${transition.from}, ` +
        `but inference is currently ${inference.status}`,
      );
    }

    return {
      ...inference,
      status: transition.to,
      updatedAt: inference.updatedAt,
    };
  }
}