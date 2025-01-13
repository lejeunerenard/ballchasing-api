import { Schema as S } from "effect";
import {
  Rank,
  StatsClass,
  Demo,
  StatsPositioning,
  Core,
  Boost,
  Movement,
} from "./common";
import { Uploader, Creator } from "./accounts";

export class TeamPlayer extends S.Class<TeamPlayer>("TeamPlayer")({
  platform: S.String,
  id: S.String,
  name: S.String,
  team: S.String,
}) {}

export class CumulativePositioning extends S.Class<CumulativePositioning>(
  "CumulativePositioning"
)({
  time_defensive_third: S.Number,
  time_neutral_third: S.Number,
  time_offensive_third: S.Number,
  time_defensive_half: S.Number,
  time_offensive_half: S.Number,
  time_behind_ball: S.Number,
  time_infront_ball: S.Number,
  avg_distance_to_ball: S.Number,
  avg_distance_to_ball_possession: S.Number,
  avg_distance_to_ball_no_possession: S.Number,
}) {}

export class CoreSummary extends S.Class<CoreSummary>("CoreSummary")({
  ...Core.fields,
  mvp: S.optional(S.Number),
}) {}

export class StatsClassSummary extends S.Class<StatsClassSummary>(
  "StatsClassSummary"
)({
  ...StatsClass.fields,
  core: CoreSummary,
  positioning: StatsPositioning.pipe(
    S.omit(
      "avg_distance_to_mates",
      "percent_most_back",
      "percent_most_forward",
      "percent_closest_to_ball",
      "percent_farthest_from_ball"
    )
  ),
}) {}

export class GroupSummary extends S.Class<GroupSummary>("GroupSummary")({
  id: S.String,
  link: S.String,
  name: S.String,
  created: S.String,
  player_identification: S.String,
  team_identification: S.String,
  direct_replays: S.Number,
  indirect_replays: S.Number,
  shared: S.Boolean,
  user: Uploader,
}) {}

export class GroupStub extends S.Class<GroupStub>("GroupStub")({
  id: S.String,
  name: S.String,
  link: S.String,
}) {}

export class PlayerCumulative extends S.Class<PlayerCumulative>(
  "PlayerCumulative"
)({
  games: S.Number,
  wins: S.Number,
  win_percentage: S.Number,
  play_duration: S.Number,
  core: CoreSummary,
  boost: Boost,
  movement: Movement,
  positioning: StatsPositioning.pipe(
    S.omit(
      "avg_distance_to_mates",
      "percent_most_back",
      "percent_most_forward",
      "percent_closest_to_ball",
      "percent_farthest_from_ball"
    )
  ),
  demo: Demo,
}) {}

export class GroupPlayer extends S.Class<GroupPlayer>("GroupPlayer")({
  platform: S.String,
  id: S.String,
  name: S.String,
  team: S.String,
  cumulative: PlayerCumulative,
  game_average: StatsClassSummary,
}) {}

export class TeamCumulative extends S.Class<TeamCumulative>("TeamCumulative")({
  games: S.Number,
  wins: S.Number,
  win_percentage: S.Number,
  play_duration: S.Number,
  core: Core,
  boost: Boost.pipe(
    S.omit(
      "bpm",
      "bcpm",
      "avg_amount",
      "percent_boost_0_25",
      "percent_boost_25_50",
      "percent_boost_50_75",
      "percent_boost_75_100"
    )
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
      "percent_high_air"
    )
  ),
  positioning: CumulativePositioning,
  demo: Demo,
}) {}

export class TeamGameAverage extends S.Class<TeamGameAverage>(
  "TeamGameAverage"
)({
  core: Core,
  boost: Boost.pipe(
    S.omit(
      "percent_boost_0_25",
      "percent_boost_25_50",
      "percent_boost_50_75",
      "percent_boost_75_100"
    )
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
      "percent_high_air"
    )
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
  status: S.String,
  player_identification: S.String,
  team_identification: S.String,
  shared: S.Boolean,
  creator: Creator,
  players: S.Array(GroupPlayer),
  teams: S.Array(Team),
}) {}
