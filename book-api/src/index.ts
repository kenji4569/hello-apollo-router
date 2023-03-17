import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { gql } from 'graphql-tag';

const typeDefs = gql(`
extend schema
@link(
  url: "https://specs.apollo.dev/federation/v2.3"
  import: ["@key"]
)

type Author @key(fields: "id") {
  id: ID!
}

type Book {
  title: String
  author: Author
}

type Query {
  books: [Book]
}
`);

const books = [
  {
    title: 'The Awakening',
    author: { id: 1 },
  },
  {
    title: 'City of Glass',
    author:  { id: 2 },
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4001 },
});
console.log(`🚀  Server ready at: ${url}`);