/**
 * Performance metrics associated with an inference.
 */

export interface LatencyMetrics {
  /**
   * Time from inference request creation until execution starts.
   */
  queueLatencyMs?: number;

  /**
   * Time spent executing the model.
   */
  executionLatencyMs?: number;

  /**
   * Time required to complete post-processing.
   */
  processingLatencyMs?: number;

  /**
   * Total observed inference latency.
   */
  totalLatencyMs?: number;
}

export interface InferenceMetrics extends LatencyMetrics {
  /**
   * Number of tokens processed, when applicable.
   */
  inputTokens?: number;

  /**
   * Number of tokens generated, when applicable.
   */
  outputTokens?: number;

  /**
   * Optional model confidence score.
   */
  confidence?: number;
}