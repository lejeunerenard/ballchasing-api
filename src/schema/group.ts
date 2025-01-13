import { HttpClientResponse } from "@effect/platform";
import { Schema } from "effect";
import { SteamAccount } from "./accounts";
import { PlayerStats, TeamStats } from "./replay";

export class GroupInfo extends Schema.Class<GroupInfo>("GroupInfo")({
  id: Schema.String,
  link: Schema.String,
  name: Schema.String,
  created: Schema.String,
  player_identification: Schema.String,
  team_identification: Schema.String,
  shared: Schema.Boolean,
  players: Schema.Array(PlayerStats),
  teams: Schema.Array(TeamStats)
}) {}

export class Group extends Schema.Class<Group>("Group")({
  ...GroupInfo.fields,
  status: Schema.String,
  creator: SteamAccount,
}) {
  static decodeResponse = HttpClientResponse.schemaBodyJson(Group);
}

export class GroupSummary extends Schema.Class<GroupSummary>("GroupSummary")({
  ...GroupInfo.fields,
  direct_replays: Schema.Number,
  indirect_replays: Schema.Number,
  user: SteamAccount,
}) {
  static decodeResponse = HttpClientResponse.schemaBodyJson(GroupSummary);
}
