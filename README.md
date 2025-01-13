# ballchasing.com API Client

A Typescript client library for querying
[ballchasing.com](https://ballchasing.com/) built using
[Effect](https://github.com/Effect-TS/effect).

## Usage

```typescript
import { Client, Group, Replay, Config } from "@lejeunerenard/ballchasing-api";
import { Effect, Layer } from "effect";
import { FetchHttpClient } from "@effect/platform";

const ConfigLive = Layer.succeed(Config.ConfigService, {
  authKey: "YOUR_AUTH_KEY",
});
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

  // Single Group
  const resGroup = yield* groups.get("2v2-w-scott-2023-12-20-kunazcz10y");
  console.log("Single group", resGroup)

  // Group List
  const res = yield* groups.list({
    creator: "76561197987055788", // SteamID
  });
  console.log("Groups", res);

  const meId = "epic:9152ab3ef0bd44b59de47ca639ca7010";

  const replays = yield* Replay.ReplayService;

  // Replay list
  const res2 = yield* replays.list({
    uploader: "me",
    "player-id": [meId],
  });
  console.log("Replays", res2);

  // Single Replay
  const replay = yield* replays.get("bdc27caf-fe82-4708-9f48-4f2561f93313");
  console.log("Replay", replay);
}).pipe(Effect.scoped, Effect.provide(EndpointsLive));

Effect.runPromise(program);
```

## TODO

- [ ] Add automatic rate limiting based on Patreon tier
- [ ] Add parallel request support

### Endpoints

|    | Method   | URL                   | Doc Link                                                                        |
| -- | -------- | ----------------      | -----------------------------------------------------------------------         |
|    | `GET`    | `/`                   | [Ping](https://ballchasing.com/doc/api#ping)                                    |
|    | `POST`   | `/v2/upload`          | [Upload](https://ballchasing.com/doc/api#upload)                                |
| X  | `GET`    | `/replays`            | [List/Filter replays](https://ballchasing.com/doc/api#replays-replays)          |
| X  | `GET`    | `/replays/${id}`      | [Get a specific replay](https://ballchasing.com/doc/api#replays-replay)         |
|    | `DELETE` | `/replays/${id}`      | [Delete a replay](https://ballchasing.com/doc/api#replays-replay-delete)        |
|    | `PATCH`  | `/replays/${id}`      | [Path a replay](https://ballchasing.com/doc/api#replays-replay-patch)           |
|    | `GET`    | `/replays/${id}/file` | [Download replay file](https://ballchasing.com/doc/api#replays-replay-get-1)    |
|    | `POST`   | `/groups`             | [Create a group](https://ballchasing.com/doc/api#replay-groups-groups-post)     |
| X  | `GET`    | `/groups`             | [List/Filter groups](https://ballchasing.com/doc/api#replay-groups-groups-get)  |
| X  | `GET`    | `/groups/${id}`       | [Get a specific group](https://ballchasing.com/doc/api#replay-groups-group-get) |
|    | `DELETE` | `/groups/${id}`       | [Delete a group](https://ballchasing.com/doc/api#replay-groups-group-delete)    |
|    | `PATCH`  | `/groups/${id}`       | [Patch a group](https://ballchasing.com/doc/api#replay-groups-group-patch)      |
|    | `GET`    | `/maps`               | [Maps](https://ballchasing.com/doc/api#misc-maps-get)                           |
