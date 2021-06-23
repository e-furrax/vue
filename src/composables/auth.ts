import { me } from '@/apollo/user.gql';
import { provideApolloClient, useQuery } from '@vue/apollo-composable';
import { reactive, toRefs, watch } from 'vue';
import { postgresClient } from '../apollo/client';

const AUTH_KEY = 'furrax_token';
export const AUTH_TOKEN = 'accessToken';

provideApolloClient(postgresClient);
export interface User {
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
  const { result, loading, error } = useQuery(me);

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
