# hello-apollo-router

## 1. Run subgraph servers

### Run book-api

- Setup

```
cd book-api
npm install
npm start
open http://localhost:4001/
```

- Check a query

```
query GetBooks {
  books {
    title
    author {
      id
    }
  }
}
```

### Run author-api

- Setup

```
cd author-api
npm install
npm start
open http://localhost:4002/
```

- Check a query

```
query GetAuthors {
  authors {
    id
    name
  }
}
```

### References

- A simple subgraph
https://www.apollographql.com/docs/apollo-server/getting-started/

- A subgraph for a federated supergraph
https://www.apollographql.com/docs/apollo-server/using-federation/apollo-subgraph-setup/

## 2. Generate a supergraph schema

- Install Rover

```
# For Linux/Mac
curl -sSL https://rover.apollo.dev/nix/latest | sh

# For others: https://www.apollographql.com/docs/rover/getting-started
```

- Generate a supergraph schema by Rover

```
~/.rover/bin/rover supergraph compose --config ./supergraph.yaml --output supergraph-schema.graphql

# Or set PATH to ~/.rover/bin, and run "rover ..."
```

## 3. Run a supergraph server

- Install Apollo Router

```
For Linux, OSX, WSL
curl -sSL https://router.apollo.dev/download/nix/latest | sh

# For others: https://www.apollographql.com/docs/router/quickstart
```

- Run Apollo Router

```
./router --supergraph supergraph-schema.graphql
```

- Check a query

```
query GetBooks {
  books {
    title
    author {
      id
      name
    }
  }
}
```

Now `author.name` can be retrieved with books.