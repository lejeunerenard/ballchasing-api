import { FetchHttpClient } from '@effect/platform'
import { Effect, Layer } from 'effect'
import { compose } from 'effect/Function'
import {
  client as Client,
  group as Group,
  replay as Replay,
  config as Config
} from './index.js'

export function getClient(authKey: string) {
  const ConfigLive = Layer.succeed(Config.ConfigService, { authKey })
  const ClientServiceLive = Layer.effect(
    Client.ClientService,
    Client.makeClientService
  ).pipe(Layer.provide(FetchHttpClient.layer), Layer.provide(ConfigLive))

  const GroupServiceLive = Layer.effect(
    Group.GroupService,
    Group.makeGroupService
  ).pipe(Layer.provide(ClientServiceLive))

  const ReplayServiceLive = Layer.effect(
    Replay.ReplayService,
    Replay.makeReplayService
  ).pipe(Layer.provide(ClientServiceLive))

  const EndpointsLive = Layer.merge(GroupServiceLive, ReplayServiceLive)

  const program = Effect.gen(function* () {
    const groups = yield* Group.GroupService
    const replays = yield* Replay.ReplayService

    return {
      groups: {
        get: compose(groups.get, Effect.runPromise),
        list: compose(groups.list, Effect.runPromise)
      },
      replays: {
        get: compose(replays.get, Effect.runPromise),
        list: compose(replays.list, Effect.runPromise)
      }
    }
  }).pipe(Effect.scoped, Effect.provide(EndpointsLive))
  return Effect.runSync(program)
}
