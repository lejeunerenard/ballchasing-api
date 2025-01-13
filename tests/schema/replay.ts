import test from "brittle";
import { Schema } from "effect";
import { readFile } from "fs/promises";
import { join } from "path";
import { Replay, ReplaySummary, Platform } from "../../src/schema/replay";

test("schema replay - platform", (t) => {
  t.is(Schema.decodeUnknownSync(Platform)("XBOX"), "xbox");
  t.is(Schema.decodeUnknownSync(Platform)("xbox"), "xbox");
  t.is(Schema.decodeUnknownSync(Platform)("Xbox"), "xbox");
});

test("schema replay - single", async (t) => {
  const fixture = await readFile(
    join(__dirname, "../fixtures/replay.json"),
    "utf8"
  );
  t.execution(
    Schema.decodeUnknownSync(Replay)(JSON.parse(fixture), {
      onExcessProperty: "error",
      errors: "all",
    })
  );
});

test("schema replay - summary", async (t) => {
  const fixture = await readFile(
    join(__dirname, "../fixtures/replay-list.json"),
    "utf8"
  );
  const replays = JSON.parse(fixture);
  t.execution(
    Schema.decodeUnknownSync(Schema.Array(ReplaySummary))(replays.list, {
      onExcessProperty: "error",
      errors: "all",
    })
  );
});
