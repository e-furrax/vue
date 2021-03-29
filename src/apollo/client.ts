import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createUploadLink } from 'apollo-upload-client';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: 'http://localhost:3000/graphql',
    headers: { authorization: `Bearer ${localStorage.getItem('furrax_token')}` as string }
  })
});
