import { Schema as S } from "effect";

export class Rank extends S.Class<Rank>("Rank")({
  tier: S.Finite,
  division: S.Finite,
  name: S.String,
  id: S.String,
}) {}

export class Demo extends S.Class<Demo>("Demo")({
  inflicted: S.Finite,
  taken: S.Finite,
}) {}

export class StatsPositioning extends S.Class<StatsPositioning>(
  "StatsPositioning"
)({
  avg_distance_to_ball: S.Finite,
  avg_distance_to_ball_possession: S.Finite,
  avg_distance_to_ball_no_possession: S.Finite,
  time_most_back: S.Finite,
  time_most_forward: S.Finite,
  time_closest_to_ball: S.Finite,
  time_farthest_from_ball: S.Finite,
  percent_defensive_third: S.Finite,
  percent_offensive_third: S.Finite,
  percent_neutral_third: S.Finite,
  percent_defensive_half: S.Finite,
  percent_offensive_half: S.Finite,
  percent_behind_ball: S.Finite,
  percent_infront_ball: S.Finite,
  goals_against_while_last_defender: S.optional(S.Finite),
  time_defensive_third: S.Finite,
  time_neutral_third: S.Finite,
  time_offensive_third: S.Finite,
  time_defensive_half: S.Finite,
  time_offensive_half: S.Finite,
  time_behind_ball: S.Finite,
  time_infront_ball: S.Finite,
  avg_distance_to_mates: S.Finite,
  percent_most_back: S.Finite,
  percent_most_forward: S.Finite,
  percent_closest_to_ball: S.Finite,
  percent_farthest_from_ball: S.Finite,
}) {}

export class Boost extends S.Class<Boost>("Boost")({
  bpm: S.Finite,
  bcpm: S.Finite,
  avg_amount: S.Finite,
  amount_collected: S.Finite,
  amount_stolen: S.Finite,
  amount_collected_big: S.Finite,
  amount_stolen_big: S.Finite,
  amount_collected_small: S.Finite,
  amount_stolen_small: S.Finite,
  count_collected_big: S.Finite,
  count_stolen_big: S.Finite,
  count_collected_small: S.Finite,
  count_stolen_small: S.Finite,
  time_zero_boost: S.Finite,
  percent_zero_boost: S.Finite,
  time_full_boost: S.Finite,
  percent_full_boost: S.Finite,
  amount_overfill: S.Finite,
  amount_overfill_stolen: S.Finite,
  amount_used_while_supersonic: S.Finite,
  time_boost_0_25: S.Finite,
  time_boost_25_50: S.Finite,
  time_boost_50_75: S.Finite,
  time_boost_75_100: S.Finite,
  percent_boost_0_25: S.Finite,
  percent_boost_25_50: S.Finite,
  percent_boost_50_75: S.Finite,
  percent_boost_75_100: S.Finite,
}) {}

export class Core extends S.Class<Core>("Core")({
  shots: S.Finite,
  shots_against: S.Finite,
  goals: S.Finite,
  goals_against: S.Finite,
  saves: S.Finite,
  assists: S.Finite,
  score: S.Finite,
  mvp: S.optional(S.Boolean),
  shooting_percentage: S.Finite,
}) {}

export class Movement extends S.Class<Movement>("Movement")({
  total_distance: S.Finite,
  time_supersonic_speed: S.Finite,
  time_boost_speed: S.Finite,
  time_slow_speed: S.Finite,
  time_ground: S.Finite,
  time_low_air: S.Finite,
  time_high_air: S.Finite,
  time_powerslide: S.Finite,
  count_powerslide: S.Finite,
  avg_speed: S.Finite,
  avg_powerslide_duration: S.Finite,
  avg_speed_percentage: S.Finite,
  percent_slow_speed: S.Finite,
  percent_boost_speed: S.Finite,
  percent_supersonic_speed: S.Finite,
  percent_ground: S.Finite,
  percent_low_air: S.Finite,
  percent_high_air: S.Finite,
}) {}

export class StatsClass extends S.Class<StatsClass>("StatsClass")({
  core: Core,
  boost: Boost,
  movement: Movement,
  positioning: StatsPositioning,
  demo: Demo,
}) {}
