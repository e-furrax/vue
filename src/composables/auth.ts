import { me } from '@/apollo/user.gql';
import { reactive, toRefs, watch, ref } from 'vue';
import { postgresClient as client } from '../apollo/client';

const AUTH_KEY = 'furrax_token';
export const AUTH_TOKEN = 'accessToken';

export interface User {
  [AUTH_TOKEN]: string;
  id: string;
  username: string;
  email: string;
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

const setUserData = () => {
  if (token) {
    state.authenticating = true;
    const loading = ref(true);
    const error = ref();
    const result = ref();
    // could fail if you dont go in the then part.
    client.query({ query: me }).then(queryResult => {
      error.value = queryResult.error || queryResult.errors;
      result.value = queryResult.data.me;
      loading.value = queryResult.loading;
    });

    watch([loading], () => {
      if (error.value) {
        window.localStorage.removeItem(AUTH_KEY);
      } else if (result.value) {
        console.log(result);
        state.user = result as any;
      }

      state.authenticating = false;
    });
  }
};

setUserData();

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
