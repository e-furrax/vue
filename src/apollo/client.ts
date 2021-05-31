import dotenv from 'dotenv';
dotenv.config();
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';

console.log(process.env);
const terminatingLink = createUploadLink({
  uri: `${process.env.VUE_APP_BACKEND_URL || 'http://localhost:3000'}/graphql`
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('furrax_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer ${token}` })
    }
  };
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(terminatingLink as any) as any
});
