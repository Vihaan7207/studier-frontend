import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";

const link = new HttpLink({
    uri: 'http://localhost:3452/graphql'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    link,
    cache
});

export default client;