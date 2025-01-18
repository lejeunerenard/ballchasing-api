import { FetchHttpClient } from "@effect/platform";
import { Effect, Layer, pipe } from "effect";
import { Client, Group, Replay, Config } from "./index";

export function getClient (authKey: string) {
  const ConfigLive = Layer.succeed(Config.ConfigService, { authKey });
  const ClientServiceLive = Layer.effect(
    Client.ClientService,
    Client.makeClientService
  ).pipe(Layer.provide(FetchHttpClient.layer), Layer.provide(ConfigLive));

  const GroupServiceLive = Layer.effect(
    Group.GroupService,
    Group.makeGroupService
  ).pipe(Layer.provide(ClientServiceLive));

  const ReplayServiceLive = Layer.effect(
    Replay.ReplayService,
    Replay.makeReplayService
  ).pipe(Layer.provide(ClientServiceLive));

  const EndpointsLive = Layer.merge(GroupServiceLive, ReplayServiceLive);

  const program = Effect.gen(function* () {
    const groups = yield* Group.GroupService;
    const replays = yield* Replay.ReplayService;

    return {
      groups: {
        get: (x: string) => pipe(x, groups.get, Effect.runPromise),
        list: (x: Group.GroupListOpts) => pipe(x, groups.list, Effect.runPromise)
      },
      replays: {
        get: (x: string) => pipe(x, replays.get, Effect.runPromise),
        list: (x: Replay.ReplayListOpts) => pipe(x, replays.list, Effect.runPromise)
      }
    }
  }).pipe(Effect.scoped, Effect.provide(EndpointsLive));
  return Effect.runSync(program);
}
