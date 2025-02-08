// @ts-expect-error: Can only be default imported
import test from 'brittle'
// @ts-expect-error: Can only be default imported
import nock from 'nock'
import { Arbitrary, FastCheck } from 'effect'
import { Replay, ReplaySummary } from '../src/schema/replay'
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
  t.is(JSON.stringify(replay), JSON.stringify(replayMock))
})

test('easy - list replay', async (t) => {
  const replayMocks = FastCheck.sample(Arbitrary.make(ReplaySummary), 4)
  const scope = nock(API_URL)
    .get('/replays')
    .query({ uploader: 'me' })
    .times(1)
    .reply(200, { list: replayMocks })

  const client = getClient('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

  const replays = await client.replays.list({
    uploader: 'me'
  })
  t.ok(scope.isDone())
  for (let i = 0; i < replays.length; i++) {
    const replay = replays[i]
    const replayMock = replayMocks[i]
    t.is(JSON.stringify(replay), JSON.stringify(replayMock))
  }
})

test('easy - list replay - no args required', async (t) => {
  const replayMocks = FastCheck.sample(Arbitrary.make(ReplaySummary), 4)
  const scope = nock(API_URL)
    .get('/replays')
    .times(1)
    .reply(200, { list: replayMocks })

  const client = getClient('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

  const replays = await client.replays.list()
  t.ok(scope.isDone())
  for (let i = 0; i < replays.length; i++) {
    const replay = replays[i]
    const replayMock = replayMocks[i]
    t.is(JSON.stringify(replay), JSON.stringify(replayMock))
  }
})
