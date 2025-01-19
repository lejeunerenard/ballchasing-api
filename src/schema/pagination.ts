import * as ParseResult from "effect/ParseResult";
import { Schema } from "effect";

// TODO This is likely incorrect because it just strips out the list but we want the `next` & `count` to correctly paginate when necessary
export const PaginatedResponse = <A, I, R>(
  item: Schema.Schema<A, I, R>,
): Schema.Schema<ReadonlyArray<A>, ReadonlyArray<I>, R> =>
  Schema.declare(
    [item],
    {
      decode: (item) => (input, parseOptions, ast) => {
        if (
          typeof input === "object" &&
          input !== null &&
          "list" in input &&
          input.list instanceof Array
        ) {
          const elements = ParseResult.decodeUnknown(Schema.Array(item))(
            input.list,
            parseOptions,
          );
          return elements;
        }

        return ParseResult.fail(new ParseResult.Type(ast, input));
      },
      encode: (item) => (input, parseOptions, ast) => {
        if (input instanceof Array) {
          const elements = ParseResult.encodeUnknown(Schema.Array(item))(
            input,
            parseOptions,
          );
          return elements;
        }

        return ParseResult.fail(new ParseResult.Type(ast, input));
      },
    },
    {
      description: `PaginatedResponse<${Schema.format(item)}`,
    },
  );
