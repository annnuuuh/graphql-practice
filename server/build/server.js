"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
// Construct a schema, using GraphQL schema language
const schema = (0, graphql_1.buildSchema)(`
  type Query {
    hello: String
  }
`);
// The rootValue provides a resolver function for each API endpoint
const rootValue = {
    hello: () => {
        return "Hello world!";
    },
};
// Run the GraphQL query '{ hello }' and print out the response
(0, graphql_1.graphql)({
    schema,
    source: "{ hello }",
    rootValue,
}).then((response) => {
    console.log(response);
});
