import { Schema as S } from 'effect'
import {
  Rank,
  StatsClass,
  Demo,
  StatsPositioning,
  Core,
  Boost,
  Movement
} from './common.js'
import { Uploader, Id } from './accounts.js'
import { GroupStub } from './group.js'

const TeamColors = S.Literal('blue', 'orange')

export class Camera extends S.Class<Camera>('Camera')({
  fov: S.Finite,
  height: S.Finite,
  pitch: S.Finite,
  distance: S.Finite,
  stiffness: S.Finite,
  swivel_speed: S.Finite,
  transition_speed: S.Finite
}) {}

export class Ball extends S.Class<Ball>('Ball')({
  possession_time: S.optional(S.Finite),
  time_in_side: S.Finite
}) {}

const BoostWOPercent = Boost.pipe(
  S.omit(
    'percent_zero_boost',
    'percent_full_boost',
    'percent_boost_0_25',
    'percent_boost_25_50',
    'percent_boost_50_75',
    'percent_boost_75_100'
  )
)

export class Stats extends S.Class<Stats>('Stats')({
  ball: Ball,
  core: Core,
  boost: BoostWOPercent,
  movement: Movement.pipe(
    S.omit(
      'avg_speed',
      'avg_powerslide_duration',
      'avg_speed_percentage',
      'percent_slow_speed',
      'percent_boost_speed',
      'percent_supersonic_speed',
      'percent_ground',
      'percent_low_air',
      'percent_high_air'
    )
  ),
  positioning: StatsPositioning.pipe(
    S.omit(
      'avg_distance_to_ball',
      'avg_distance_to_ball_possession',
      'avg_distance_to_ball_no_possession',
      'time_most_back',
      'time_most_forward',
      'time_closest_to_ball',
      'time_farthest_from_ball',
      'percent_defensive_third',
      'percent_offensive_third',
      'percent_neutral_third',
      'percent_defensive_half',
      'percent_offensive_half',
      'percent_behind_ball',
      'percent_infront_ball',
      'avg_distance_to_mates',
      'percent_most_back',
      'percent_most_forward',
      'percent_closest_to_ball',
      'percent_farthest_from_ball'
    )
  ),
  demo: Demo
}) {}

export class Server extends S.Class<Server>('Server')({
  name: S.String,
  region: S.String
}) {}

export class TeamReplayPlayer extends S.Class<TeamReplayPlayer>(
  'TeamReplayPlayer'
)({
  start_time: S.Finite,
  end_time: S.Finite,
  name: S.String,
  mvp: S.optional(S.Boolean),
  id: Id,
  car_id: S.Finite,
  car_name: S.String,
  camera: Camera,
  steering_sensitivity: S.Finite,
  stats: StatsClass
}) {}

export class TeamReplayStats extends S.Class<TeamReplayStats>(
  'TeamReplayStats'
)({
  color: TeamColors,
  name: S.optional(S.String),
  players: S.optional(S.Array(TeamReplayPlayer)),
  stats: Stats
}) {}

export class ReplaySummaryPlayer extends S.Class<ReplaySummaryPlayer>(
  'ReplaySummaryPlayer'
)({
  start_time: S.Finite,
  end_time: S.Finite,
  name: S.String,
  // id is partial because bots have no id
  id: S.partialWith(Id, { exact: true }),
  mvp: S.optional(S.Boolean),
  rank: S.optional(Rank),
  score: S.Finite
}) {}

export class ReplaySummaryTeamStats extends S.Class<ReplaySummaryTeamStats>(
  'ReplaySummaryTeamStats'
)({
  name: S.optional(S.String),
  goals: S.optional(S.Finite),
  players: S.optional(S.Array(ReplaySummaryPlayer))
}) {}

export class ReplaySummary extends S.Class<ReplaySummary>('ReplaySummary')({
  id: S.String,
  link: S.String,
  rocket_league_id: S.String,
  replay_title: S.String,
  map_code: S.String,
  map_name: S.String,
  playlist_id: S.optional(S.String),
  playlist_name: S.optional(S.String),
  duration: S.optional(S.Finite),
  overtime: S.Boolean,
  overtime_seconds: S.optional(S.Finite),
  season: S.Finite,
  season_type: S.String,
  date: S.String,
  date_has_tz: S.Boolean,
  visibility: S.String,
  created: S.String,
  min_rank: S.optional(Rank),
  max_rank: S.optional(Rank),
  uploader: Uploader,
  groups: S.optional(S.Array(GroupStub)),
  blue: ReplaySummaryTeamStats,
  orange: ReplaySummaryTeamStats
}) {}

export class ReplayCommon extends S.Class<ReplayCommon>('ReplayCommon')({
  id: S.String,
  link: S.String,
  created: S.String,
  uploader: Uploader
}) {}

export class ReplayOk extends S.Class<ReplayOk>('ReplayOk')({
  ...ReplayCommon.fields,
  status: S.Literal('ok'),
  rocket_league_id: S.String,
  match_guid: S.String,
  title: S.String,
  map_code: S.String,
  match_type: S.Literal('Online', 'Private', 'Training'),
  team_size: S.Finite,
  playlist_id: S.optional(S.String),
  duration: S.Finite,
  overtime: S.Boolean,
  overtime_seconds: S.optional(S.Finite),
  season: S.Finite,
  season_type: S.String,
  date: S.String,
  date_has_timezone: S.Boolean,
  visibility: S.Literal('public', 'unlisted', 'private'),
  blue: TeamReplayStats,
  orange: TeamReplayStats,
  playlist_name: S.optional(S.String),
  map_name: S.String,
  server: Server
}) {}

export class ReplayPending extends S.Class<ReplayPending>('ReplayPending')({
  ...ReplayCommon.fields,
  status: S.Literal('pending')
}) {}

export class ReplayFailed extends S.Class<ReplayFailed>('ReplayFailed')({
  ...ReplayCommon.fields,
  status: S.Literal('failed')
}) {}

export const Replay = S.Union(ReplayOk, ReplayPending, ReplayFailed)
export type Replay = typeof Replay.Type
