import { HttpClientResponse } from "@effect/platform";
import { Schema } from "effect";

export class SteamAccount extends Schema.Class<SteamAccount>("SteamAccount")({
  steam_id: Schema.String,
  name: Schema.String,
  profile_url: Schema.String,
  avatar: Schema.String,
  avatar_full: Schema.optional(Schema.String),
  avatar_medium: Schema.optional(Schema.String),
}) {
  static decodeResponse = HttpClientResponse.schemaBodyJson(SteamAccount);
}
