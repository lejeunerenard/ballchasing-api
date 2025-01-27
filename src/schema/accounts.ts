import { Schema as S } from "effect";

export const Platform = S.compose(
  S.Lowercase,
  S.Literal("ps4", "epic", "steam", "xbox", "psynet"),
);
export type Platform = typeof Platform.Type

export const Id = S.Struct({
  platform: Platform,
  id: S.String,
});

export class Uploader extends S.Class<Uploader>("Uploader")({
  steam_id: S.String,
  name: S.String,
  profile_url: S.String,
  avatar: S.String,
}) {}

export class Creator extends S.Class<Creator>("Creator")({
  steam_id: S.String,
  name: S.String,
  profile_url: S.String,
  avatar: S.String,
  avatar_full: S.String,
  avatar_medium: S.String,
}) {}
