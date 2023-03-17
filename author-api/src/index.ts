import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';

const authorById = {
  1: { id: 1, 'name': 'Kate Chopin' },
  2: { id: 2, 'name': 'Paul Auster' },
}

const fetchAuthorById = (id) => {
  return authorById[id];
}

const typeDefs = gql`
extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key"])

type Query {
  authors: [Author]
}

type Author @key(fields: "id") {
  id: ID!
  name: String
}
`;

const resolvers = {
  Query: {
    authors() {
      return Object.values(authorById);
    },
  },
  Author: {
    __resolveReference(author) {
      // TODO: Use dataloader for the N+1 query problem
      // https://www.apollographql.com/docs/apollo-server/data/fetching-data/#batching-and-caching
      return fetchAuthorById(author.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4002 },
});
console.log(`🚀  Server ready at ${url}`);