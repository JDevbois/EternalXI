import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/features/home/HomePage'
import { SquadBuilderPage } from '@/features/squad-builder/SquadBuilderPage'
import { MatchSimulatorPage } from '@/features/match-simulator/MatchSimulatorPage'
import { MatchReportPage } from '@/features/match-report/MatchReportPage'
import { WorldCupHomePage } from '@/features/world-cup/WorldCupHomePage'
import { TournamentPage } from '@/features/world-cup/TournamentPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/squad-builder',
    element: <SquadBuilderPage />,
  },
  {
    path: '/simulate',
    element: <MatchSimulatorPage />,
  },
  {
    path: '/result',
    element: <MatchReportPage />,
  },
  {
    path: '/world-cup',
    element: <WorldCupHomePage />,
  },
  {
    path: '/world-cup/tournament',
    element: <TournamentPage />,
  },
])
