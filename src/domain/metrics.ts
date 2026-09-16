/**
 * Performance metrics associated with an inference.
 */

export interface LatencyMetrics {
  /**
   * Time spent waiting before inference execution starts.
   */
  queueLatencyMs?: number;

  /**
   * Time spent executing the model.
   */
  executionLatencyMs?: number;

  /**
   * Time spent performing post-processing.
   */
  processingLatencyMs?: number;

  /**
   * Total observed latency for the inference.
   */
  totalLatencyMs?: number;
}

/**
 * Metrics collected during inference execution.
 */
export interface InferenceMetrics extends LatencyMetrics {
  /**
   * Number of input tokens processed, when applicable.
   */
  inputTokens?: number;

  /**
   * Number of output tokens generated, when applicable.
   */
  outputTokens?: number;

  /**
   * Model confidence score, when provided by the model.
   */
  confidence?: number;
}