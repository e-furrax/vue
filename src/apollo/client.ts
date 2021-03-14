import { ApolloClient, InMemoryCache } from '@apollo/client/core';

export const AUTH_KEY = 'furrax_to'
export const apolloClient = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${localStorage.getItem('furrax_token')}` as string
    }
});
  
  