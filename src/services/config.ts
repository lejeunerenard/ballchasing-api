import * as Context from "effect/Context";
import { Effect } from "effect";

export class ConfigService extends Context.Tag(
  "@lejeunerenard/ballchasing-api/ConfigService"
)<ConfigService, { readonly authKey: string }>() {}

export const makeConfigService = (authKey: string) =>
  Effect.gen(function* () {
    return ConfigService.of({ authKey });
  });
