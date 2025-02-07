import test from 'brittle'
import { Schema } from 'effect'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { Group, GroupSummary } from '../../src/schema/group'

const DIRNAME = new URL('.', import.meta.url).pathname

test('schema group - parse api', (t) => {
  t.test('single', async (t) => {
    t.test('basic', async (t) => {
      const fixture = await readFile(
        join(DIRNAME, '../fixtures/group.json'),
        'utf8'
      )
      t.execution(
        Schema.decodeUnknownSync(Group)(JSON.parse(fixture), {
          onExcessProperty: 'error',
          errors: 'all'
        })
      )
    })

    t.test('group w/o players', async (t) => {
      const fixture = await readFile(
        join(DIRNAME, '../fixtures/group-wo-players.json'),
        'utf8'
      )
      t.execution(
        Schema.decodeUnknownSync(Group)(JSON.parse(fixture), {
          onExcessProperty: 'error',
          errors: 'all'
        })
      )

      const group = Schema.decodeUnknownSync(Group)(JSON.parse(fixture))
      t.alike(group.players, [], 'defaults to empty array')
      t.alike(group.teams, [], 'defaults to empty array')
    })
  })

  t.test('summary', { skip: true }, async (t) => {
    const fixture = await readFile(
      join(DIRNAME, '../fixtures/group-list.json'),
      'utf8'
    )
    const replays = JSON.parse(fixture)
    t.execution(
      Schema.decodeUnknownSync(Schema.Array(GroupSummary))(replays.list, {
        onExcessProperty: 'error',
        errors: 'all'
      })
    )
  })
})
