import test from "brittle";
import { Schema } from "effect";
import { readFile } from "fs/promises";
import { join } from "path";
import { Group, GroupSummary } from "../../src/schema/group";

test("schema group - parse api", (t) => {
  t.test("single", async (t) => {
    const fixture = await readFile(
      join(__dirname, "../fixtures/group.json"),
      "utf8"
    );
    t.execution(
      Schema.decodeUnknownSync(Group)(JSON.parse(fixture), {
        onExcessProperty: "error",
        errors: "all",
      })
    );
  });

  t.test("summary", { skip: true }, async (t) => {
    const fixture = await readFile(
      join(__dirname, "../fixtures/group-list.json"),
      "utf8"
    );
    const replays = JSON.parse(fixture)
    t.execution(
      Schema.decodeUnknownSync(Schema.Array(GroupSummary))(replays.list, {
        onExcessProperty: "error",
        errors: "all",
      })
    );
  });
});
