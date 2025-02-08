import test from 'brittle'
import { Schema } from 'effect'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { Platform } from '../../src/schema/accounts.js'
import {
  Replay,
  ReplaySummary,
  ReplaySummaryTeamStats
} from '../../src/schema/replay.js'

const DIRNAME = new URL('.', import.meta.url).pathname

test('schema replay - platform', (t) => {
  t.is(Schema.decodeUnknownSync(Platform)('XBOX'), 'xbox')
  t.is(Schema.decodeUnknownSync(Platform)('xbox'), 'xbox')
  t.is(Schema.decodeUnknownSync(Platform)('Xbox'), 'xbox')
})

test('schema replay - single', async (t) => {
  const fixture = await readFile(
    join(DIRNAME, '../fixtures/replay.json'),
    'utf8'
  )
  t.execution(
    Schema.decodeUnknownSync(Replay)(JSON.parse(fixture), {
      onExcessProperty: 'error',
      errors: 'all'
    })
  )
})

test('schema replay - summary', async (t) => {
  const fixture = await readFile(
    join(DIRNAME, '../fixtures/replay-list.json'),
    'utf8'
  )
  const replays = JSON.parse(fixture)
  t.execution(
    Schema.decodeUnknownSync(Schema.Array(ReplaySummary))(replays.list, {
      onExcessProperty: 'error',
      errors: 'all'
    })
  )
})

test('schema replay summary - supports AI bots as players', async (t) => {
  const fixture = await readFile(
    join(DIRNAME, '../fixtures/replay-summary-w-bot.json'),
    'utf8'
  )

  const replay = JSON.parse(fixture)
  t.execution(
    Schema.decodeUnknownSync(ReplaySummary)(replay, {
      onExcessProperty: 'error',
      errors: 'all'
    })
  )
  const replaySummary = Schema.decodeUnknownSync(ReplaySummary)(replay)
  t.ok('players' in replaySummary.orange, 'has orange team players')
  if (replaySummary.orange.players) {
    const bot = replaySummary.orange.players[2]
    t.is(bot.name, 'Caveman')
    t.alike(bot.id, {})
  } else {
    t.fail('No orange players in replay-summary-w-bot.json fixture')
  }
})

test('schema replay summary - training replay', async (t) => {
  const fixture = await readFile(
    join(DIRNAME, '../fixtures/replay-summary-training.json'),
    'utf8'
  )

  const schema = ReplaySummary
  const replay = JSON.parse(fixture)
  t.execution(
    Schema.decodeUnknownSync(schema)(replay, {
      onExcessProperty: 'error',
      errors: 'all'
    })
  )
  const replaySummary = Schema.decodeUnknownSync(schema)(replay)
  t.not('playlist_id' in replaySummary, 'no playlist_id')
  t.not('playlist_name' in replaySummary, 'no playlist_name')
  t.not('players' in replaySummary.orange, 'no players in orange team')
  t.alike(
    replaySummary.orange,
    new ReplaySummaryTeamStats(),
    'orange team is blank'
  )
  t.alike(
    replaySummary.blue,
    new ReplaySummaryTeamStats({ goals: 4 }),
    'blue team has only goals'
  )
})

test('schema replay - supports training replays', async (t) => {
  const fixture = await readFile(
    join(DIRNAME, '../fixtures/replay-training.json'),
    'utf8'
  )

  const replay = JSON.parse(fixture)
  const schema = Replay
  t.execution(
    Schema.decodeUnknownSync(schema)(replay, {
      onExcessProperty: 'error',
      errors: 'all'
    })
  )
  const replayParsed = Schema.decodeUnknownSync(schema)(replay)
  if (replayParsed.status !== 'ok') {
    t.fail('replay-training.json was not a ReplayOk')
    return
  }

  t.is(replayParsed.match_type, 'Training', 'has match_type = Training')
  t.not('playlist_id' in replayParsed, 'doesnt have a playlist_id')
  t.not('playlist_name' in replayParsed, 'doesnt have a playlist_name')
  t.is(replayParsed.overtime_seconds, 290, 'has overtime_seconds')
})
