export class MomentumTracker {
  private home = 50
  private away = 50

  onGoal(team: 'home' | 'away') {
    if (team === 'home') {
      this.home = Math.min(100, this.home + 15)
      this.away = Math.max(0, this.away - 10)
    } else {
      this.away = Math.min(100, this.away + 15)
      this.home = Math.max(0, this.home - 10)
    }
  }

  decay() {
    this.home += (50 - this.home) * 0.04 // drift toward 50
    this.away += (50 - this.away) * 0.04
  }

  // Returns attack multiplier for the given team based on momentum
  atkBonus(team: 'home' | 'away'): number {
    const val = team === 'home' ? this.home : this.away
    if (val > 70) return 0.05
    if (val < 30) return -0.05
    return 0
  }

  get homeValue() { return this.home }
  get awayValue() { return this.away }
}
