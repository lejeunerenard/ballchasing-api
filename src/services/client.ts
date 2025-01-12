import { HttpClient, HttpClientRequest } from "@effect/platform";
import * as Context from "effect/Context";
import { Effect } from "effect";
import { ConfigService, makeConfigService } from "./config";
import { API_URL } from "../constants";

export class ClientService extends Context.Tag(
  "@lejeunerenard/ballchasing-api/ClientService"
)<ClientService, { readonly client: Effect.Effect<HttpClient.HttpClient> }>() {}

export const makeClientService = Effect.gen(function* () {
  const defaultClient = yield* HttpClient.HttpClient;

  const authKey = (yield* ConfigService).authKey;

  const client = defaultClient.pipe(
    HttpClient.filterStatusOk,
    HttpClient.mapRequest(HttpClientRequest.prependUrl(API_URL)),
    HttpClient.mapRequest(
      HttpClientRequest.setHeader("Authorization", authKey)
    ),
    Effect.succeed
  );

  return ClientService.of({ client });
});
