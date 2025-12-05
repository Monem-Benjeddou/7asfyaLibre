/**
 * Metrics System
 * Tracks four core metrics that affect the game's outcome
 */

export class Metrics {
  constructor() {
    this.metrics = {
      inclusivity: 50,        // Teacher & student satisfaction (0-100)
      responsibility: 50,      // Ethical/legal compliance (0-100)
      sustainability: 50,      // Eco-friendly tech, reuse, open-source (0-100)
      bigTechDependence: 50,   // Risk of losing independence (0-100)
    };
  }

  /**
   * Get current metrics
   */
  getMetrics() {
    return { ...this.metrics };
  }

  /**
   * Get a specific metric value
   */
  getMetric(name) {
    return this.metrics[name] ?? 0;
  }

  /**
   * Modify metrics based on effects object
   * @param {Object} effects - Object with metric names and delta values
   */
  applyEffects(effects) {
    const changes = {};
    
    for (const [metric, delta] of Object.entries(effects)) {
      if (this.metrics.hasOwnProperty(metric)) {
        const oldValue = this.metrics[metric];
        this.metrics[metric] = Math.max(0, Math.min(100, oldValue + delta));
        changes[metric] = this.metrics[metric] - oldValue;
      }
    }
    
    return changes;
  }

  /**
   * Set a metric to a specific value
   */
  setMetric(name, value) {
    if (this.metrics.hasOwnProperty(name)) {
      this.metrics[name] = Math.max(0, Math.min(100, value));
    }
  }

  /**
   * Reset all metrics to default values
   */
  reset() {
    this.metrics = {
      inclusivity: 50,
      responsibility: 50,
      sustainability: 50,
      bigTechDependence: 50,
    };
  }

  /**
   * Get metrics as percentage values for display
   */
  getPercentages() {
    return {
      inclusivity: this.metrics.inclusivity,
      responsibility: this.metrics.responsibility,
      sustainability: this.metrics.sustainability,
      bigTechDependence: this.metrics.bigTechDependence,
    };
  }
}


