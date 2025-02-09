import { HttpClientResponse, HttpClientError } from '@effect/platform'
import { Console, Effect, Scope } from 'effect'
import { join } from 'path'
import { FileSystem } from '@effect/platform'

export const resToFile =
  (dir: string) =>
  (
    req: Effect.Effect<
      HttpClientResponse.HttpClientResponse,
      HttpClientError.HttpClientError,
      Scope.Scope
    >
  ) =>
    Effect.tap(req, (res: HttpClientResponse.HttpClientResponse) =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem
        const json = yield* res.json
        const filename = join(
          dir,
          (Math.random() * 64_000_000_000).toString(16) + '.json'
        )
        yield* Console.log('filename', filename)
        yield* fs.writeFileString(filename, JSON.stringify(json))
      })
    )
