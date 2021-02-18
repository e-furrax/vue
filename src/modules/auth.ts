import { ApolloClient, gql, InMemoryCache } from '@apollo/client/core';
import { provideApolloClient, useQuery } from '@vue/apollo-composable';
import { reactive, toRefs, watch } from 'vue';

const AUTH_KEY = 'furrax_token';
export const AUTH_TOKEN = 'accessToken';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${localStorage.getItem('furrax_token')}` as string
  }
});

provideApolloClient(apolloClient);

interface User {
  [AUTH_TOKEN]: string;
}

interface UserState {
  user?: User;
  authenticating: boolean;
}

const state = reactive<UserState>({
  user: undefined,
  authenticating: false
});

const token = window.localStorage.getItem(AUTH_KEY);

if (token) {
  state.authenticating = true;

  const { result, loading, error } = useQuery(gql`
    query me {
      me
    }
  `);

  watch([loading], () => {
    if (error.value) {
      window.localStorage.removeItem(AUTH_KEY);
    } else if (result) {
      state.user = result as any;
    }

    state.authenticating = false;
  });
}

export const useAuth = () => {
  const setUser = (payload: User) => {
    window.localStorage.setItem(AUTH_KEY, payload[AUTH_TOKEN]);
    state.user = payload;
    console.log(state.user);
  };

  const logout = (): Promise<void> => {
    window.localStorage.removeItem(AUTH_KEY);
    return Promise.resolve((state.user = undefined));
  };

  return {
    setUser,
    logout,
    ...toRefs(state)
  };
};
