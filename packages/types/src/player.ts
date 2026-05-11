export type Position = 'GK' | 'CB' | 'LB' | 'RB' | 'CDM' | 'CM' | 'CAM' | 'LW' | 'RW' | 'ST'
export type Formation = '4-3-3' | '4-4-2' | '4-2-3-1' | '3-5-2' | '5-3-2'
export type Tactic = 'attacking' | 'balanced' | 'defensive'
export type WorldCupYear =
  | '1958' | '1962' | '1966' | '1970' | '1974' | '1978'
  | '1982' | '1986' | '1990' | '1994' | '1998' | '2002'
  | '2006' | '2010' | '2014' | '2018' | '2022'

export interface PlayerStats {
  pace: number
  shooting: number
  passing: number
  dribbling: number
  defending: number
  physical: number
  goalkeeping: number
  overall: number
}

export interface Player {
  id: string
  name: string
  nationality: string
  worldCups: WorldCupYear[]
  primaryPosition: Position
  positions: Position[]
  stats: PlayerStats
  imageSlug: string
}

export interface PositionedPlayer {
  player: Player
  assignedPosition: Position
}

export interface Squad {
  teamName: string
  formation: Formation
  tactic: Tactic
  players: PositionedPlayer[]
  bench?: Player[]
}

export type MatchEventType = 'GOAL' | 'YELLOW_CARD' | 'RED_CARD' | 'SAVE' | 'SUBSTITUTION' | 'PENALTY_SCORED' | 'PENALTY_MISSED'

export interface Substitution {
  minute: number
  playerOutId: string
  playerInId: string
}

export interface MatchEvent {
  type: MatchEventType
  minute: number
  team: 'home' | 'away'
  playerName: string
  assistName?: string
}

export interface MatchStats {
  shots: { home: number; away: number }
  shotsOnTarget: { home: number; away: number }
  fouls: { home: number; away: number }
  yellowCards: { home: number; away: number }
  redCards: { home: number; away: number }
  corners: { home: number; away: number }
  passes: { home: number; away: number }
  passAccuracy: { home: number; away: number }
}

export interface MatchResult {
  homeScore: number
  awayScore: number
  htHomeScore: number
  htAwayScore: number
  possession: { home: number; away: number }
  events: MatchEvent[]
  stats: MatchStats
  penaltyShootout?: PenaltyShootout
}

export interface FormationSlot {
  position: Position
  x: number
  y: number
}

export interface HistoricalSquad {
  id: string
  wcYear: WorldCupYear
  country: string
  label: string
  isChampion: boolean
  formation: Formation
  tactic: Tactic
  players: PositionedPlayer[]
  bench: Player[]
}

export interface PenaltyKick {
  playerName: string
  scored: boolean
}

export interface PenaltyShootout {
  home: PenaltyKick[]
  away: PenaltyKick[]
  homeScore: number
  awayScore: number
  winner: 'home' | 'away'
}
