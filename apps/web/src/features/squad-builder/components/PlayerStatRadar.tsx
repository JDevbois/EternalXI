import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts'
import type { Player } from '@eternalxi/types'

interface PlayerStatRadarProps {
  player: Player
}

export function PlayerStatRadar({ player }: PlayerStatRadarProps) {
  const s = player.stats
  const isGK = player.primaryPosition === 'GK'

  const data = isGK
    ? [
        { stat: 'GK', value: s.goalkeeping },
        { stat: 'Reflex', value: s.pace },
        { stat: 'Physical', value: s.physical },
        { stat: 'Passing', value: s.passing },
        { stat: 'Dribbling', value: s.dribbling },
        { stat: 'Defending', value: s.defending },
      ]
    : [
        { stat: 'Pace', value: s.pace },
        { stat: 'Shooting', value: s.shooting },
        { stat: 'Passing', value: s.passing },
        { stat: 'Dribbling', value: s.dribbling },
        { stat: 'Defending', value: s.defending },
        { stat: 'Physical', value: s.physical },
      ]

  return (
    <ResponsiveContainer width="100%" height={160}>
      <RadarChart data={data} margin={{ top: 8, right: 20, bottom: 8, left: 20 }}>
        <PolarGrid stroke="#3d2b1f40" />
        <PolarAngleAxis
          dataKey="stat"
          tick={{ fontSize: 10, fill: '#3d2b1f', fontFamily: 'Roboto Slab, serif' }}
        />
        <Radar
          dataKey="value"
          stroke="#8B1A1A"
          fill="#8B1A1A"
          fillOpacity={0.3}
          dot={false}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
