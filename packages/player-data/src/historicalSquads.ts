import type { Player, PositionedPlayer, HistoricalSquad, WorldCupYear, Position, Formation, Tactic } from '@eternalxi/types'

// [pace, shooting, passing, dribbling, defending, physical, goalkeeping, overall]
type S = [number, number, number, number, number, number, number, number]

function p(id: string, name: string, nat: string, wcs: WorldCupYear[], pos: Position, extra: Position[], s: S): Player {
  return {
    id, name, nationality: nat, worldCups: wcs,
    primaryPosition: pos, positions: [pos, ...extra],
    stats: { pace: s[0], shooting: s[1], passing: s[2], dribbling: s[3], defending: s[4], physical: s[5], goalkeeping: s[6], overall: s[7] },
    imageSlug: '',
  }
}

function slot(player: Player, pos: Position): PositionedPlayer {
  return { player, assignedPosition: pos }
}

function sq(
  id: string, wcYear: WorldCupYear, country: string, label: string,
  isChampion: boolean, formation: Formation, tactic: Tactic,
  players: PositionedPlayer[], bench: Player[]
): HistoricalSquad {
  return { id, wcYear, country, label, isChampion, formation, tactic, players, bench }
}

// ─── 1970 ───────────────────────────────────────────────────────────────────

const bra70 = sq('bra70', '1970', 'Brazil', 'Brazil 1970', true, '4-3-3', 'attacking', [
  slot(p('bra70_gk',  'Félix',          'Brazil', ['1966','1970'],               'GK', [],          [55,12,62,20,70,74,72,71]), 'GK'),
  slot(p('bra70_rb',  'Carlos Alberto', 'Brazil', ['1966','1970'],               'RB', ['CB'],      [82,74,78,72,82,80,10,83]), 'RB'),
  slot(p('bra70_cb1', 'Brito',          'Brazil', ['1966','1970'],               'CB', [],           [68,42,64,54,82,80,10,78]), 'CB'),
  slot(p('bra70_cb2', 'Piazza',         'Brazil', ['1970'],                      'CB', [],           [65,38,60,50,80,78,10,76]), 'CB'),
  slot(p('bra70_lb',  'Everaldo',       'Brazil', ['1966','1970'],               'LB', [],           [76,52,68,65,78,74,10,76]), 'LB'),
  slot(p('bra70_cm1', 'Clodoaldo',      'Brazil', ['1970'],                      'CM', ['CDM'],     [72,60,76,72,78,76,10,79]), 'CM'),
  slot(p('bra70_cm2', 'Gérson',         'Brazil', ['1966','1970'],               'CM', [],           [62,78,88,82,64,72,10,85]), 'CM'),
  slot(p('bra70_cm3', 'Tostão',         'Brazil', ['1966','1970'],               'CM', ['ST'],      [74,80,82,83,42,70,10,83]), 'CM'),
  slot(p('bra70_rw',  'Jairzinho',      'Brazil', ['1966','1970','1974'],        'RW', ['ST'],      [92,87,74,88,48,82,10,88]), 'RW'),
  slot(p('bra70_st',  'Pelé',           'Brazil', ['1958','1962','1966','1970'], 'ST', ['LW','RW'], [90,94,87,96,35,83,10,95]), 'ST'),
  slot(p('bra70_lw',  'Rivelino',       'Brazil', ['1970','1974'],               'LW', ['CM'],      [78,84,82,86,48,78,10,86]), 'LW'),
], [
  p('bra70_b1', 'Paulo Cézar',   'Brazil', ['1970'],        'LW', [],      [84,74,72,80,40,70,10,77]),
  p('bra70_b2', 'Edu',           'Brazil', ['1970'],        'CM', ['ST'], [70,72,72,72,50,70,10,74]),
  p('bra70_b3', 'Marco António', 'Brazil', ['1970'],        'LB', [],      [72,48,64,60,76,72,10,73]),
  p('bra70_b4', 'Leão',          'Brazil', ['1974','1978'], 'GK', [],      [56,12,62,22,72,76,80,79]),
  p('bra70_b5', 'Dario',         'Brazil', ['1970'],        'ST', [],      [74,72,64,70,40,72,10,72]),
])

const ita70 = sq('ita70', '1970', 'Italy', 'Italy 1970', false, '4-4-2', 'defensive', [
  slot(p('ita70_gk',  'Albertosi',    'Italy', ['1966','1970'],        'GK', [],     [55,12,65,20,74,76,82,79]), 'GK'),
  slot(p('ita70_rb',  'Burgnich',     'Italy', ['1966','1970'],        'RB', ['CB'], [72,48,66,60,84,80,10,79]), 'RB'),
  slot(p('ita70_cb1', 'Cera',         'Italy', ['1966','1970'],        'CB', [],     [64,38,62,50,82,80,10,77]), 'CB'),
  slot(p('ita70_cb2', 'Rosato',       'Italy', ['1970'],               'CB', [],     [65,42,60,52,80,78,10,76]), 'CB'),
  slot(p('ita70_lb',  'Facchetti',    'Italy', ['1966','1970'],        'LB', [],     [80,60,74,72,82,78,10,83]), 'LB'),
  slot(p('ita70_cm1', 'Bertini',      'Italy', ['1970'],               'CM', [],     [68,60,74,66,74,74,10,74]), 'CM'),
  slot(p('ita70_cm2', 'De Sisti',     'Italy', ['1970'],               'CM', [],     [68,62,76,68,72,72,10,74]), 'CM'),
  slot(p('ita70_cm3', 'Mazzola',      'Italy', ['1966','1970'],        'CM', ['CAM'],[74,82,82,80,54,72,10,82]), 'CM'),
  slot(p('ita70_cm4', 'Domenghini',   'Italy', ['1966','1970'],        'CM', ['RW'], [76,74,70,72,60,70,10,75]), 'CM'),
  slot(p('ita70_st1', 'Boninsegna',   'Italy', ['1970','1974'],        'ST', [],     [78,82,66,74,36,76,10,80]), 'ST'),
  slot(p('ita70_st2', 'Riva',         'Italy', ['1966','1970'],        'ST', ['LW'], [80,90,66,78,34,82,10,88]), 'ST'),
], [
  p('ita70_b1', 'Rivera',     'Italy', ['1966','1970'], 'CAM', [],     [68,84,86,84,48,68,10,84]),
  p('ita70_b2', 'Gori',       'Italy', ['1970'],        'GK', [],      [52,10,60,18,72,74,80,76]),
  p('ita70_b3', 'Furino',     'Italy', ['1970'],        'CM', [],      [68,56,70,62,74,74,10,72]),
  p('ita70_b4', 'Prati',      'Italy', ['1970'],        'ST', [],      [76,78,62,72,34,72,10,76]),
  p('ita70_b5', 'Juliano',    'Italy', ['1966','1970'], 'CM', [],      [66,54,70,62,72,70,10,70]),
])

// ─── 1974 ───────────────────────────────────────────────────────────────────

const wgr74 = sq('wgr74', '1974', 'West Germany', 'West Germany 1974', true, '4-4-2', 'balanced', [
  slot(p('wgr74_gk',  'Sepp Maier',      'West Germany', ['1966','1970','1974'],        'GK', [],     [58,14,68,22,76,82,90,89]), 'GK'),
  slot(p('wgr74_rb',  'Berti Vogts',     'West Germany', ['1970','1974'],               'RB', [],     [78,52,70,64,86,80,10,80]), 'RB'),
  slot(p('wgr74_cb1', 'Schwarzenbeck',   'West Germany', ['1970','1974'],               'CB', [],     [70,44,66,56,86,82,10,79]), 'CB'),
  slot(p('wgr74_cb2', 'Beckenbauer',     'West Germany', ['1966','1970','1974'],        'CB', ['CM'], [80,62,88,82,94,84,10,93]), 'CB'),
  slot(p('wgr74_lb',  'Paul Breitner',   'West Germany', ['1974','1982'],               'LB', ['CM'], [80,72,80,76,82,78,10,82]), 'LB'),
  slot(p('wgr74_cm1', 'Wolfgang Overath','West Germany', ['1966','1970','1974'],        'CM', [],     [72,74,84,78,66,74,10,82]), 'CM'),
  slot(p('wgr74_cm2', 'Rainer Bonhof',   'West Germany', ['1974','1978'],               'CM', [],     [74,70,78,72,70,78,10,78]), 'CM'),
  slot(p('wgr74_cm3', 'Uli Hoeneß',      'West Germany', ['1974'],                      'CM', ['ST'], [80,74,72,76,52,76,10,77]), 'CM'),
  slot(p('wgr74_cm4', 'Jürgen Grabowski','West Germany', ['1970','1974'],               'CM', ['RW'], [82,72,72,78,54,70,10,77]), 'CM'),
  slot(p('wgr74_st1', 'Gerd Müller',     'West Germany', ['1970','1974'],               'ST', [],     [78,94,68,80,34,82,10,91]), 'ST'),
  slot(p('wgr74_st2', 'Bernd Hölzenbein','West Germany', ['1974'],                      'ST', ['LW'], [82,76,70,78,44,74,10,77]), 'ST'),
], [
  p('wgr74_b1', 'Jupp Heynckes',     'West Germany', ['1970','1974'], 'ST', [],     [80,78,66,72,38,74,10,76]),
  p('wgr74_b2', 'Heinz Flohe',       'West Germany', ['1974'],        'CM', [],     [70,68,78,72,62,68,10,74]),
  p('wgr74_b3', 'Erich Beer',        'West Germany', ['1974'],        'LW', [],     [80,70,66,74,46,70,10,72]),
  p('wgr74_b4', 'Sepp Kapellmann',   'West Germany', ['1974'],        'GK', [],     [54,10,60,18,70,74,80,74]),
  p('wgr74_b5', 'Bernhard Cullmann', 'West Germany', ['1974'],        'CB', [],     [66,40,62,52,80,76,10,73]),
])

const ned74 = sq('ned74', '1974', 'Netherlands', 'Netherlands 1974', false, '4-3-3', 'attacking', [
  slot(p('ned74_gk',  'Jan Jongbloed',    'Netherlands', ['1974','1978'],        'GK', [],     [62,12,68,24,70,72,78,76]), 'GK'),
  slot(p('ned74_rb',  'Wim Suurbier',     'Netherlands', ['1974','1978'],        'RB', [],     [80,56,70,68,78,74,10,77]), 'RB'),
  slot(p('ned74_cb1', 'Wim Rijsbergen',   'Netherlands', ['1974'],               'CB', [],     [68,42,64,56,82,78,10,76]), 'CB'),
  slot(p('ned74_cb2', 'Arie Haan',        'Netherlands', ['1974','1978'],        'CB', ['CM'], [74,72,82,76,76,76,10,80]), 'CB'),
  slot(p('ned74_lb',  'Ruud Krol',        'Netherlands', ['1974','1978'],        'LB', ['CB'], [78,60,78,72,82,76,10,82]), 'LB'),
  slot(p('ned74_cm1', 'Johan Neeskens',   'Netherlands', ['1974','1978'],        'CM', ['CDM'],[80,80,80,82,72,82,10,87]), 'CM'),
  slot(p('ned74_cm2', 'Willy van de K.',  'Netherlands', ['1974','1978'],        'CM', [],     [74,68,76,74,64,72,10,76]), 'CM'),
  slot(p('ned74_rw',  'Johan Rep',        'Netherlands', ['1974','1978'],        'RW', ['ST'], [84,80,70,82,42,74,10,81]), 'RW'),
  slot(p('ned74_st',  'Johan Cruyff',     'Netherlands', ['1974'],               'ST', ['CAM','RW'],[88,82,91,95,46,76,10,94]), 'ST'),
  slot(p('ned74_lw',  'Rob Rensenbrink',  'Netherlands', ['1974','1978'],        'LW', [],     [82,82,74,86,40,72,10,84]), 'LW'),
  slot(p('ned74_cam', 'Johnny Rep',       'Netherlands', ['1974'],               'CM', ['RW'], [76,70,72,74,58,70,10,73]), 'CM'),
], [
  p('ned74_b1', 'René van de K.',   'Netherlands', ['1974','1978'], 'RW', [],     [80,72,70,76,52,70,10,76]),
  p('ned74_b2', 'Piet Schrijvers',  'Netherlands', ['1974','1978'], 'GK', [],     [56,10,62,20,70,74,82,78]),
  p('ned74_b3', 'Theo de Jong',     'Netherlands', ['1974'],        'CM', [],     [70,58,70,64,68,72,10,71]),
  p('ned74_b4', 'Jan Poortvliet',   'Netherlands', ['1974','1978'], 'RB', [],     [74,48,66,62,76,72,10,72]),
  p('ned74_b5', 'Willem van H.',    'Netherlands', ['1974'],        'CB', [],     [64,38,60,50,80,76,10,73]),
])

// ─── 1978 ───────────────────────────────────────────────────────────────────

const arg78 = sq('arg78', '1978', 'Argentina', 'Argentina 1978', true, '4-3-3', 'attacking', [
  slot(p('arg78_gk',  'Ubaldo Fillol',    'Argentina', ['1974','1978','1982'],   'GK', [],     [58,12,66,22,74,76,84,82]), 'GK'),
  slot(p('arg78_rb',  'Óscar Ortiz',      'Argentina', ['1978'],                 'RB', [],     [74,52,66,60,78,74,10,73]), 'RB'),
  slot(p('arg78_cb1', 'Daniel Passarella','Argentina', ['1978','1982','1986'],   'CB', [],     [76,72,74,68,88,84,10,86]), 'CB'),
  slot(p('arg78_cb2', 'Luis Galván',      'Argentina', ['1978'],                 'CB', [],     [66,40,62,52,82,78,10,75]), 'CB'),
  slot(p('arg78_lb',  'Alberto Tarantini','Argentina', ['1978'],                 'LB', [],     [76,54,66,62,78,74,10,74]), 'LB'),
  slot(p('arg78_cm1', 'Américo Gallego',  'Argentina', ['1978'],                 'CM', ['CDM'],[68,56,74,64,78,76,10,74]), 'CM'),
  slot(p('arg78_cm2', 'Osvaldo Ardiles',  'Argentina', ['1978','1982'],          'CM', [],     [76,66,84,80,62,70,10,84]), 'CM'),
  slot(p('arg78_rw',  'Daniel Bertoni',   'Argentina', ['1978','1982'],          'RW', ['ST'], [80,76,70,76,44,72,10,77]), 'RW'),
  slot(p('arg78_st',  'Mario Kempes',     'Argentina', ['1974','1978','1982'],   'ST', ['LW'], [82,90,70,86,38,80,10,90]), 'ST'),
  slot(p('arg78_lw',  'Leopoldo Luque',   'Argentina', ['1978'],                 'LW', ['ST'], [80,80,66,74,42,76,10,79]), 'LW'),
  slot(p('arg78_cam', 'René Houseman',    'Argentina', ['1974','1978'],          'CM', ['LW'], [80,72,66,78,44,68,10,73]), 'CM'),
], [
  p('arg78_b1', 'Ricardo Villa',    'Argentina', ['1978'],        'CM', [],     [74,66,72,72,56,74,10,72]),
  p('arg78_b2', 'Omar Larrosa',     'Argentina', ['1978'],        'CM', [],     [70,60,70,66,66,70,10,70]),
  p('arg78_b3', 'Norberto Alonso',  'Argentina', ['1978'],        'CAM', [],    [72,72,78,76,48,66,10,74]),
  p('arg78_b4', 'Hugo Gatti',       'Argentina', ['1978'],        'GK', [],     [56,10,60,18,70,72,78,74]),
  p('arg78_b5', 'Hugo Ortiz',       'Argentina', ['1978'],        'CB', [],     [64,36,58,50,78,74,10,70]),
])

const ned78 = sq('ned78', '1978', 'Netherlands', 'Netherlands 1978', false, '4-3-3', 'attacking', [
  slot(p('ned78_gk',  'Jan Jongbloed',     'Netherlands', ['1974','1978'],       'GK', [],     [62,12,68,24,70,72,78,76]), 'GK'),
  slot(p('ned78_rb',  'Jan Poortvliet',    'Netherlands', ['1974','1978'],       'RB', [],     [74,48,66,62,76,72,10,72]), 'RB'),
  slot(p('ned78_cb1', 'Erny Brandts',      'Netherlands', ['1978'],              'CB', ['RB'], [74,62,66,60,80,76,10,78]), 'CB'),
  slot(p('ned78_cb2', 'Ruud Krol',         'Netherlands', ['1974','1978'],       'CB', ['LB'], [78,60,78,72,82,76,10,82]), 'CB'),
  slot(p('ned78_lb',  'Piet Wildschut',    'Netherlands', ['1978'],              'LB', [],     [70,46,62,56,76,72,10,70]), 'LB'),
  slot(p('ned78_cm1', 'Johan Neeskens',    'Netherlands', ['1974','1978'],       'CM', ['CDM'],[80,80,80,82,72,82,10,86]), 'CM'),
  slot(p('ned78_cm2', 'Willy van de K.',   'Netherlands', ['1974','1978'],       'CM', [],     [74,68,76,74,64,72,10,76]), 'CM'),
  slot(p('ned78_rw',  'René van de K.',    'Netherlands', ['1974','1978'],       'RW', [],     [80,76,72,78,48,70,10,78]), 'RW'),
  slot(p('ned78_st',  'Rob Rensenbrink',   'Netherlands', ['1974','1978'],       'ST', ['LW'], [82,84,74,86,40,72,10,85]), 'ST'),
  slot(p('ned78_lw',  'Johnny Rep',        'Netherlands', ['1974','1978'],       'LW', ['RW'], [82,78,68,80,40,70,10,78]), 'LW'),
  slot(p('ned78_cam', 'Arie Haan',         'Netherlands', ['1974','1978'],       'CM', [],     [74,72,82,76,72,76,10,80]), 'CM'),
], [
  p('ned78_b1', 'Dick Nanninga',   'Netherlands', ['1978'],        'ST', [],     [74,72,60,68,36,74,10,72]),
  p('ned78_b2', 'Piet Schrijvers', 'Netherlands', ['1974','1978'], 'GK', [],     [56,10,62,20,70,74,82,78]),
  p('ned78_b3', 'Wim Jansen',      'Netherlands', ['1974','1978'], 'CM', [],     [72,58,72,66,70,72,10,72]),
  p('ned78_b4', 'Wim Suurbier',    'Netherlands', ['1974','1978'], 'RB', [],     [80,56,70,68,78,74,10,77]),
  p('ned78_b5', 'Simon Tahamata',  'Netherlands', ['1978'],        'LW', [],     [80,68,66,74,40,68,10,70]),
])

// ─── 1982 ───────────────────────────────────────────────────────────────────

const ita82 = sq('ita82', '1982', 'Italy', 'Italy 1982', true, '4-4-2', 'balanced', [
  slot(p('ita82_gk',  'Dino Zoff',         'Italy', ['1970','1974','1978','1982'], 'GK', [],     [58,12,70,20,78,80,92,91]), 'GK'),
  slot(p('ita82_rb',  'Claudio Gentile',   'Italy', ['1978','1982','1986'],        'RB', ['CB'], [72,44,64,58,88,82,10,80]), 'RB'),
  slot(p('ita82_cb1', 'Gaetano Scirea',    'Italy', ['1978','1982','1986'],        'CB', [],     [72,48,78,66,90,82,10,87]), 'CB'),
  slot(p('ita82_cb2', 'Fulvio Collovati',  'Italy', ['1982'],                      'CB', [],     [68,40,64,54,82,78,10,76]), 'CB'),
  slot(p('ita82_lb',  'Antonio Cabrini',   'Italy', ['1978','1982','1986'],        'LB', [],     [78,64,72,70,80,76,10,79]), 'LB'),
  slot(p('ita82_cm1', 'Marco Tardelli',    'Italy', ['1978','1982'],               'CM', [],     [76,74,76,72,72,78,10,80]), 'CM'),
  slot(p('ita82_cm2', 'Gabriele Oriali',   'Italy', ['1978','1982'],               'CM', ['CDM'],[68,54,70,62,76,74,10,72]), 'CM'),
  slot(p('ita82_cm3', 'Bruno Conti',       'Italy', ['1982','1986'],               'CM', ['RW'], [82,74,74,80,54,70,10,80]), 'CM'),
  slot(p('ita82_cam', 'Giancarlo Antognoni','Italy', ['1978','1982'],              'CM', ['CAM'],[68,76,86,80,56,70,10,82]), 'CM'),
  slot(p('ita82_st1', 'Paolo Rossi',       'Italy', ['1978','1982','1986'],        'ST', [],     [78,86,70,76,38,74,10,86]), 'ST'),
  slot(p('ita82_st2', 'Francesco Graziani','Italy', ['1978','1982'],               'ST', ['LW'], [74,76,62,68,38,72,10,74]), 'ST'),
], [
  p('ita82_b1', 'Alessandro Altobelli', 'Italy', ['1982','1986'], 'ST', [],     [76,80,64,70,36,72,10,78]),
  p('ita82_b2', 'Franco Causio',        'Italy', ['1974','1978','1982'], 'RW', [], [80,70,68,76,48,68,10,74]),
  p('ita82_b3', 'Giuseppe Bergomi',     'Italy', ['1982','1986','1990','1998'], 'CB', [], [68,42,66,54,86,82,10,80]),
  p('ita82_b4', 'Giovanni Galli',       'Italy', ['1982','1986','1990'], 'GK', [], [54,10,62,20,72,76,82,77]),
  p('ita82_b5', 'Romeo Benetti',        'Italy', ['1974','1978','1982'], 'CM', [], [68,58,70,62,74,74,10,72]),
])

const wgr82 = sq('wgr82', '1982', 'West Germany', 'West Germany 1982', false, '4-3-3', 'balanced', [
  slot(p('wgr82_gk',  'Harald Schumacher', 'West Germany', ['1982','1986'],        'GK', [],     [58,12,66,22,74,80,84,82]), 'GK'),
  slot(p('wgr82_rb',  'Manfred Kaltz',     'West Germany', ['1978','1982'],        'RB', [],     [76,60,72,66,80,76,10,77]), 'RB'),
  slot(p('wgr82_cb1', 'Karl-H. Förster',  'West Germany', ['1978','1982','1986'], 'CB', [],     [70,44,66,56,86,82,10,79]), 'CB'),
  slot(p('wgr82_cb2', 'Bernd Förster',    'West Germany', ['1978','1982'],        'CB', [],     [68,40,64,54,84,80,10,77]), 'CB'),
  slot(p('wgr82_lb',  'Hans-P. Briegel',  'West Germany', ['1982','1986'],        'LB', [],     [78,56,68,64,80,84,10,77]), 'LB'),
  slot(p('wgr82_cm1', 'Paul Breitner',    'West Germany', ['1974','1982'],        'CM', [],     [78,74,80,74,72,76,10,82]), 'CM'),
  slot(p('wgr82_cm2', 'Felix Magath',     'West Germany', ['1982'],               'CM', [],     [70,66,74,68,66,72,10,74]), 'CM'),
  slot(p('wgr82_rw',  'Pierre Littbarski','West Germany', ['1982','1986','1990'], 'RW', ['LW'], [84,74,72,80,48,70,10,79]), 'RW'),
  slot(p('wgr82_st',  'K.-H. Rummenigge','West Germany', ['1978','1982','1986'], 'ST', ['RW'], [84,88,72,82,36,80,10,88]), 'ST'),
  slot(p('wgr82_lw',  'Klaus Fischer',    'West Germany', ['1978','1982'],        'LW', ['ST'], [76,82,64,72,38,74,10,79]), 'LW'),
  slot(p('wgr82_cam', 'Wolfgang Dremmler','West Germany', ['1982'],               'CM', [],     [70,56,70,62,70,72,10,70]), 'CM'),
], [
  p('wgr82_b1', 'Rudi Völler',    'West Germany', ['1982','1986','1990'], 'ST', [],    [82,82,68,78,38,74,10,82]),
  p('wgr82_b2', 'Horst Hrubesch', 'West Germany', ['1982'],              'ST', [],     [70,82,60,64,36,82,10,77]),
  p('wgr82_b3', 'Uli Stielike',   'West Germany', ['1978','1982'],       'CM', ['CDM'],[68,58,72,64,76,74,10,74]),
  p('wgr82_b4', 'Toni Schumacher','West Germany', ['1982'],              'GK', [],     [56,10,62,20,72,76,80,74]),
  p('wgr82_b5', 'Hansi Müller',   'West Germany', ['1982'],              'CM', [],     [72,64,74,68,62,70,10,72]),
])

// ─── 1986 ───────────────────────────────────────────────────────────────────

const arg86 = sq('arg86', '1986', 'Argentina', 'Argentina 1986', true, '4-3-3', 'attacking', [
  slot(p('arg86_gk',  'Nery Pumpido',    'Argentina', ['1986','1990'],          'GK', [],     [58,12,66,22,72,76,82,81]), 'GK'),
  slot(p('arg86_rb',  'José Cuciuffo',   'Argentina', ['1986','1990'],          'RB', [],     [74,48,64,60,78,74,10,72]), 'RB'),
  slot(p('arg86_cb1', 'Oscar Ruggeri',   'Argentina', ['1982','1986','1990'],   'CB', [],     [72,52,68,58,86,84,10,82]), 'CB'),
  slot(p('arg86_cb2', 'José Brown',      'Argentina', ['1986'],                 'CB', [],     [66,42,62,52,82,80,10,77]), 'CB'),
  slot(p('arg86_lb',  'Julio Olarticoechea','Argentina',['1986','1990'],        'LB', [],     [74,50,66,60,78,74,10,73]), 'LB'),
  slot(p('arg86_cm1', 'Sergio Batista',  'Argentina', ['1986','1990'],          'CM', ['CDM'],[68,52,72,64,76,76,10,72]), 'CM'),
  slot(p('arg86_cm2', 'Héctor Enrique',  'Argentina', ['1986'],                 'CM', [],     [70,60,74,66,68,72,10,71]), 'CM'),
  slot(p('arg86_rw',  'Jorge Valdano',   'Argentina', ['1982','1986'],          'RW', ['ST'], [78,80,74,78,42,72,10,81]), 'RW'),
  slot(p('arg86_st',  'Diego Maradona',  'Argentina', ['1982','1986','1990'],   'ST', ['CAM','LW'],[87,88,91,97,42,78,10,97]), 'ST'),
  slot(p('arg86_lw',  'Jorge Burruchaga','Argentina', ['1986','1990'],          'LW', ['CM'], [80,78,80,80,52,72,10,82]), 'LW'),
  slot(p('arg86_cam', 'Ricardo Gareca',  'Argentina', ['1982','1986'],          'CM', ['ST'], [74,74,64,68,44,70,10,73]), 'CM'),
], [
  p('arg86_b1', 'Daniel Passarella','Argentina', ['1978','1982','1986'], 'CB', [],     [76,72,74,68,88,84,10,86]),
  p('arg86_b2', 'Pedro Pasculli',  'Argentina', ['1986'],                'ST', [],     [74,74,62,68,38,70,10,72]),
  p('arg86_b3', 'Claudio Borghi',  'Argentina', ['1986'],                'CM', [],     [70,64,74,72,54,66,10,72]),
  p('arg86_b4', 'Luis Islas',      'Argentina', ['1986','1990'],         'GK', [],     [54,10,62,20,70,72,78,73]),
  p('arg86_b5', 'Carlos Tapia',    'Argentina', ['1986'],                'CM', [],     [70,58,68,62,66,70,10,68]),
])

const wgr86 = sq('wgr86', '1986', 'West Germany', 'West Germany 1986', false, '4-4-2', 'balanced', [
  slot(p('wgr86_gk',  'Harald Schumacher','West Germany', ['1982','1986'],        'GK', [],     [58,12,66,22,74,80,84,82]), 'GK'),
  slot(p('wgr86_rb',  'Matthias Herget', 'West Germany', ['1986'],               'RB', [],     [74,50,64,60,76,72,10,71]), 'RB'),
  slot(p('wgr86_cb1', 'Norbert Eder',    'West Germany', ['1982','1986'],        'CB', [],     [66,40,62,52,82,78,10,72]), 'CB'),
  slot(p('wgr86_cb2', 'Karl-H. Förster', 'West Germany', ['1978','1982','1986'], 'CB', [],     [70,44,66,56,86,82,10,79]), 'CB'),
  slot(p('wgr86_lb',  'Andreas Brehme', 'West Germany', ['1986','1990'],         'LB', ['CM'], [80,68,76,72,82,78,10,83]), 'LB'),
  slot(p('wgr86_cm1', 'Lothar Matthäus','West Germany', ['1982','1986','1990'],  'CM', [],     [82,84,88,84,78,84,10,93]), 'CM'),
  slot(p('wgr86_cm2', 'Felix Magath',   'West Germany', ['1982','1986'],         'CM', [],     [70,66,74,68,66,72,10,73]), 'CM'),
  slot(p('wgr86_cm3', 'Pierre Littbarski','West Germany',['1982','1986','1990'], 'CM', ['RW'], [84,74,72,80,48,70,10,78]), 'CM'),
  slot(p('wgr86_cm4', 'Klaus Allofs',   'West Germany', ['1982','1986'],         'CM', ['ST'], [76,76,68,72,44,72,10,75]), 'CM'),
  slot(p('wgr86_st1', 'K.-H. Rummenigge','West Germany',['1978','1982','1986'], 'ST', ['RW'], [82,86,70,80,36,78,10,87]), 'ST'),
  slot(p('wgr86_st2', 'Rudi Völler',    'West Germany', ['1982','1986','1990'], 'ST', [],     [82,82,68,78,38,74,10,82]), 'ST'),
], [
  p('wgr86_b1', 'Hans-P. Briegel',  'West Germany', ['1982','1986'], 'LB', [],    [78,56,68,64,80,84,10,77]),
  p('wgr86_b2', 'Uwe Bein',         'West Germany', ['1986','1990'], 'CM', [],    [70,68,78,72,58,68,10,74]),
  p('wgr86_b3', 'Bernd Nickel',     'West Germany', ['1986'],        'CM', [],    [68,58,70,62,62,68,10,68]),
  p('wgr86_b4', 'Eike Immel',       'West Germany', ['1986'],        'GK', [],    [56,10,62,20,70,74,78,72]),
  p('wgr86_b5', 'Dieter Hoeneß',    'West Germany', ['1978','1982','1986'], 'ST', [], [72,72,60,64,36,72,10,70]),
])

// ─── 1990 ───────────────────────────────────────────────────────────────────

const wgr90 = sq('wgr90', '1990', 'West Germany', 'West Germany 1990', true, '5-3-2', 'balanced', [
  slot(p('wgr90_gk',  'Bodo Illgner',    'West Germany', ['1990'],               'GK', [],     [58,12,66,22,72,78,84,83]), 'GK'),
  slot(p('wgr90_rb',  'Stefan Reuter',   'West Germany', ['1990'],               'RB', [],     [80,54,72,68,78,76,10,77]), 'RB'),
  slot(p('wgr90_cb1', 'Guido Buchwald',  'West Germany', ['1986','1990'],        'CB', ['CM'], [74,56,72,64,84,82,10,80]), 'CB'),
  slot(p('wgr90_cb2', 'Klaus Augenthaler','West Germany',['1982','1986','1990'], 'CB', [],     [68,44,64,54,84,80,10,77]), 'CB'),
  slot(p('wgr90_cb3', 'Jürgen Kohler',   'West Germany', ['1990'],               'CB', [],     [72,44,66,56,86,82,10,79]), 'CB'),
  slot(p('wgr90_lb',  'Andreas Brehme', 'West Germany', ['1986','1990'],         'LB', [],     [80,68,76,72,82,78,10,83]), 'LB'),
  slot(p('wgr90_cm1', 'Lothar Matthäus','West Germany', ['1982','1986','1990'],  'CM', [],     [82,86,88,84,78,84,10,93]), 'CM'),
  slot(p('wgr90_cm2', 'Thomas Hässler', 'West Germany', ['1990'],                'CM', [],     [76,66,82,78,64,72,10,79]), 'CM'),
  slot(p('wgr90_cm3', 'Pierre Littbarski','West Germany',['1982','1986','1990'], 'CM', ['RW'], [82,72,72,78,50,70,10,77]), 'CM'),
  slot(p('wgr90_st1', 'Jürgen Klinsmann','West Germany', ['1990'],               'ST', [],     [86,84,70,80,36,78,10,86]), 'ST'),
  slot(p('wgr90_st2', 'Rudi Völler',    'West Germany', ['1982','1986','1990'], 'ST', [],     [82,80,68,76,38,72,10,81]), 'ST'),
], [
  p('wgr90_b1', 'Karl-H. Riedle',  'West Germany', ['1990'],        'ST', [],     [84,80,68,76,36,74,10,79]),
  p('wgr90_b2', 'Uwe Bein',        'West Germany', ['1986','1990'], 'CM', [],     [72,68,78,72,58,68,10,74]),
  p('wgr90_b3', 'Olaf Thon',       'West Germany', ['1990'],        'CM', [],     [70,66,74,68,64,70,10,72]),
  p('wgr90_b4', 'Raimond Aumann',  'West Germany', ['1990'],        'GK', [],     [54,10,62,20,70,74,78,73]),
  p('wgr90_b5', 'Olaf Thon',       'West Germany', ['1990'],        'CM', [],     [70,66,74,68,64,70,10,72]),
])

const arg90 = sq('arg90', '1990', 'Argentina', 'Argentina 1990', false, '4-4-2', 'defensive', [
  slot(p('arg90_gk',  'Sergio Goycochea','Argentina', ['1990'],               'GK', [],     [58,12,66,22,72,74,86,84]), 'GK'),
  slot(p('arg90_rb',  'Gabriel Calderón','Argentina', ['1986','1990'],        'RB', ['RW'], [74,58,68,66,74,70,10,70]), 'RB'),
  slot(p('arg90_cb1', 'Oscar Ruggeri',  'Argentina', ['1982','1986','1990'], 'CB', [],     [72,52,68,58,86,84,10,82]), 'CB'),
  slot(p('arg90_cb2', 'Juan Simón',     'Argentina', ['1990'],               'CB', [],     [66,42,62,52,82,78,10,74]), 'CB'),
  slot(p('arg90_lb',  'Roberto Sensini','Argentina', ['1990','1994','1998'], 'LB', ['CB'], [72,48,66,60,82,76,10,74]), 'LB'),
  slot(p('arg90_cm1', 'Julio Olarticoechea','Argentina',['1986','1990'],    'CM', ['LB'], [72,50,66,60,74,72,10,70]), 'CM'),
  slot(p('arg90_cm2', 'Ricardo Giusti', 'Argentina', ['1986','1990'],        'CM', [],     [70,56,68,62,72,72,10,70]), 'CM'),
  slot(p('arg90_cm3', 'Héctor Lorenzo','Argentina', ['1990'],                'CM', ['CDM'],[66,48,68,58,74,72,10,68]), 'CM'),
  slot(p('arg90_cam', 'Diego Maradona', 'Argentina', ['1982','1986','1990'], 'CAM',['LW'], [82,84,88,94,44,72,10,90]), 'CAM'),
  slot(p('arg90_st1', 'Claudio Caniggia','Argentina', ['1990','1994'],       'ST', ['RW'], [94,84,68,86,36,76,10,86]), 'ST'),
  slot(p('arg90_st2', 'Gustavo Dezotti','Argentina', ['1990'],               'ST', [],     [76,72,60,66,38,72,10,71]), 'ST'),
], [
  p('arg90_b1', 'Jorge Burruchaga','Argentina', ['1986','1990'], 'LW', ['CM'], [80,78,80,80,52,72,10,81]),
  p('arg90_b2', 'Pedro Monzón',    'Argentina', ['1990'],        'CM', [],     [68,52,66,60,72,72,10,68]),
  p('arg90_b3', 'Abel Balbo',      'Argentina', ['1990'],        'ST', [],     [76,74,62,68,38,72,10,72]),
  p('arg90_b4', 'Néstor Lorenzo',  'Argentina', ['1990'],        'CB', [],     [64,38,60,50,78,74,10,68]),
  p('arg90_b5', 'Luis Islas',      'Argentina', ['1986','1990'], 'GK', [],     [54,10,62,20,70,72,78,72]),
])

// ─── 1994 ───────────────────────────────────────────────────────────────────

const bra94 = sq('bra94', '1994', 'Brazil', 'Brazil 1994', true, '4-4-2', 'balanced', [
  slot(p('bra94_gk',  'Taffarel',      'Brazil', ['1990','1994','1998'],        'GK', [],     [58,12,66,22,72,76,86,84]), 'GK'),
  slot(p('bra94_rb',  'Cafu',          'Brazil', ['1990','1994','1998','2002'], 'RB', [],     [90,68,78,80,78,80,10,87]), 'RB'),
  slot(p('bra94_cb1', 'Aldair',        'Brazil', ['1990','1994','1998'],        'CB', [],     [72,46,66,56,86,82,10,82]), 'CB'),
  slot(p('bra94_cb2', 'Marcio Santos', 'Brazil', ['1994'],                      'CB', [],     [68,42,64,54,82,80,10,76]), 'CB'),
  slot(p('bra94_lb',  'Branco',        'Brazil', ['1986','1990','1994'],        'LB', [],     [74,64,74,68,78,76,10,77]), 'LB'),
  slot(p('bra94_cm1', 'Mauro Silva',   'Brazil', ['1994'],                      'CM', ['CDM'],[68,52,72,62,80,76,10,76]), 'CM'),
  slot(p('bra94_cm2', 'Mazinho',       'Brazil', ['1994'],                      'CM', [],     [70,56,74,66,72,74,10,73]), 'CM'),
  slot(p('bra94_cm3', 'Zinho',         'Brazil', ['1994'],                      'CM', [],     [70,72,82,76,60,70,10,79]), 'CM'),
  slot(p('bra94_cm4', 'Mauro Galvão',  'Brazil', ['1990','1994'],               'CM', ['CB'], [68,52,70,60,76,74,10,71]), 'CM'),
  slot(p('bra94_st1', 'Romário',       'Brazil', ['1990','1994'],               'ST', [],     [84,92,76,90,30,74,10,93]), 'ST'),
  slot(p('bra94_st2', 'Bebeto',        'Brazil', ['1990','1994','1998'],        'ST', ['LW'], [84,86,72,82,34,72,10,86]), 'ST'),
], [
  p('bra94_b1', 'Ronaldo',       'Brazil', ['1994','1998','2002','2006'], 'ST', [],    [92,94,76,92,32,82,10,94]),
  p('bra94_b2', 'Rai',           'Brazil', ['1994'],                      'CAM',['CM'], [74,74,82,78,50,70,10,79]),
  p('bra94_b3', 'Mazinho',       'Brazil', ['1994'],                      'CM', [],    [70,56,74,66,72,74,10,73]),
  p('bra94_b4', 'Taffarel',      'Brazil', ['1990','1994','1998'],        'GK', [],    [58,12,66,22,72,76,86,84]),
  p('bra94_b5', 'Leonardo',      'Brazil', ['1994','1998'],               'LB', ['CM'], [78,64,78,76,68,70,10,78]),
])

const ita94 = sq('ita94', '1994', 'Italy', 'Italy 1994', false, '4-4-2', 'defensive', [
  slot(p('ita94_gk',  'Gianluca Pagliuca','Italy', ['1990','1994'],         'GK', [],     [56,12,66,20,74,76,84,82]), 'GK'),
  slot(p('ita94_rb',  'Mauro Tassotti',  'Italy', ['1990','1994'],         'RB', ['CB'], [70,46,64,56,84,80,10,76]), 'RB'),
  slot(p('ita94_cb1', 'Franco Baresi',   'Italy', ['1982','1990','1994'], 'CB', [],     [72,52,80,70,92,84,10,92]), 'CB'),
  slot(p('ita94_cb2', 'Paolo Maldini',   'Italy', ['1990','1994','1998','2002','2006'], 'CB', ['LB'], [80,58,78,74,92,84,10,91]), 'CB'),
  slot(p('ita94_lb',  'Antonio Benarrivo','Italy',['1994'],                'LB', [],     [74,50,66,62,76,72,10,72]), 'LB'),
  slot(p('ita94_cm1', 'Demetrio Albertini','Italy',['1994','1998','2002'], 'CM', [],     [68,66,86,74,62,68,10,80]), 'CM'),
  slot(p('ita94_cm2', 'Dino Baggio',     'Italy', ['1994'],               'CM', [],     [72,72,72,68,68,76,10,78]), 'CM'),
  slot(p('ita94_cm3', 'Antonio Conte',   'Italy', ['1994','1998','2002'], 'CM', [],     [72,64,74,68,72,76,10,74]), 'CM'),
  slot(p('ita94_cm4', 'Nicola Berti',    'Italy', ['1990','1994'],        'CM', [],     [72,62,70,66,66,72,10,71]), 'CM'),
  slot(p('ita94_st1', 'Roberto Baggio',  'Italy', ['1990','1994','1998','2002'], 'ST', ['CAM'], [76,88,84,90,44,70,10,91]), 'ST'),
  slot(p('ita94_st2', 'Daniele Massaro', 'Italy', ['1994'],               'ST', ['RW'], [76,74,62,70,38,70,10,71]), 'ST'),
], [
  p('ita94_b1', 'Alessandro Costacurta','Italy',['1990','1994','1998','2002'], 'CB', [], [70,44,66,56,88,82,10,82]),
  p('ita94_b2', 'Pierluigi Casiraghi', 'Italy', ['1994'],                     'ST', [],  [72,72,58,62,38,74,10,70]),
  p('ita94_b3', 'Giuseppe Signori',    'Italy', ['1994'],                     'LW', [],  [80,78,68,76,36,70,10,75]),
  p('ita94_b4', 'Luca Marchegiani',    'Italy', ['1990','1994'],              'GK', [],  [54,10,62,20,70,74,80,74]),
  p('ita94_b5', 'Luigi Apolloni',      'Italy', ['1994'],                     'CB', [],  [68,42,64,54,82,78,10,72]),
])

// ─── 1998 ───────────────────────────────────────────────────────────────────

const fra98 = sq('fra98', '1998', 'France', 'France 1998', true, '4-2-3-1', 'balanced', [
  slot(p('fra98_gk',  'Fabien Barthez',  'France', ['1994','1998','2002','2006'], 'GK', [],     [58,12,72,22,74,78,86,86]), 'GK'),
  slot(p('fra98_rb',  'Lilian Thuram',   'France', ['1998','2002','2006'],        'RB', ['CB'], [82,60,74,70,84,80,10,83]), 'RB'),
  slot(p('fra98_cb1', 'Marcel Desailly', 'France', ['1994','1998','2002'],        'CB', ['CM'], [78,48,72,62,88,86,10,84]), 'CB'),
  slot(p('fra98_cb2', 'Laurent Blanc',   'France', ['1994','1998','2002'],        'CB', [],     [72,50,76,64,86,80,10,83]), 'CB'),
  slot(p('fra98_lb',  'Bixente Lizarazu','France', ['1994','1998','2002','2006'], 'LB', [],     [78,56,72,68,80,76,10,80]), 'LB'),
  slot(p('fra98_cdm1','Didier Deschamps','France', ['1994','1998','2002'],        'CDM', [],    [70,54,78,66,82,76,10,79]), 'CDM'),
  slot(p('fra98_cdm2','Emmanuel Petit',  'France', ['1998'],                      'CDM', ['CM'],[72,66,78,70,76,78,10,81]), 'CDM'),
  slot(p('fra98_rw',  'Youri Djorkaeff', 'France', ['1994','1998','2002'],        'RW', ['CAM'],[76,78,80,78,52,70,10,80]), 'RW'),
  slot(p('fra98_cam', 'Zinédine Zidane', 'France', ['1998','2002','2006'],        'CAM',['CM'], [80,82,92,92,54,78,10,94]), 'CAM'),
  slot(p('fra98_lw',  'Thierry Henry',   'France', ['1998','2002','2006','2010'], 'LW', ['ST'], [90,86,78,88,42,78,10,88]), 'LW'),
  slot(p('fra98_st',  'Stéphane Guivarc\'h','France',['1998'],                   'ST', [],     [74,70,58,60,36,72,10,67]), 'ST'),
], [
  p('fra98_b1', 'David Trezeguet', 'France', ['1998','2002','2006'], 'ST', [],    [80,86,68,72,36,74,10,83]),
  p('fra98_b2', 'Robert Pires',    'France', ['1998','2002','2006'], 'LW', ['CM'], [82,76,78,82,44,70,10,80]),
  p('fra98_b3', 'Alain Boghossian','France', ['1998'],               'CM', [],    [70,58,72,64,68,72,10,71]),
  p('fra98_b4', 'Bernard Lama',    'France', ['1998'],               'GK', [],    [54,10,62,20,70,72,78,73]),
  p('fra98_b5', 'Christophe Dugarry','France',['1994','1998'],       'ST', ['LW'], [78,74,66,72,38,72,10,72]),
])

const bra98 = sq('bra98', '1998', 'Brazil', 'Brazil 1998', false, '4-2-3-1', 'attacking', [
  slot(p('bra98_gk',  'Taffarel',      'Brazil', ['1990','1994','1998'],        'GK', [],     [58,12,66,22,72,76,86,84]), 'GK'),
  slot(p('bra98_rb',  'Cafu',          'Brazil', ['1990','1994','1998','2002'], 'RB', [],     [90,68,78,80,78,80,10,87]), 'RB'),
  slot(p('bra98_cb1', 'Aldair',        'Brazil', ['1990','1994','1998'],        'CB', [],     [72,46,66,56,86,82,10,82]), 'CB'),
  slot(p('bra98_cb2', 'Junior Baiano', 'Brazil', ['1994','1998'],               'CB', [],     [68,40,62,52,82,78,10,74]), 'CB'),
  slot(p('bra98_lb',  'Roberto Carlos','Brazil', ['1994','1998','2002','2006'], 'LB', [],     [88,72,80,82,72,84,10,88]), 'LB'),
  slot(p('bra98_cdm1','Cesar Sampaio', 'Brazil', ['1998'],                      'CDM', [],    [70,56,74,64,78,76,10,74]), 'CDM'),
  slot(p('bra98_cdm2','Leonardo',      'Brazil', ['1994','1998'],               'CDM', ['LB'],[76,64,78,74,66,70,10,76]), 'CDM'),
  slot(p('bra98_rw',  'Denílson',      'Brazil', ['1998','2002','2006'],        'RW', ['LW'], [90,68,70,88,36,70,10,74]), 'RW'),
  slot(p('bra98_cam', 'Rivaldo',       'Brazil', ['1994','1998','2002','2006'], 'CAM',['LW'], [80,86,82,88,44,76,10,87]), 'CAM'),
  slot(p('bra98_lw',  'Bebeto',        'Brazil', ['1990','1994','1998'],        'LW', ['ST'], [84,82,72,80,34,70,10,82]), 'LW'),
  slot(p('bra98_st',  'Ronaldo',       'Brazil', ['1994','1998','2002','2006'], 'ST', [],     [92,94,76,92,32,82,10,94]), 'ST'),
], [
  p('bra98_b1', 'Ronaldinho',    'Brazil', ['2002','2006'],                'LW', ['CAM'], [86,82,86,94,38,74,10,88]),
  p('bra98_b2', 'Emerson',       'Brazil', ['1998','2002'],               'CM', ['CDM'], [76,58,76,68,78,80,10,78]),
  p('bra98_b3', 'Flávio Concei.','Brazil', ['1998'],                      'CM', [],      [70,60,72,68,66,70,10,70]),
  p('bra98_b4', 'Zetti',         'Brazil', ['1994','1998'],               'GK', [],      [54,10,60,18,70,72,76,70]),
  p('bra98_b5', 'Giovanni',      'Brazil', ['1998'],                      'RW', [],      [82,72,68,76,40,68,10,71]),
])

// ─── 2002 ───────────────────────────────────────────────────────────────────

const bra02 = sq('bra02', '2002', 'Brazil', 'Brazil 2002', true, '4-2-3-1', 'attacking', [
  slot(p('bra02_gk',  'Marcos',         'Brazil', ['2002'],                      'GK', [],     [56,12,64,20,70,74,82,80]), 'GK'),
  slot(p('bra02_rb',  'Cafu',           'Brazil', ['1990','1994','1998','2002'], 'RB', [],     [88,66,78,80,76,80,10,87]), 'RB'),
  slot(p('bra02_cb1', 'Lúcio',          'Brazil', ['2002','2006'],               'CB', [],     [80,52,70,60,88,84,10,84]), 'CB'),
  slot(p('bra02_cb2', 'Roque Júnior',   'Brazil', ['2002'],                      'CB', [],     [70,42,64,54,82,78,10,74]), 'CB'),
  slot(p('bra02_lb',  'Roberto Carlos', 'Brazil', ['1994','1998','2002','2006'], 'LB', [],     [88,70,80,80,72,84,10,88]), 'LB'),
  slot(p('bra02_cdm1','Gilberto Silva', 'Brazil', ['2002','2006'],               'CDM', [],    [72,52,74,62,84,80,10,82]), 'CDM'),
  slot(p('bra02_cdm2','Kléberson',      'Brazil', ['2002'],                      'CDM', ['CM'],[70,56,72,66,74,72,10,72]), 'CDM'),
  slot(p('bra02_rw',  'Ronaldinho',     'Brazil', ['2002','2006'],               'RW', ['LW','CAM'],[86,82,86,94,38,74,10,88]), 'RW'),
  slot(p('bra02_cam', 'Rivaldo',        'Brazil', ['1994','1998','2002','2006'], 'CAM',['LW'], [80,84,82,88,44,76,10,87]), 'CAM'),
  slot(p('bra02_lw',  'Edilson',        'Brazil', ['2002'],                      'LW', ['RW'], [86,72,68,82,40,70,10,72]), 'LW'),
  slot(p('bra02_st',  'Ronaldo',        'Brazil', ['1994','1998','2002','2006'], 'ST', [],     [92,94,76,92,32,82,10,95]), 'ST'),
], [
  p('bra02_b1', 'Bebeto',       'Brazil', ['1990','1994','1998'],        'ST', ['LW'],  [78,76,68,72,34,66,10,72]),
  p('bra02_b2', 'Denílson',     'Brazil', ['1998','2002','2006'],        'RW', [],      [90,68,70,88,36,70,10,73]),
  p('bra02_b3', 'Juninho Paulista','Brazil',['1998','2002'],             'CM', [],      [72,70,80,76,56,70,10,78]),
  p('bra02_b4', 'Dida',         'Brazil', ['2002','2006'],               'GK', [],      [58,12,64,22,72,76,86,84]),
  p('bra02_b5', 'Edmílson',     'Brazil', ['2002','2006'],               'CM', ['CB'],  [72,50,70,60,78,76,10,73]),
])

const ger02 = sq('ger02', '2002', 'Germany', 'Germany 2002', false, '4-4-2', 'defensive', [
  slot(p('ger02_gk',  'Oliver Kahn',    'Germany', ['1994','1998','2002','2006'], 'GK', [],     [58,12,68,22,76,80,92,91]), 'GK'),
  slot(p('ger02_rb',  'Marko Rehmer',   'Germany', ['2002'],                      'RB', [],     [72,46,64,58,76,72,10,70]), 'RB'),
  slot(p('ger02_cb1', 'Christoph Metzelder','Germany',['2002','2006'],            'CB', [],     [70,44,66,56,82,78,10,77]), 'CB'),
  slot(p('ger02_cb2', 'Carsten Ramelow','Germany', ['1998','2002'],               'CB', ['CDM'],[68,44,66,56,82,78,10,75]), 'CB'),
  slot(p('ger02_lb',  'Christian Ziege','Germany', ['1998','2002'],               'LB', [],     [78,58,70,66,74,72,10,74]), 'LB'),
  slot(p('ger02_cm1', 'Dietmar Hamann', 'Germany', ['1998','2002','2006'],        'CM', ['CDM'],[70,58,78,64,82,78,10,82]), 'CM'),
  slot(p('ger02_cm2', 'Michael Ballack','Germany', ['1998','2002','2006','2010'], 'CM', [],     [80,82,84,78,72,82,10,88]), 'CM'),
  slot(p('ger02_cm3', 'Bernd Schneider','Germany', ['1998','2002','2006'],        'CM', ['RW'], [78,68,72,74,58,68,10,75]), 'CM'),
  slot(p('ger02_cm4', 'Torsten Frings', 'Germany', ['2002','2006'],               'CM', ['LB'], [74,62,72,66,68,72,10,73]), 'CM'),
  slot(p('ger02_st1', 'Miroslav Klose', 'Germany', ['2002','2006','2010','2014'], 'ST', [],     [82,82,66,70,40,78,10,82]), 'ST'),
  slot(p('ger02_st2', 'Oliver Neuville','Germany', ['1998','2002'],               'ST', ['LW'], [78,72,62,66,38,70,10,71]), 'ST'),
], [
  p('ger02_b1', 'Gerald Asamoah', 'Germany', ['2002'],        'LW', [],     [86,70,64,76,38,72,10,70]),
  p('ger02_b2', 'Jens Lehmann',   'Germany', ['2002','2006'], 'GK', [],     [56,10,64,20,72,74,82,78]),
  p('ger02_b3', 'Carsten Jancker','Germany', ['2002'],        'ST', [],     [72,72,56,58,36,78,10,68]),
  p('ger02_b4', 'Sebastian Deisler','Germany',['2002'],       'CM', [],     [76,68,76,76,56,68,10,74]),
  p('ger02_b5', 'Marco Bode',     'Germany', ['1994','1998','2002'], 'LW', [], [80,66,64,70,42,68,10,69]),
])

// ─── 2006 ───────────────────────────────────────────────────────────────────

const ita06 = sq('ita06', '2006', 'Italy', 'Italy 2006', true, '4-2-3-1', 'defensive', [
  slot(p('ita06_gk',  'Gianluigi Buffon','Italy', ['1998','2002','2006','2010','2014'], 'GK', [], [58,12,72,22,78,82,93,93]), 'GK'),
  slot(p('ita06_rb',  'Gianluca Zambrotta','Italy',['1998','2002','2006'],         'RB', ['LB','CM'], [84,62,74,72,82,78,10,82]), 'RB'),
  slot(p('ita06_cb1', 'Fabio Cannavaro','Italy',['1994','1998','2002','2006','2010'], 'CB', [],  [76,50,70,64,90,84,10,87]), 'CB'),
  slot(p('ita06_cb2', 'Marco Materazzi','Italy', ['1998','2002','2006'],          'CB', [],     [70,50,62,52,84,82,10,76]), 'CB'),
  slot(p('ita06_lb',  'Fabio Grosso',  'Italy', ['2006'],                         'LB', [],     [74,52,66,62,76,72,10,72]), 'LB'),
  slot(p('ita06_cdm1','Andrea Pirlo',  'Italy', ['2002','2006','2010','2014'],    'CDM',['CM'], [66,74,90,80,68,72,10,88]), 'CDM'),
  slot(p('ita06_cdm2','Gennaro Gattuso','Italy',['2002','2006','2010'],           'CDM', [],    [72,56,70,64,84,82,10,80]), 'CDM'),
  slot(p('ita06_rw',  'Mauro Camoranesi','Italy',['2002','2006'],                 'RW', ['CM'], [78,68,70,74,56,70,10,74]), 'RW'),
  slot(p('ita06_cam', 'Francesco Totti','Italy',['1998','2002','2006'],           'CAM',['ST'], [72,84,84,88,46,70,10,85]), 'CAM'),
  slot(p('ita06_lw',  'Alessandro Del Piero','Italy',['1994','1998','2002','2006','2010'], 'LW', ['ST','CAM'], [76,86,80,84,40,68,10,84]), 'LW'),
  slot(p('ita06_st',  'Luca Toni',    'Italy', ['2006'],                          'ST', [],     [74,80,62,68,38,80,10,79]), 'ST'),
], [
  p('ita06_b1', 'Vincenzo Iaquinta','Italy', ['2006'],        'ST', [],     [80,74,62,70,36,72,10,72]),
  p('ita06_b2', 'Simone Perrotta', 'Italy', ['2002','2006'], 'CM', [],     [72,60,72,64,70,72,10,71]),
  p('ita06_b3', 'Alberto Gilardino','Italy',['2006','2010'], 'ST', [],     [72,78,60,64,38,74,10,74]),
  p('ita06_b4', 'Marco Amelia',    'Italy', ['2006'],        'GK', [],     [54,10,60,18,70,72,78,70]),
  p('ita06_b5', 'Cristian Zaccardo','Italy',['2006'],        'CB', ['RB'], [72,46,66,58,80,76,10,72]),
])

const fra06 = sq('fra06', '2006', 'France', 'France 2006', false, '4-2-3-1', 'balanced', [
  slot(p('fra06_gk',  'Fabien Barthez',  'France', ['1994','1998','2002','2006'], 'GK', [],     [58,12,72,22,74,76,82,80]), 'GK'),
  slot(p('fra06_rb',  'Willy Sagnol',    'France', ['2002','2006'],               'RB', [],     [78,52,70,64,78,74,10,74]), 'RB'),
  slot(p('fra06_cb1', 'Lilian Thuram',   'France', ['1998','2002','2006'],        'CB', ['RB'], [78,52,72,62,84,78,10,80]), 'CB'),
  slot(p('fra06_cb2', 'William Gallas',  'France', ['2002','2006','2010'],        'CB', [],     [76,52,70,60,82,78,10,78]), 'CB'),
  slot(p('fra06_lb',  'Éric Abidal',     'France', ['2006','2010'],               'LB', [],     [78,50,68,64,80,76,10,75]), 'LB'),
  slot(p('fra06_cdm1','Claude Makélélé', 'France', ['1998','2002','2006'],        'CDM', [],    [68,52,76,66,88,76,10,85]), 'CDM'),
  slot(p('fra06_cdm2','Patrick Vieira',  'France', ['1998','2002','2006'],        'CDM',['CM'], [78,70,80,74,80,84,10,84]), 'CDM'),
  slot(p('fra06_rw',  'Franck Ribéry',   'France', ['2006','2010','2014'],        'RW', ['LW'], [88,76,78,88,44,74,10,84]), 'RW'),
  slot(p('fra06_cam', 'Zinédine Zidane', 'France', ['1998','2002','2006'],        'CAM',['CM'], [78,84,90,90,56,76,10,93]), 'CAM'),
  slot(p('fra06_lw',  'Florent Malouda', 'France', ['2006','2010'],               'LW', [],     [82,70,72,76,48,72,10,73]), 'LW'),
  slot(p('fra06_st',  'Thierry Henry',   'France', ['1998','2002','2006','2010'], 'ST', ['LW'], [88,84,76,86,42,76,10,87]), 'ST'),
], [
  p('fra06_b1', 'David Trezeguet', 'France', ['1998','2002','2006'], 'ST', [],     [78,84,64,68,36,72,10,80]),
  p('fra06_b2', 'Sylvain Wiltord', 'France', ['1998','2002','2006'], 'LW', ['ST'], [84,72,68,76,40,68,10,70]),
  p('fra06_b3', 'Louis Saha',     'France', ['2006'],                'ST', [],     [82,74,60,70,34,72,10,70]),
  p('fra06_b4', 'Gregory Coupet', 'France', ['2006'],                'GK', [],     [56,10,64,20,72,72,80,74]),
  p('fra06_b5', 'Samir Nasri',    'France', ['2010'],                'CM', [],     [80,70,78,80,46,66,10,74]),
])

// ─── 2010 ───────────────────────────────────────────────────────────────────

const esp10 = sq('esp10', '2010', 'Spain', 'Spain 2010', true, '4-2-3-1', 'balanced', [
  slot(p('esp10_gk',  'Iker Casillas',  'Spain', ['2002','2006','2010','2014'],   'GK', [],     [58,12,72,22,76,78,91,90]), 'GK'),
  slot(p('esp10_rb',  'Sergio Ramos',   'Spain', ['2006','2010','2014','2018','2022'], 'RB', ['CB'], [82,64,76,74,86,84,10,86]), 'RB'),
  slot(p('esp10_cb1', 'Carles Puyol',   'Spain', ['2002','2006','2010'],          'CB', [],     [74,48,70,60,88,86,10,83]), 'CB'),
  slot(p('esp10_cb2', 'Gerard Piqué',   'Spain', ['2010','2014','2018'],          'CB', [],     [74,50,72,64,84,80,10,81]), 'CB'),
  slot(p('esp10_lb',  'Joan Capdevila', 'Spain', ['2010'],                        'LB', [],     [74,50,68,62,76,72,10,72]), 'LB'),
  slot(p('esp10_cdm1','Sergio Busquets','Spain', ['2010','2014','2018','2022'],   'CDM', [],    [68,52,82,66,84,74,10,83]), 'CDM'),
  slot(p('esp10_cdm2','Xabi Alonso',   'Spain', ['2002','2006','2010','2014'],    'CDM',['CM'], [72,68,88,72,76,74,10,85]), 'CDM'),
  slot(p('esp10_rw',  'Pedro',          'Spain', ['2010','2014'],                 'RW', ['LW'], [84,76,72,80,46,70,10,77]), 'RW'),
  slot(p('esp10_cam', 'Andrés Iniesta', 'Spain', ['2006','2010','2014'],          'CAM',['CM'], [80,74,90,92,54,70,10,91]), 'CAM'),
  slot(p('esp10_lw',  'David Silva',    'Spain', ['2010','2014','2018'],          'LW', ['CAM'],[80,76,86,84,52,70,10,86]), 'LW'),
  slot(p('esp10_st',  'David Villa',    'Spain', ['2006','2010','2014'],          'ST', ['LW'], [84,88,74,80,38,74,10,87]), 'ST'),
], [
  p('esp10_b1', 'Fernando Torres',  'Spain', ['2006','2010','2014'], 'ST', [],     [88,84,70,80,34,76,10,83]),
  p('esp10_b2', 'Xavi Hernández',   'Spain', ['2002','2006','2010','2014'], 'CM', [], [72,68,92,82,58,68,10,91]),
  p('esp10_b3', 'Jesús Navas',      'Spain', ['2010','2014','2018','2022'], 'RW', [], [90,62,64,78,44,70,10,73]),
  p('esp10_b4', 'Víctor Valdés',    'Spain', ['2006'],               'GK', [],     [54,10,66,20,72,72,82,76]),
  p('esp10_b5', 'Fernando Llorente','Spain', ['2010','2014'],        'ST', [],     [70,74,62,60,40,82,10,72]),
])

const ned10 = sq('ned10', '2010', 'Netherlands', 'Netherlands 2010', false, '4-2-3-1', 'attacking', [
  slot(p('ned10_gk',  'Maarten Stekelenburg','Netherlands',['2010'],             'GK', [],     [56,12,66,20,70,74,80,78]), 'GK'),
  slot(p('ned10_rb',  'Gregory van der Wiel','Netherlands',['2010','2014'],      'RB', [],     [78,52,66,68,72,70,10,72]), 'RB'),
  slot(p('ned10_cb1', 'John Heitinga',       'Netherlands',['2006','2010','2014'], 'CB', ['RB'], [72,46,66,58,80,76,10,75]), 'CB'),
  slot(p('ned10_cb2', 'Joris Mathijsen',     'Netherlands',['2006','2010'],      'CB', [],     [68,42,64,54,78,76,10,72]), 'CB'),
  slot(p('ned10_lb',  'Giovanni van Bronckhorst','Netherlands',['1998','2002','2006','2010'], 'LB', [], [78,62,72,68,78,72,10,78]), 'LB'),
  slot(p('ned10_cdm1','Nigel de Jong',       'Netherlands',['2006','2010','2014'], 'CDM', [],  [72,56,70,64,84,82,10,80]), 'CDM'),
  slot(p('ned10_cdm2','Mark van Bommel',     'Netherlands',['2006','2010','2014'], 'CDM',['CM'],[70,62,72,64,80,80,10,80]), 'CDM'),
  slot(p('ned10_rw',  'Arjen Robben',        'Netherlands',['2006','2010','2014'], 'RW', [],   [94,84,74,90,44,74,10,88]), 'RW'),
  slot(p('ned10_cam', 'Wesley Sneijder',     'Netherlands',['2006','2010','2014'], 'CAM', [],  [76,84,84,82,52,72,10,87]), 'CAM'),
  slot(p('ned10_lw',  'Dirk Kuyt',           'Netherlands',['2006','2010','2014'], 'LW', ['RW'],[80,74,70,70,56,78,10,77]), 'LW'),
  slot(p('ned10_st',  'Robin van Persie',    'Netherlands',['2006','2010','2014'], 'ST', ['LW'],[82,88,74,82,36,74,10,86]), 'ST'),
], [
  p('ned10_b1', 'Klaas-Jan Huntelaar','Netherlands',['2010','2014'], 'ST', [],    [80,86,64,72,34,74,10,80]),
  p('ned10_b2', 'Rafael van der Vaart','Netherlands',['2006','2010','2014'], 'CAM', [], [76,78,80,78,50,68,10,79]),
  p('ned10_b3', 'Ibrahim Afellay',   'Netherlands',['2010'],          'LW', ['CAM'], [82,72,74,80,42,68,10,72]),
  p('ned10_b4', 'Sander Boschker',   'Netherlands',['2010'],          'GK', [],    [52,10,60,18,68,70,76,68]),
  p('ned10_b5', 'Khalid Boulahrouz', 'Netherlands',['2006','2010'],   'CB', [],    [74,44,62,54,78,76,10,71]),
])

// ─── 2014 ───────────────────────────────────────────────────────────────────

const ger14 = sq('ger14', '2014', 'Germany', 'Germany 2014', true, '4-2-3-1', 'balanced', [
  slot(p('ger14_gk',  'Manuel Neuer',    'Germany', ['2010','2014','2018'],         'GK', [],     [60,14,72,24,78,82,94,94]), 'GK'),
  slot(p('ger14_rb',  'Philipp Lahm',    'Germany', ['2006','2010','2014'],         'RB', ['CM'], [80,60,84,76,84,78,10,88]), 'RB'),
  slot(p('ger14_cb1', 'Jérôme Boateng',  'Germany', ['2010','2014','2018'],         'CB', [],     [76,48,70,60,88,84,10,85]), 'CB'),
  slot(p('ger14_cb2', 'Mats Hummels',    'Germany', ['2010','2014','2018'],         'CB', [],     [72,48,74,62,88,82,10,85]), 'CB'),
  slot(p('ger14_lb',  'Benedikt Höwedes','Germany', ['2014'],                       'LB', [],     [72,44,64,54,80,76,10,72]), 'LB'),
  slot(p('ger14_cdm1','Bastian Schweinsteiger','Germany',['2006','2010','2014'],    'CDM',['CM'], [76,72,84,76,78,80,10,87]), 'CDM'),
  slot(p('ger14_cdm2','Toni Kroos',       'Germany', ['2010','2014','2018'],        'CDM',['CM'], [72,72,92,82,70,72,10,87]), 'CDM'),
  slot(p('ger14_rw',  'Thomas Müller',    'Germany', ['2010','2014','2018'],        'RW', ['ST','CAM'],[80,80,78,76,50,76,10,86]), 'RW'),
  slot(p('ger14_cam', 'Mesut Özil',       'Germany', ['2010','2014','2018'],        'CAM', [],    [76,74,88,84,42,66,10,84]), 'CAM'),
  slot(p('ger14_lw',  'Mario Götze',      'Germany', ['2010','2014'],               'LW', ['CAM'],[80,78,80,82,46,70,10,81]), 'LW'),
  slot(p('ger14_st',  'Miroslav Klose',   'Germany', ['2002','2006','2010','2014'], 'ST', [],     [80,82,66,68,40,76,10,83]), 'ST'),
], [
  p('ger14_b1', 'André Schürrle',   'Germany', ['2014','2018'],        'LW', ['RW'],  [88,78,72,78,44,72,10,78]),
  p('ger14_b2', 'Karim Benzema',    'France',  ['2014','2022'],        'ST', [],      [80,86,78,80,38,76,10,86]),
  p('ger14_b3', 'Sami Khedira',    'Germany', ['2010','2014','2018'],  'CM', ['CDM'], [74,66,76,68,76,80,10,79]),
  p('ger14_b4', 'Ron-Robert Zieler','Germany', ['2014'],               'GK', [],      [54,10,62,20,70,72,80,72]),
  p('ger14_b5', 'Kevin Großkreutz', 'Germany', ['2014'],               'RW', [],      [78,64,66,68,52,70,10,68]),
])

const arg14 = sq('arg14', '2014', 'Argentina', 'Argentina 2014', false, '4-3-3', 'balanced', [
  slot(p('arg14_gk',  'Sergio Romero',   'Argentina', ['2014','2018'],            'GK', [],     [56,12,64,20,70,72,82,80]), 'GK'),
  slot(p('arg14_rb',  'Pablo Zabaleta',  'Argentina', ['2010','2014','2018'],     'RB', [],     [80,52,70,66,78,76,10,77]), 'RB'),
  slot(p('arg14_cb1', 'Ezequiel Garay',  'Argentina', ['2014'],                   'CB', [],     [72,46,68,56,84,80,10,78]), 'CB'),
  slot(p('arg14_cb2', 'Martín Demichelis','Argentina', ['2006','2010','2014'],    'CB', [],     [68,42,66,54,82,76,10,72]), 'CB'),
  slot(p('arg14_lb',  'Marcos Rojo',     'Argentina', ['2014','2018','2022'],     'LB', ['CB'], [76,50,64,60,78,76,10,72]), 'LB'),
  slot(p('arg14_cm1', 'Javier Mascherano','Argentina',['2006','2010','2014','2018'], 'CM', ['CDM'],[70,52,74,66,84,78,10,84]), 'CM'),
  slot(p('arg14_cm2', 'Lucas Biglia',    'Argentina', ['2014'],                   'CM', ['CDM'],[68,56,76,66,74,72,10,73]), 'CM'),
  slot(p('arg14_rw',  'Lionel Messi',    'Argentina', ['2006','2010','2014','2018','2022'], 'RW', ['ST','CAM'],[87,90,88,96,38,74,10,97]), 'RW'),
  slot(p('arg14_st',  'Gonzalo Higuaín', 'Argentina', ['2010','2014','2018'],     'ST', [],     [78,84,68,74,36,74,10,83]), 'ST'),
  slot(p('arg14_lw',  'Sergio Agüero',   'Argentina', ['2010','2014','2018'],     'LW', ['ST'], [84,86,70,82,34,72,10,86]), 'LW'),
  slot(p('arg14_cm3', 'Enzo Pérez',      'Argentina', ['2014'],                   'CM', [],     [68,56,72,64,68,70,10,68]), 'CM'),
], [
  p('arg14_b1', 'Ángel Di María',  'Argentina', ['2010','2014','2018','2022'], 'RW', ['LW'],  [90,82,78,86,42,72,10,86]),
  p('arg14_b2', 'Ezequiel Lavezzi','Argentina', ['2010','2014'],               'LW', [],      [84,74,66,80,40,70,10,74]),
  p('arg14_b3', 'Rodrigo Palacio', 'Argentina', ['2014'],                      'ST', ['LW'],  [78,74,64,72,36,68,10,70]),
  p('arg14_b4', 'Mariano Andújar', 'Argentina', ['2014'],                      'GK', [],      [54,10,62,20,68,70,78,70]),
  p('arg14_b5', 'Nicolás Gaytán',  'Argentina', ['2014'],                      'CM', [],      [66,52,66,62,66,68,10,64]),
])

// ─── 2018 ───────────────────────────────────────────────────────────────────

const fra18 = sq('fra18', '2018', 'France', 'France 2018', true, '4-2-3-1', 'balanced', [
  slot(p('fra18_gk',  'Hugo Lloris',     'France', ['2010','2014','2018','2022'],  'GK', [],     [58,12,72,22,74,76,86,85]), 'GK'),
  slot(p('fra18_rb',  'Benjamin Pavard', 'France', ['2018','2022'],                'RB', ['CB'], [76,56,70,64,80,76,10,77]), 'RB'),
  slot(p('fra18_cb1', 'Raphaël Varane',  'France', ['2014','2018','2022'],         'CB', [],     [80,50,72,62,88,82,10,86]), 'CB'),
  slot(p('fra18_cb2', 'Samuel Umtiti',   'France', ['2018'],                       'CB', [],     [72,46,68,58,82,78,10,77]), 'CB'),
  slot(p('fra18_lb',  'Lucas Hernández', 'France', ['2018','2022'],                'LB', ['CB'], [80,54,68,66,82,80,10,80]), 'LB'),
  slot(p('fra18_cdm1','N\'Golo Kanté',   'France', ['2018','2022'],                'CDM', [],    [80,60,78,74,88,80,10,89]), 'CDM'),
  slot(p('fra18_cdm2','Paul Pogba',      'France', ['2014','2018','2022'],         'CDM',['CM'], [82,76,82,82,66,82,10,84]), 'CDM'),
  slot(p('fra18_rw',  'Kylian Mbappé',   'France', ['2018','2022'],                'RW', ['ST','LW'],[96,86,78,90,36,78,10,91]), 'RW'),
  slot(p('fra18_cam', 'Antoine Griezmann','France', ['2014','2018','2022'],        'CAM',['ST'], [82,84,82,80,52,72,10,85]), 'CAM'),
  slot(p('fra18_lw',  'Blaise Matuidi',  'France', ['2014','2018'],                'LW', ['CM'], [80,64,74,72,70,80,10,74]), 'LW'),
  slot(p('fra18_st',  'Olivier Giroud',  'France', ['2014','2018','2022'],         'ST', [],     [70,78,66,62,40,80,10,78]), 'ST'),
], [
  p('fra18_b1', 'Ousmane Dembélé', 'France', ['2018','2022'],        'RW', ['LW'],  [92,76,68,84,38,70,10,78]),
  p('fra18_b2', 'Florian Thauvin', 'France', ['2018'],               'RW', [],      [82,74,70,78,40,68,10,72]),
  p('fra18_b3', 'Nabil Fekir',     'France', ['2018'],               'CAM',['CM'],  [82,76,78,82,46,68,10,76]),
  p('fra18_b4', 'Steve Mandanda',  'France', ['2010','2018'],        'GK', [],      [54,10,66,20,70,72,80,74]),
  p('fra18_b5', 'Presnel Kimpembe','France', ['2018','2022'],        'CB', [],      [70,44,66,58,82,76,10,72]),
])

const cro18 = sq('cro18', '2018', 'Croatia', 'Croatia 2018', false, '4-2-3-1', 'balanced', [
  slot(p('cro18_gk',  'Danijel Subašić','Croatia', ['2014','2018'],               'GK', [],     [56,12,64,20,70,72,82,80]), 'GK'),
  slot(p('cro18_rb',  'Šime Vrsaljko',  'Croatia', ['2014','2018'],               'RB', [],     [78,52,66,66,74,72,10,72]), 'RB'),
  slot(p('cro18_cb1', 'Dejan Lovren',   'Croatia', ['2014','2018'],               'CB', [],     [72,46,68,58,80,76,10,74]), 'CB'),
  slot(p('cro18_cb2', 'Domagoj Vida',   'Croatia', ['2014','2018'],               'CB', [],     [70,44,64,54,80,78,10,72]), 'CB'),
  slot(p('cro18_lb',  'Ivan Strinić',   'Croatia', ['2014','2018'],               'LB', [],     [72,46,62,58,74,70,10,68]), 'LB'),
  slot(p('cro18_cdm1','Marcelo Brozović','Croatia', ['2014','2018','2022'],        'CDM', [],    [76,64,80,72,76,76,10,81]), 'CDM'),
  slot(p('cro18_cdm2','Ivan Rakitić',   'Croatia', ['2014','2018','2022'],        'CDM',['CM'], [76,74,82,76,68,74,10,82]), 'CDM'),
  slot(p('cro18_rw',  'Ante Rebić',     'Croatia', ['2014','2018','2022'],        'RW', ['LW'], [84,74,66,76,48,76,10,75]), 'RW'),
  slot(p('cro18_cam', 'Luka Modrić',    'Croatia', ['2006','2014','2018','2022'], 'CAM',['CM'], [80,76,90,88,62,72,10,91]), 'CAM'),
  slot(p('cro18_lw',  'Ivan Perišić',   'Croatia', ['2014','2018','2022'],        'LW', ['RW'], [84,78,72,78,52,76,10,81]), 'LW'),
  slot(p('cro18_st',  'Mario Mandžukić','Croatia', ['2014','2018'],               'ST', ['LW'], [76,78,62,68,44,82,10,79]), 'ST'),
], [
  p('cro18_b1', 'Andrej Kramarić','Croatia', ['2018','2022'],        'ST', ['RW'],  [80,78,66,72,38,72,10,76]),
  p('cro18_b2', 'Mateo Kovačić',  'Croatia', ['2014','2018','2022'], 'CM', [],      [80,68,82,82,56,72,10,80]),
  p('cro18_b3', 'Milan Badelj',   'Croatia', ['2018'],               'CM', ['CDM'], [68,54,72,62,72,70,10,68]),
  p('cro18_b4', 'Lovre Kalinić',  'Croatia', ['2018'],               'GK', [],      [54,10,60,18,68,70,76,66]),
  p('cro18_b5', 'Marko Rog',      'Croatia', ['2018'],               'CM', [],      [72,58,70,66,60,68,10,66]),
])

// ─── 2022 ───────────────────────────────────────────────────────────────────

const arg22 = sq('arg22', '2022', 'Argentina', 'Argentina 2022', true, '4-2-3-1', 'attacking', [
  slot(p('arg22_gk',  'Emiliano Martínez','Argentina',['2022'],                   'GK', [],     [60,12,70,22,74,78,88,86]), 'GK'),
  slot(p('arg22_rb',  'Nahuel Molina',  'Argentina', ['2022'],                    'RB', ['RW'], [82,62,70,72,74,72,10,78]), 'RB'),
  slot(p('arg22_cb1', 'Cristian Romero','Argentina', ['2022'],                    'CB', [],     [76,50,68,60,86,82,10,83]), 'CB'),
  slot(p('arg22_cb2', 'Lisandro Martínez','Argentina',['2022'],                   'CB', [],     [72,48,70,60,84,80,10,80]), 'CB'),
  slot(p('arg22_lb',  'Nicolás Tagliafico','Argentina',['2018','2022'],           'LB', [],     [76,52,68,64,76,72,10,74]), 'LB'),
  slot(p('arg22_cdm1','Enzo Fernández', 'Argentina', ['2022'],                    'CDM',['CM'], [76,66,80,74,72,74,10,80]), 'CDM'),
  slot(p('arg22_cdm2','Rodrigo De Paul','Argentina', ['2018','2022'],             'CDM',['CM'], [78,70,80,76,70,76,10,82]), 'CDM'),
  slot(p('arg22_rw',  'Ángel Di María', 'Argentina', ['2010','2014','2018','2022'], 'RW', ['LW'],[88,82,78,86,42,70,10,84]), 'RW'),
  slot(p('arg22_cam', 'Lionel Messi',   'Argentina', ['2006','2010','2014','2018','2022'], 'CAM',['ST','RW'],[86,92,90,96,38,72,10,97]), 'CAM'),
  slot(p('arg22_lw',  'Alexis Mac Allister','Argentina',['2022'],                 'LW', ['CM'], [78,72,78,76,60,72,10,79]), 'LW'),
  slot(p('arg22_st',  'Julián Álvarez', 'Argentina', ['2022'],                    'ST', [],     [84,84,72,78,42,76,10,85]), 'ST'),
], [
  p('arg22_b1', 'Lautaro Martínez','Argentina',['2018','2022'],       'ST', [],     [82,82,68,76,36,76,10,83]),
  p('arg22_b2', 'Leandro Paredes', 'Argentina',['2018','2022'],       'CDM',['CM'], [70,56,78,66,70,70,10,73]),
  p('arg22_b3', 'Paulo Dybala',    'Argentina',['2022'],              'CAM',['ST'], [78,80,76,82,40,66,10,80]),
  p('arg22_b4', 'Gerónimo Rulli',  'Argentina',['2022'],              'GK', [],     [54,10,62,20,68,70,78,70]),
  p('arg22_b5', 'Marcos Acuña',    'Argentina',['2018','2022'],       'LB', ['CM'], [78,56,68,66,72,72,10,72]),
])

const fra22 = sq('fra22', '2022', 'France', 'France 2022', false, '4-2-3-1', 'balanced', [
  slot(p('fra22_gk',  'Hugo Lloris',     'France', ['2010','2014','2018','2022'],  'GK', [],     [58,12,72,22,74,76,84,83]), 'GK'),
  slot(p('fra22_rb',  'Jules Koundé',    'France', ['2022'],                       'RB', ['CB'], [80,58,72,70,82,76,10,80]), 'RB'),
  slot(p('fra22_cb1', 'Raphaël Varane',  'France', ['2014','2018','2022'],         'CB', [],     [78,50,72,60,86,80,10,84]), 'CB'),
  slot(p('fra22_cb2', 'Ibrahima Konaté', 'France', ['2022'],                       'CB', [],     [76,48,66,58,82,80,10,76]), 'CB'),
  slot(p('fra22_lb',  'Théo Hernández',  'France', ['2022'],                       'LB', [],     [86,62,70,74,74,78,10,81]), 'LB'),
  slot(p('fra22_cdm1','Aurélien Tchouaméni','France',['2022'],                    'CDM', [],    [76,60,76,70,80,78,10,80]), 'CDM'),
  slot(p('fra22_cdm2','Adrien Rabiot',   'France', ['2018','2022'],                'CDM',['CM'], [78,66,72,70,66,78,10,74]), 'CDM'),
  slot(p('fra22_rw',  'Ousmane Dembélé', 'France', ['2018','2022'],                'RW', ['LW'], [94,76,70,84,38,70,10,79]), 'RW'),
  slot(p('fra22_cam', 'Antoine Griezmann','France', ['2014','2018','2022'],        'CAM',['ST'], [80,82,82,80,54,72,10,84]), 'CAM'),
  slot(p('fra22_lw',  'Kylian Mbappé',   'France', ['2018','2022'],                'LW', ['ST','RW'],[96,90,80,92,36,78,10,93]), 'LW'),
  slot(p('fra22_st',  'Olivier Giroud',  'France', ['2014','2018','2022'],         'ST', [],     [70,80,66,62,40,80,10,78]), 'ST'),
], [
  p('fra22_b1', 'Marcus Thuram',   'France', ['2022'],               'ST', ['LW'],  [88,76,66,76,36,76,10,76]),
  p('fra22_b2', 'Randal Kolo Muani','France',['2022'],               'ST', [],      [88,74,62,74,34,74,10,74]),
  p('fra22_b3', 'Eduardo Camavinga','France',['2022'],               'CM', ['CDM'], [82,62,72,76,62,72,10,72]),
  p('fra22_b4', 'Alphonse Areola', 'France', ['2022'],               'GK', [],      [56,10,64,20,68,72,78,70]),
  p('fra22_b5', 'Marcus Thuram',   'France', ['2022'],               'ST', [],      [88,76,66,76,36,76,10,76]),
])

// ─── Editions ────────────────────────────────────────────────────────────────

export interface WcEdition {
  year: WorldCupYear
  host: string
  champion: HistoricalSquad
  runnerUp: HistoricalSquad
}

export const WC_EDITIONS: WcEdition[] = [
  { year: '1970', host: 'Mexico',           champion: bra70, runnerUp: ita70 },
  { year: '1974', host: 'West Germany',     champion: wgr74, runnerUp: ned74 },
  { year: '1978', host: 'Argentina',        champion: arg78, runnerUp: ned78 },
  { year: '1982', host: 'Spain',            champion: ita82, runnerUp: wgr82 },
  { year: '1986', host: 'Mexico',           champion: arg86, runnerUp: wgr86 },
  { year: '1990', host: 'Italy',            champion: wgr90, runnerUp: arg90 },
  { year: '1994', host: 'USA',              champion: bra94, runnerUp: ita94 },
  { year: '1998', host: 'France',           champion: fra98, runnerUp: bra98 },
  { year: '2002', host: 'South Korea/Japan',champion: bra02, runnerUp: ger02 },
  { year: '2006', host: 'Germany',          champion: ita06, runnerUp: fra06 },
  { year: '2010', host: 'South Africa',     champion: esp10, runnerUp: ned10 },
  { year: '2014', host: 'Brazil',           champion: ger14, runnerUp: arg14 },
  { year: '2018', host: 'Russia',           champion: fra18, runnerUp: cro18 },
  { year: '2022', host: 'Qatar',            champion: arg22, runnerUp: fra22 },
]

export function getWcEdition(year: WorldCupYear): WcEdition | undefined {
  return WC_EDITIONS.find(e => e.year === year)
}
