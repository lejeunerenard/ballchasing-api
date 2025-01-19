import {
  HttpClientRequest,
  HttpClientResponse,
  HttpClientError,
  HttpBody,
} from "@effect/platform";
import { GenericTag } from "effect/Context";
import { ParseError } from "effect/ParseResult";
import { Effect } from "effect";
import { ClientService } from "./client.js";
import { PaginatedResponse } from "../schema/pagination.js";
import { Group, GroupSummary } from "../schema/group.js";

export type GroupListOpts = {
  name?: string;
  creator?: string;
  group?: string;
  "created-before"?: string;
  "created-after"?: string;
  count?: number;
  "sort-by"?: `created` | `name`;
  "sort-dir"?: string;
};

export interface GroupService {
  readonly list: (
    opts?: GroupListOpts,
  ) => Effect.Effect<
    readonly GroupSummary[],
    HttpClientError.HttpClientError | HttpBody.HttpBodyError | ParseError
  >;
  readonly get: (
    id: string,
  ) => Effect.Effect<
    Group,
    HttpClientError.HttpClientError | HttpBody.HttpBodyError | ParseError
  >;
}

export const GroupService = GenericTag<GroupService>(
  "@lejeunerenard/ballchasing-api/GroupService",
);

export const makeGroupService = Effect.gen(function* () {
  const bcService = yield* ClientService;
  const client = yield* bcService.client;

  const groupEndpoint = "/groups";

  const list = (opts?: GroupListOpts) =>
    Effect.succeed(
      HttpClientRequest.get(groupEndpoint).pipe(
        HttpClientRequest.setUrlParams(opts ?? {}),
      ),
    ).pipe(
      Effect.flatMap(client.execute),
      Effect.flatMap(
        HttpClientResponse.schemaBodyJson(PaginatedResponse(GroupSummary)),
      ),
      Effect.scoped,
    );

  const get = (id: string) =>
    Effect.succeed(HttpClientRequest.get(groupEndpoint + "/" + id)).pipe(
      Effect.flatMap(client.execute),
      Effect.flatMap(HttpClientResponse.schemaBodyJson(Group)),
      Effect.scoped,
    );

  return GroupService.of({ list, get });
});
