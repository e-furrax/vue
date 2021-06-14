import dotenv from 'dotenv';
dotenv.config();
import { from, ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client/core';
import { createUploadLink } from 'apollo-upload-client';

console.log(process.env);
const terminatingLink = createUploadLink({
  uri: `${process.env.VUE_APP_BACKEND_URL || 'http://localhost:3000'}/graphql`
});

const auth = new ApolloLink((op, fw) => {
  const token = localStorage.getItem('furrax_token');
  op.setContext(({ headers }: Record<string, any>) => ({
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer ${token}` })
    }
  }));
  return fw(op);
});
export const postgresClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([auth, terminatingLink])
});

export const mongoClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([auth, new HttpLink({ uri: 'http://localhost:4000/graphql' })])
});
