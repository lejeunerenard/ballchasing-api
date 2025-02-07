import {
  HttpClientRequest,
  HttpClientResponse,
  HttpClientError,
  HttpBody
} from '@effect/platform'
import { GenericTag } from 'effect/Context'
import { ParseError } from 'effect/ParseResult'
import { Effect } from 'effect'
import { ClientService } from './client.js'
import { PaginatedResponse } from '../schema/pagination.js'
import { Replay, ReplaySummary } from '../schema/replay.js'

type Playlist =
  | 'unranked-duels'
  | 'unranked-doubles'
  | 'unranked-standard'
  | 'unranked-chaos'
  | 'private'
  | 'season'
  | 'offline'
  | 'ranked-duels'
  | 'ranked-doubles'
  | 'ranked-solo-standard'
  | 'ranked-standard'
  | 'snowday'
  | 'rocketlabs'
  | 'hoops'
  | 'rumble'
  | 'tournament'
  | 'dropshot'
  | 'ranked-hoops'
  | 'ranked-rumble'
  | 'ranked-dropshot'
  | 'ranked-snowday'
  | 'dropshot-rumble'
  | 'heatseeker'

type MatchResult = 'win' | 'loss'

export type ReplayListOpts = Partial<{
  'player-name': string[]
  'player-id': string[]
  title: string
  playlist: Playlist[]
  season: string
  'match-result': MatchResult
  pro: boolean
  uploader: string
  group: string
  map: string
  'created-before': string
  'created-after': string
  count: number
}>

export interface ReplayService {
  readonly list: (
    opts: ReplayListOpts
  ) => Effect.Effect<
    readonly ReplaySummary[],
    HttpClientError.HttpClientError | HttpBody.HttpBodyError | ParseError
  >
  readonly get: (
    id: string
  ) => Effect.Effect<
    Replay,
    HttpClientError.HttpClientError | HttpBody.HttpBodyError | ParseError
  >
}

export const ReplayService = GenericTag<ReplayService>(
  '@lejeunerenard/ballchasing-api/ReplayService'
)

export const makeReplayService = Effect.gen(function* () {
  const bcService = yield* ClientService
  const client = yield* bcService.client

  const endpoint = '/replays'

  const list = (opts: ReplayListOpts = {}) =>
    Effect.succeed(
      HttpClientRequest.get(endpoint).pipe(HttpClientRequest.setUrlParams(opts))
    ).pipe(
      Effect.flatMap(client.execute),
      Effect.flatMap(
        HttpClientResponse.schemaBodyJson(PaginatedResponse(ReplaySummary))
      ),
      Effect.scoped
    )

  const get = (id: string) =>
    Effect.succeed(HttpClientRequest.get(endpoint + '/' + id)).pipe(
      Effect.flatMap(client.execute),
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Replay)),
      Effect.scoped
    )

  return ReplayService.of({ list, get })
})
