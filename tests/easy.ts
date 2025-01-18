import test from 'brittle'
import nock from 'nock'
import { Arbitrary, FastCheck } from 'effect'
import { HttpClientResponse } from '@effect/platform'
import { Replay } from '../src/schema/replay'
import { getClient } from '../src/easy'
import { API_URL } from '../src/constants'

test('easy - getClient', (t) => {
  const client = getClient('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  t.alike(Object.keys(client), ['groups', 'replays'])
})

test('easy - get replay', async (t) => {
  const replayMock = FastCheck.sample(Arbitrary.make(Replay), 1)[0]
  const scope = nock(API_URL)
    .get(/\/api\/replays\/\d+/)
    .times(1)
    .reply(200, replayMock)

  const client = getClient('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

  const replay = await client.replays.get('123')
  t.ok(scope.isDone())
})
