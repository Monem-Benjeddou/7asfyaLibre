/**
 * NirdResources
 * Manages the three core NIRD resources:
 * - Points de Compétence (Inclusion): Training, know-how
 * - Pièces de Réemploi (Durabilité): Reconditioned hardware
 * - Licences Libres / Budget (Responsabilité): Savings, autonomy
 */

export class NirdResources {
  constructor() {
    this.competence = 0;        // Points de Compétence (Inclusion)
    this.reemploi = 0;          // Pièces de Réemploi (Durabilité)
    this.licencesLibres = 0;    // Licences Libres / Budget (Responsabilité)
    
    // Track conversions and choices for autonomy calculation
    this.convertedRooms = new Set();  // Room IDs that have been converted
    this.nirdChoices = 0;             // Number of NIRD choices made
    this.totalChoices = 0;            // Total choices made
  }

  /**
   * Add Points de Compétence
   */
  addCompetence(amount) {
    this.competence = Math.max(0, this.competence + amount);
  }

  /**
   * Add Pièces de Réemploi
   */
  addReemploi(amount) {
    this.reemploi = Math.max(0, this.reemploi + amount);
  }

  /**
   * Add Licences Libres / Budget
   */
  addLicencesLibres(amount) {
    this.licencesLibres = Math.max(0, this.licencesLibres + amount);
  }

  /**
   * Get current resource values
   */
  getResources() {
    return {
      competence: this.competence,
      reemploi: this.reemploi,
      licencesLibres: this.licencesLibres
    };
  }

  /**
   * Check if player has enough resources for a cost
   */
  canAfford(cost) {
    if (cost.competence && this.competence < Math.abs(cost.competence)) return false;
    if (cost.reemploi && this.reemploi < Math.abs(cost.reemploi)) return false;
    if (cost.licencesLibres && this.licencesLibres < Math.abs(cost.licencesLibres)) return false;
    return true;
  }

  /**
   * Apply a cost (negative values)
   */
  applyCost(cost) {
    if (cost.competence) this.addCompetence(cost.competence);
    if (cost.reemploi) this.addReemploi(cost.reemploi);
    if (cost.licencesLibres) this.addLicencesLibres(cost.licencesLibres);
  }

  /**
   * Mark a room as converted
   */
  convertRoom(roomId) {
    this.convertedRooms.add(roomId);
  }

  /**
   * Record a choice made
   */
  recordChoice(isNirdChoice) {
    this.totalChoices++;
    if (isNirdChoice) {
      this.nirdChoices++;
    }
  }

  /**
   * Calculate autonomy percentage (0-100%)
   * Based on:
   * - Average of normalized resources
   * - Bonus for NIRD choices (+10% per choice)
   * - Bonus for converted rooms (+5% per room)
   */
  calculateAutonomy() {
    // Normalize resources (assuming max reasonable values)
    const maxResource = 100;
    const normalizedCompetence = Math.min(100, (this.competence / maxResource) * 100);
    const normalizedReemploi = Math.min(100, (this.reemploi / maxResource) * 100);
    const normalizedLicences = Math.min(100, (this.licencesLibres / maxResource) * 100);
    
    // Base autonomy: average of resources
    const baseAutonomy = (normalizedCompetence + normalizedReemploi + normalizedLicences) / 3;
    
    // Bonus for NIRD choices (+10% per choice, max +50%)
    const choiceBonus = Math.min(50, this.nirdChoices * 10);
    
    // Bonus for converted rooms (+5% per room, max +25%)
    const roomBonus = Math.min(25, this.convertedRooms.size * 5);
    
    // Total autonomy (capped at 100%)
    const totalAutonomy = Math.min(100, baseAutonomy + choiceBonus + roomBonus);
    
    return Math.round(totalAutonomy);
  }

  /**
   * Reset all resources
   */
  reset() {
    this.competence = 0;
    this.reemploi = 0;
    this.licencesLibres = 0;
    this.convertedRooms.clear();
    this.nirdChoices = 0;
    this.totalChoices = 0;
  }
}

