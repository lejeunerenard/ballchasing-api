import { Schema as S } from "effect";
import {
  StatsClass,
  Demo,
  StatsPositioning,
  Core,
  Boost,
  Movement,
} from "./common.js";
import { Id, Uploader, Creator } from "./accounts.js";

export class TeamPlayer extends S.Class<TeamPlayer>("TeamPlayer")({
  ...Id.fields,
  name: S.String,
  team: S.String,
}) {}

export class CumulativePositioning extends S.Class<CumulativePositioning>(
  "CumulativePositioning",
)({
  time_defensive_third: S.Finite,
  time_neutral_third: S.Finite,
  time_offensive_third: S.Finite,
  time_defensive_half: S.Finite,
  time_offensive_half: S.Finite,
  time_behind_ball: S.Finite,
  time_infront_ball: S.Finite,
  avg_distance_to_ball: S.Finite,
  avg_distance_to_ball_possession: S.Finite,
  avg_distance_to_ball_no_possession: S.Finite,
}) {}

export class CoreSummary extends S.Class<CoreSummary>("CoreSummary")({
  ...Core.fields,
  mvp: S.optional(S.Finite),
}) {}

export class StatsClassSummary extends S.Class<StatsClassSummary>(
  "StatsClassSummary",
)({
  ...StatsClass.fields,
  core: CoreSummary,
  positioning: StatsPositioning.pipe(
    S.omit(
      "avg_distance_to_mates",
      "percent_most_back",
      "percent_most_forward",
      "percent_closest_to_ball",
      "percent_farthest_from_ball",
    ),
  ),
}) {}

export class GroupSummary extends S.Class<GroupSummary>("GroupSummary")({
  id: S.String,
  link: S.String,
  name: S.String,
  created: S.String,
  player_identification: S.String,
  team_identification: S.String,
  direct_replays: S.Finite,
  indirect_replays: S.Finite,
  shared: S.Boolean,
  user: Uploader,
}) {}

export class GroupStub extends S.Class<GroupStub>("GroupStub")({
  id: S.String,
  name: S.String,
  link: S.String,
}) {}

export class PlayerCumulative extends S.Class<PlayerCumulative>(
  "PlayerCumulative",
)({
  games: S.Finite,
  wins: S.Finite,
  win_percentage: S.Finite,
  play_duration: S.Finite,
  core: CoreSummary,
  boost: Boost,
  movement: Movement,
  positioning: StatsPositioning.pipe(
    S.omit(
      "avg_distance_to_mates",
      "percent_most_back",
      "percent_most_forward",
      "percent_closest_to_ball",
      "percent_farthest_from_ball",
    ),
  ),
  demo: Demo,
}) {}

export class GroupPlayer extends S.Class<GroupPlayer>("GroupPlayer")({
  ...Id.fields,
  name: S.String,
  team: S.String,
  cumulative: PlayerCumulative,
  game_average: StatsClassSummary,
}) {}

export class TeamCumulative extends S.Class<TeamCumulative>("TeamCumulative")({
  games: S.Finite,
  wins: S.Finite,
  win_percentage: S.Finite,
  play_duration: S.Finite,
  core: Core,
  boost: Boost.pipe(
    S.omit(
      "bpm",
      "bcpm",
      "avg_amount",
      "percent_boost_0_25",
      "percent_boost_25_50",
      "percent_boost_50_75",
      "percent_boost_75_100",
    ),
  ),
  movement: Movement.pipe(
    S.omit(
      "avg_speed",
      "avg_powerslide_duration",
      "avg_speed_percentage",
      "percent_slow_speed",
      "percent_boost_speed",
      "percent_supersonic_speed",
      "percent_ground",
      "percent_low_air",
      "percent_high_air",
    ),
  ),
  positioning: CumulativePositioning,
  demo: Demo,
}) {}

export class TeamGameAverage extends S.Class<TeamGameAverage>(
  "TeamGameAverage",
)({
  core: Core,
  boost: Boost.pipe(
    S.omit(
      "percent_boost_0_25",
      "percent_boost_25_50",
      "percent_boost_50_75",
      "percent_boost_75_100",
    ),
  ),
  movement: Movement.pipe(
    S.omit(
      "avg_speed",
      "avg_powerslide_duration",
      "avg_speed_percentage",
      "percent_slow_speed",
      "percent_boost_speed",
      "percent_supersonic_speed",
      "percent_ground",
      "percent_low_air",
      "percent_high_air",
    ),
  ),
  positioning: CumulativePositioning,
  demo: Demo,
}) {}

export class Team extends S.Class<Team>("Team")({
  name: S.String,
  players: S.Array(TeamPlayer),
  cumulative: TeamCumulative,
  game_average: TeamGameAverage,
}) {}

export class Group extends S.Class<Group>("Group")({
  id: S.String,
  link: S.String,
  name: S.String,
  created: S.String,
  status: S.Literal('ok', 'pending_replays', 'failed_replays'),
  player_identification: S.Literal('by-id', 'by-name'),
  team_identification: S.Literal('by-distinct-players', 'by-player-clusters'),
  shared: S.Boolean,
  creator: Creator,
  players: S.Array(GroupPlayer),
  teams: S.Array(Team),
}) {}
