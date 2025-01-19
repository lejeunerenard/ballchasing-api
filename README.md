# ballchasing.com API Client

A Typescript client library for querying
[ballchasing.com](https://ballchasing.com/) built using
[Effect](https://github.com/Effect-TS/effect).

## Usage

```typescript
import { getClient } from "@lejeunerenard/ballchasing-api/easy";

const client = await getClient("YOUR_AUTH_KEY");

// Single Group
const group = await client.groups.get("2v2-w-scott-2023-12-20-kunazcz10y");
console.log("Single group", group);

// Group List
const groups = await client.groups.list({
  creator: "76561197987055788", // SteamID
});
console.log("Groups", groups);

// Replay list
const meId = "epic:9152ab3ef0bd44b59de47ca639ca7010";
const replays = await client.replays.list({
  uploader: "me",
  "player-id": [meId],
});
console.log("Replays", replays);

// Single Replay
const replay = await client.replays.get("bdc27caf-fe82-4708-9f48-4f2561f93313");
console.log("Replay", replay);
```

## TODO

- [ ] Add automatic rate limiting based on Patreon tier
- [ ] Add parallel request support

### Endpoints

|     | Method   | URL                   | Doc Link                                                                        |
| --- | -------- | --------------------- | ------------------------------------------------------------------------------- |
|     | `GET`    | `/`                   | [Ping](https://ballchasing.com/doc/api#ping)                                    |
|     | `POST`   | `/v2/upload`          | [Upload](https://ballchasing.com/doc/api#upload)                                |
| X   | `GET`    | `/replays`            | [List/Filter replays](https://ballchasing.com/doc/api#replays-replays)          |
| X   | `GET`    | `/replays/${id}`      | [Get a specific replay](https://ballchasing.com/doc/api#replays-replay)         |
|     | `DELETE` | `/replays/${id}`      | [Delete a replay](https://ballchasing.com/doc/api#replays-replay-delete)        |
|     | `PATCH`  | `/replays/${id}`      | [Path a replay](https://ballchasing.com/doc/api#replays-replay-patch)           |
|     | `GET`    | `/replays/${id}/file` | [Download replay file](https://ballchasing.com/doc/api#replays-replay-get-1)    |
|     | `POST`   | `/groups`             | [Create a group](https://ballchasing.com/doc/api#replay-groups-groups-post)     |
| X   | `GET`    | `/groups`             | [List/Filter groups](https://ballchasing.com/doc/api#replay-groups-groups-get)  |
| X   | `GET`    | `/groups/${id}`       | [Get a specific group](https://ballchasing.com/doc/api#replay-groups-group-get) |
|     | `DELETE` | `/groups/${id}`       | [Delete a group](https://ballchasing.com/doc/api#replay-groups-group-delete)    |
|     | `PATCH`  | `/groups/${id}`       | [Patch a group](https://ballchasing.com/doc/api#replay-groups-group-patch)      |
|     | `GET`    | `/maps`               | [Maps](https://ballchasing.com/doc/api#misc-maps-get)                           |
