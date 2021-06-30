import dotenv from 'dotenv';
dotenv.config();
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split,
  from
} from '@apollo/client/core';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const terminatingLink = createUploadLink({
  uri: `${process.env.VUE_APP_BACKEND_URL || 'http://localhost:3000'}/graphql`
});

let token = localStorage.getItem('furrax_token');

const wsLink = new WebSocketLink({
  uri: process.env.VUE_APP_BACKEND_URL_WS || 'ws://localhost:3000/subscriptions',
  options: {
    reconnect: true,
    connectionParams: () => {
      return { authorization: `Bearer ${token}` };
    }
  }
});

const auth = new ApolloLink((op, fw) => {
  token = localStorage.getItem('furrax_token');
  op.setContext(({ headers }: Record<string, any>) => ({
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer ${token}` })
    }
  }));
  return fw(op);
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  from([auth, terminatingLink])
);

export const postgresClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

export const mongoClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    auth,
    new HttpLink({
      uri: `${process.env.VUE_APP_MONGO_BACKEND_URL || 'http://localhost:4000'}/graphql`
    })
  ])
});
