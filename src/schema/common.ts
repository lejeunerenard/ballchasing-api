import { Schema as S } from "effect";

export class Rank extends S.Class<Rank>("Rank")({
  tier: S.Number,
  division: S.Number,
  name: S.String,
  id: S.String,
}) {}

export class Demo extends S.Class<Demo>("Demo")({
  inflicted: S.Number,
  taken: S.Number,
}) {}

export class StatsPositioning extends S.Class<StatsPositioning>(
  "StatsPositioning"
)({
  avg_distance_to_ball: S.Number,
  avg_distance_to_ball_possession: S.Number,
  avg_distance_to_ball_no_possession: S.Number,
  time_most_back: S.Number,
  time_most_forward: S.Number,
  time_closest_to_ball: S.Number,
  time_farthest_from_ball: S.Number,
  percent_defensive_third: S.Number,
  percent_offensive_third: S.Number,
  percent_neutral_third: S.Number,
  percent_defensive_half: S.Number,
  percent_offensive_half: S.Number,
  percent_behind_ball: S.Number,
  percent_infront_ball: S.Number,
  goals_against_while_last_defender: S.optional(S.Number),
  time_defensive_third: S.Number,
  time_neutral_third: S.Number,
  time_offensive_third: S.Number,
  time_defensive_half: S.Number,
  time_offensive_half: S.Number,
  time_behind_ball: S.Number,
  time_infront_ball: S.Number,
  avg_distance_to_mates: S.Number,
  percent_most_back: S.Number,
  percent_most_forward: S.Number,
  percent_closest_to_ball: S.Number,
  percent_farthest_from_ball: S.Number,
}) {}

export class Boost extends S.Class<Boost>("Boost")({
  bpm: S.Number,
  bcpm: S.Number,
  avg_amount: S.Number,
  amount_collected: S.Number,
  amount_stolen: S.Number,
  amount_collected_big: S.Number,
  amount_stolen_big: S.Number,
  amount_collected_small: S.Number,
  amount_stolen_small: S.Number,
  count_collected_big: S.Number,
  count_stolen_big: S.Number,
  count_collected_small: S.Number,
  count_stolen_small: S.Number,
  time_zero_boost: S.Number,
  percent_zero_boost: S.Number,
  time_full_boost: S.Number,
  percent_full_boost: S.Number,
  amount_overfill: S.Number,
  amount_overfill_stolen: S.Number,
  amount_used_while_supersonic: S.Number,
  time_boost_0_25: S.Number,
  time_boost_25_50: S.Number,
  time_boost_50_75: S.Number,
  time_boost_75_100: S.Number,
  percent_boost_0_25: S.Number,
  percent_boost_25_50: S.Number,
  percent_boost_50_75: S.Number,
  percent_boost_75_100: S.Number,
}) {}

export class Core extends S.Class<Core>("Core")({
  shots: S.Number,
  shots_against: S.Number,
  goals: S.Number,
  goals_against: S.Number,
  saves: S.Number,
  assists: S.Number,
  score: S.Number,
  mvp: S.optional(S.Boolean),
  shooting_percentage: S.Number,
}) {}

export class Movement extends S.Class<Movement>("Movement")({
  total_distance: S.Number,
  time_supersonic_speed: S.Number,
  time_boost_speed: S.Number,
  time_slow_speed: S.Number,
  time_ground: S.Number,
  time_low_air: S.Number,
  time_high_air: S.Number,
  time_powerslide: S.Number,
  count_powerslide: S.Number,
  avg_speed: S.Number,
  avg_powerslide_duration: S.Number,
  avg_speed_percentage: S.Number,
  percent_slow_speed: S.Number,
  percent_boost_speed: S.Number,
  percent_supersonic_speed: S.Number,
  percent_ground: S.Number,
  percent_low_air: S.Number,
  percent_high_air: S.Number,
}) {}

export class StatsClass extends S.Class<StatsClass>("StatsClass")({
  core: Core,
  boost: Boost,
  movement: Movement,
  positioning: StatsPositioning,
  demo: Demo,
}) {}
