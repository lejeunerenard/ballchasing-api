import { HttpClientResponse } from "@effect/platform";
import { Schema } from "effect";
import { SteamAccount } from "./accounts";

class Rank extends Schema.Class<Rank>("Rank")({
  id: Schema.String,
  tier: Schema.Number,
  division: Schema.Number,
  name: Schema.String,
}) {}

class CameraSettings extends Schema.Class<CameraSettings>("CameraSettings")({
  fov: Schema.Number,
  height: Schema.Number,
  pitch: Schema.Number,
  distance: Schema.Number,
  stiffness: Schema.Number,
  swivel_speed: Schema.Number,
  transition_speed: Schema.Number,
}) {}

const TeamColors = Schema.Literal("blue", "orange");
export const Platform = Schema.compose(
  Schema.Lowercase,
  Schema.Literal("ps4", "epic", "steam", "xbox", "psynet")
);

export class PlatformInfo extends Schema.Class<PlatformInfo>("PlatformInfo")({
  name: Schema.String,
  platform: Platform,
  id: Schema.String,
}) {}

export class StatsCore extends Schema.Class<StatsCore>("StatsCore")({
  shots: Schema.Number,
  shots_against: Schema.Number,
  goals: Schema.Number,
  goals_against: Schema.Number,
  saves: Schema.Number,
  assists: Schema.Number,
  score: Schema.Number,
  mvp: Schema.optional(Schema.Number),
  shooting_percentage: Schema.Number,
}) {}

class PlayerStatsCore extends Schema.Class<PlayerStatsCore>("PlayerStatsCore")({
  ...StatsCore.fields,
  mvp: Schema.Boolean,
}) {}

class StatsBoost extends Schema.Class<StatsBoost>("StatsBoost")({
  bpm: Schema.Number,
  bcpm: Schema.Number,
  avg_amount: Schema.Number,
  amount_collected: Schema.Number,
  amount_stolen: Schema.Number,
  amount_collected_big: Schema.Number,
  amount_stolen_big: Schema.Number,
  amount_collected_small: Schema.Number,
  amount_stolen_small: Schema.Number,
  count_collected_big: Schema.Number,
  count_stolen_big: Schema.Number,
  count_collected_small: Schema.Number,
  count_stolen_small: Schema.Number,
  time_zero_boost: Schema.Number,
  time_full_boost: Schema.Number,
  amount_overfill: Schema.Number,
  amount_overfill_stolen: Schema.Number,
  amount_used_while_supersonic: Schema.Number,
  time_boost_0_25: Schema.Number,
  time_boost_25_50: Schema.Number,
  time_boost_50_75: Schema.Number,
  time_boost_75_100: Schema.Number,
}) {}

class PlayerStatsBoost extends Schema.Class<PlayerStatsBoost>(
  "PlayerStatsBoost"
)({
  ...StatsBoost.fields,
  percent_zero_boost: Schema.optional(Schema.Number),
  percent_full_boost: Schema.optional(Schema.Number),
  percent_boost_0_25: Schema.optional(Schema.Number),
  percent_boost_25_50: Schema.optional(Schema.Number),
  percent_boost_50_75: Schema.optional(Schema.Number),
  percent_boost_75_100: Schema.optional(Schema.Number),
}) {}

class StatsMovement extends Schema.Class<StatsMovement>("StatsMovement")({
  total_distance: Schema.Number,
  time_supersonic_speed: Schema.Number,
  time_boost_speed: Schema.Number,
  time_slow_speed: Schema.Number,
  time_ground: Schema.Number,
  time_low_air: Schema.Number,
  time_high_air: Schema.Number,
  time_powerslide: Schema.Number,
  count_powerslide: Schema.Number,
}) {}

class PlayerStatsMovement extends Schema.Class<PlayerStatsMovement>(
  "PlayerStatsMovement"
)({
  ...StatsMovement.fields,
  avg_speed: Schema.Number,
  avg_powerslide_duration: Schema.Number,
  avg_speed_percentage: Schema.Number,
  percent_slow_speed: Schema.Number,
  percent_boost_speed: Schema.Number,
  percent_supersonic_speed: Schema.Number,
  percent_ground: Schema.Number,
  percent_low_air: Schema.Number,
  percent_high_air: Schema.Number,
}) {}

class StatsPositioning extends Schema.Class<StatsPositioning>(
  "StatsPositioning"
)({
  time_defensive_third: Schema.Number,
  time_neutral_third: Schema.Number,
  time_offensive_third: Schema.Number,
  time_defensive_half: Schema.Number,
  time_offensive_half: Schema.Number,
  time_behind_ball: Schema.Number,
  time_infront_ball: Schema.Number,
}) {}

class PlayerStatsPositioningCommon extends Schema.Class<PlayerStatsPositioningCommon>(
  "PlayerStatsPositioningCommon"
)({
  ...StatsPositioning.fields,
  avg_distance_to_ball: Schema.Number,
  avg_distance_to_ball_possession: Schema.Number,
  avg_distance_to_ball_no_possession: Schema.Number,
  time_most_back: Schema.Number,
  time_most_forward: Schema.Number,
  time_closest_to_ball: Schema.Number,
  time_farthest_from_ball: Schema.Number,
  percent_defensive_third: Schema.Number,
  percent_offensive_third: Schema.Number,
  percent_neutral_third: Schema.Number,
  percent_defensive_half: Schema.Number,
  percent_offensive_half: Schema.Number,
  percent_behind_ball: Schema.Number,
  percent_infront_ball: Schema.Number,
  goals_against_while_last_defender: Schema.optional(Schema.Number),
}) {}

class PlayerStatsPositioning extends Schema.Class<PlayerStatsPositioning>(
  "PlayerStatsPositioning"
)({
  ...PlayerStatsPositioningCommon.fields,
  avg_distance_to_mates: Schema.Number,
  percent_most_back: Schema.Number,
  percent_most_forward: Schema.Number,
  percent_closest_to_ball: Schema.Number,
  percent_farthest_from_ball: Schema.Number,
}) {}

const PlayerTeamStatsPositioning = PlayerStatsPositioningCommon;

class StatsDemo extends Schema.Class<StatsDemo>("StatsDemo")({
  inflicted: Schema.Number,
  taken: Schema.Number,
}) {}

export const GameAveragStats = Schema.Struct({
  core: StatsCore,
  boost: Schema.Struct({
    bpm: Schema.Number,
    bcpm: Schema.Number,
    avg_amount: Schema.Number,
    amount_collected: Schema.Number,
    amount_stolen: Schema.Number,
    amount_collected_big: Schema.Number,
    amount_stolen_big: Schema.Number,
    amount_collected_small: Schema.Number,
    amount_stolen_small: Schema.Number,
    count_collected_big: Schema.Number,
    count_stolen_big: Schema.Number,
    count_collected_small: Schema.Number,
    count_stolen_small: Schema.Number,
    time_zero_boost: Schema.Number,
    percent_zero_boost: Schema.Number,
    time_full_boost: Schema.Number,
    percent_full_boost: Schema.Number,
    amount_overfill: Schema.Number,
    amount_overfill_stolen: Schema.Number,
    amount_used_while_supersonic: Schema.Number,
    time_boost_0_25: Schema.Number,
    time_boost_25_50: Schema.Number,
    time_boost_50_75: Schema.Number,
    time_boost_75_100: Schema.Number,
    percent_boost_0_25: Schema.Number,
    percent_boost_25_50: Schema.Number,
    percent_boost_50_75: Schema.Number,
    percent_boost_75_100: Schema.Number,
  }),
  movement: Schema.Struct({
    avg_speed: Schema.Number,
    total_distance: Schema.Number,
    time_supersonic_speed: Schema.Number,
    time_boost_speed: Schema.Number,
    time_slow_speed: Schema.Number,
    time_ground: Schema.Number,
    time_low_air: Schema.Number,
    time_high_air: Schema.Number,
    time_powerslide: Schema.Number,
    count_powerslide: Schema.Number,
    avg_powerslide_duration: Schema.Number,
    avg_speed_percentage: Schema.Number,
    percent_slow_speed: Schema.Number,
    percent_boost_speed: Schema.Number,
    percent_supersonic_speed: Schema.Number,
    percent_ground: Schema.Number,
    percent_low_air: Schema.Number,
    percent_high_air: Schema.Number,
  }),
  positioning: Schema.Struct({
    time_defensive_third: Schema.Number,
    time_neutral_third: Schema.Number,
    time_offensive_third: Schema.Number,
    time_defensive_half: Schema.Number,
    time_offensive_half: Schema.Number,
    time_behind_ball: Schema.Number,
    time_infront_ball: Schema.Number,
    avg_distance_to_ball: Schema.Number,
    avg_distance_to_ball_possession: Schema.Number,
    avg_distance_to_ball_no_possession: Schema.Number,
    time_most_back: Schema.Number,
    time_most_forward: Schema.Number,
    goals_against_while_last_defender: Schema.Number,
    time_closest_to_ball: Schema.Number,
    time_farthest_from_ball: Schema.Number,
    percent_defensive_third: Schema.Number,
    percent_offensive_third: Schema.Number,
    percent_neutral_third: Schema.Number,
    percent_defensive_half: Schema.Number,
    percent_offensive_half: Schema.Number,
    percent_behind_ball: Schema.Number,
    percent_infront_ball: Schema.Number,
  }),
  demo: Schema.Struct({
    inflicted: Schema.Number,
    taken: Schema.Number,
  }),
});

export const CumulativeStats = Schema.Struct({
  games: Schema.Number,
  wins: Schema.Number,
  win_percentage: Schema.Number,
  play_duration: Schema.Number,
  core: StatsCore,
  boost: Schema.Struct({
    amount_collected: Schema.Number,
    amount_stolen: Schema.Number,
    amount_collected_big: Schema.Number,
    amount_stolen_big: Schema.Number,
    amount_collected_small: Schema.Number,
    amount_stolen_small: Schema.Number,
    count_collected_big: Schema.Number,
    count_stolen_big: Schema.Number,
    count_collected_small: Schema.Number,
    count_stolen_small: Schema.Number,
    time_zero_boost: Schema.Number,
    percentage_zero_boost: Schema.Number,
    time_full_boost: Schema.Number,
    percentage_full_boost: Schema.Number,
    amount_overfill: Schema.Number,
    amount_overfill_stolen: Schema.Number,
    amount_used_while_supersonic: Schema.Number,
    time_boost_0_25: Schema.Number,
    time_boost_25_50: Schema.Number,
    time_boost_50_75: Schema.Number,
    time_boost_75_100: Schema.Number,
  }),
  movement: Schema.Struct({
    total_distance: Schema.Number,
    time_supersonic_speed: Schema.Number,
    time_boost_speed: Schema.Number,
    time_slow_speed: Schema.Number,
    time_ground: Schema.Number,
    time_low_air: Schema.Number,
    time_high_air: Schema.Number,
    time_powerslide: Schema.Number,
    count_powerslide: Schema.Number,
  }),
  positioning: Schema.Struct({
    time_defensive_third: Schema.Number,
    time_neutral_third: Schema.Number,
    time_offensive_third: Schema.Number,
    time_defensive_half: Schema.Number,
    time_offensive_half: Schema.Number,
    time_behind_ball: Schema.Number,
    time_infront_ball: Schema.Number,
    avg_distance_to_ball: Schema.Number,
    avg_distance_to_ball_possession: Schema.Number,
    avg_distance_to_ball_no_possession: Schema.Number,
  }),
  demo: Schema.Struct({
    inflicted: Schema.Number,
    taken: Schema.Number,
  }),
});

export class PlayerStats extends Schema.Class<PlayerStats>("PlayerStats")({
  ...PlatformInfo.fields,
  team: Schema.String,
  game_average: GameAveragStats,
  cumulative: Schema.Struct({
    games: Schema.Number,
    wins: Schema.Number,
    win_percentage: Schema.Number,
    play_duration: Schema.Number,
    core: StatsCore,
    boost: PlayerStatsBoost,
    movement: PlayerStatsMovement,
    positioning: PlayerTeamStatsPositioning,
    demo: StatsDemo,
  }),
}) {}

export class TeamPlayerStats extends Schema.Class<TeamPlayerStats>(
  "TeamPlayerStats"
)({
  core: PlayerStatsCore,
  boost: PlayerStatsBoost,
  movement: PlayerStatsMovement,
  positioning: PlayerStatsPositioning,
  demo: StatsDemo,
}) {}

export class TeamReplayStats extends Schema.Class<TeamReplayStats>(
  "TeamReplayStats"
)({
  color: TeamColors,
  name: Schema.optional(Schema.String),
  players: Schema.Array(
    Schema.Struct({
      start_time: Schema.Number,
      end_time: Schema.Number,
      name: Schema.String,
      mvp: Schema.optional(Schema.Boolean),
      id: Schema.Struct({
        platform: Platform,
        id: Schema.String,
      }),
      rank: Schema.optional(Rank),
      car_id: Schema.Number,
      car_name: Schema.String,
      camera: CameraSettings,
      steering_sensitivity: Schema.Number,
      stats: TeamPlayerStats,
    })
  ),
  stats: Schema.Struct({
    ball: Schema.Struct({
      possession_time: Schema.Number,
      time_in_side: Schema.Number,
    }),
    core: StatsCore,
    boost: StatsBoost,
    movement: StatsMovement,
    positioning: StatsPositioning,
    demo: StatsDemo,
  }),
}) {}

export class TeamStats extends Schema.Class<TeamStats>("TeamStats")({
  name: Schema.String,
  players: Schema.Array(
    Schema.Struct({
      ...PlatformInfo.fields,
      team: Schema.String,
      game_average: Schema.optional(GameAveragStats),
    })
  ),
  game_average: GameAveragStats,
  cumulative: CumulativeStats,
}) {}

export class ReplayCommon extends Schema.Class<ReplayCommon>("ReplayCommon")({
  id: Schema.String,
  link: Schema.String,
  created: Schema.String,
  uploader: SteamAccount,
  status: Schema.Literal("ok", "pending", "failed"),
}) {}

export class ReplayOk extends Schema.Class<ReplayOk>("ReplayOk")({
  ...ReplayCommon.fields,
  status: Schema.Literal("ok"),
  rocket_league_id: Schema.String,
  match_guid: Schema.String,
  title: Schema.String,
  map_code: Schema.String,
  match_type: Schema.Literal("Online", "Private"),
  team_size: Schema.Number,
  playlist_id: Schema.String,
  duration: Schema.Number,
  overtime: Schema.Boolean,
  overtime_seconds: Schema.optional(Schema.Number),
  season: Schema.Number,
  season_type: Schema.String,
  date: Schema.String,
  date_has_timezone: Schema.Boolean,
  visibility: Schema.Literal("public", "unlisted", "private"),
  min_rank: Schema.optional(Rank),
  max_rank: Schema.optional(Rank),
  groups: Schema.optional(
    Schema.Array(
      Schema.Struct({
        id: Schema.String,
        name: Schema.String,
        link: Schema.String,
      })
    )
  ),
  blue: TeamReplayStats,
  orange: TeamReplayStats,
  playlist_name: Schema.String,
  map_name: Schema.String,
  server: Schema.Struct({
    name: Schema.String,
    region: Schema.String,
  }),
}) {}

export class ReplayPending extends Schema.Class<ReplayPending>("ReplayPending")(
  {
    ...ReplayCommon.fields,
    status: Schema.Literal("pending"),
  }
) {}

export class ReplayFailed extends Schema.Class<ReplayFailed>("ReplayFailed")({
  ...ReplayCommon.fields,
  status: Schema.Literal("failed"),
}) {}

export const Replay = Schema.Union(ReplayOk, ReplayPending, ReplayFailed);
export type Replay = typeof Replay.Type;

class ReplaySummaryTeamStats extends Schema.Class<ReplaySummaryTeamStats>(
  "ReplaySummaryTeamStats"
)({
  name: Schema.optional(Schema.String),
  goals: Schema.optional(Schema.Number),
  players: Schema.Array(
    Schema.Struct({
      start_time: Schema.Number,
      end_time: Schema.Number,
      name: Schema.String,
      mvp: Schema.optional(Schema.Boolean),
      id: Schema.Struct({
        platform: Schema.optional(Platform),
        id: Schema.optional(Schema.String),
      }),
      score: Schema.Number,
      rank: Schema.optional(Rank),
    })
  ),
}) {}

export const ReplaySummary = Schema.Struct({
  ...ReplayOk.fields,

  // Added
  date_has_tz: Schema.Boolean,
  replay_title: Schema.String,

  // Overrides
  blue: ReplaySummaryTeamStats,
  orange: ReplaySummaryTeamStats,
}).pipe(
  Schema.omit(
    "date_has_timezone", // renamed to date_has_tz by adding in above
    "status",
    "match_guid",
    "title",
    "match_type",
    "team_size",
    "server"
  )
);
export type ReplaySummary = typeof ReplaySummary.Type;
