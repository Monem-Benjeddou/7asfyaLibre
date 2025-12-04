/**
 * Relationships System
 * Tracks relationships with different character groups
 */

export class Relationships {
  constructor() {
    this.relationships = {
      teachers: 50,        // Teacher satisfaction and trust
      students: 50,        // Student engagement and support
      community: 50,       // Parent and community support
      bigTechAgents: 50,   // Relationship with Big Tech representatives
    };
  }

  /**
   * Get all relationships
   */
  getRelationships() {
    return { ...this.relationships };
  }

  /**
   * Get a specific relationship value
   */
  getRelationship(name) {
    return this.relationships[name] ?? 50;
  }

  /**
   * Modify relationships based on changes object
   * @param {Object} changes - Object with relationship names and delta values
   */
  applyChanges(changes) {
    const applied = {};
    
    for (const [relationship, delta] of Object.entries(changes)) {
      if (this.relationships.hasOwnProperty(relationship)) {
        const oldValue = this.relationships[relationship];
        this.relationships[relationship] = Math.max(0, Math.min(100, oldValue + delta));
        applied[relationship] = this.relationships[relationship] - oldValue;
      }
    }
    
    return applied;
  }

  /**
   * Set a relationship to a specific value
   */
  setRelationship(name, value) {
    if (this.relationships.hasOwnProperty(name)) {
      this.relationships[name] = Math.max(0, Math.min(100, value));
    }
  }

  /**
   * Reset all relationships to default values
   */
  reset() {
    this.relationships = {
      teachers: 50,
      students: 50,
      community: 50,
      bigTechAgents: 50,
    };
  }

  /**
   * Get relationship status (positive, neutral, negative)
   */
  getRelationshipStatus(name) {
    const value = this.getRelationship(name);
    if (value >= 70) return 'positive';
    if (value <= 30) return 'negative';
    return 'neutral';
  }
}

