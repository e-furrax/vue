import { me } from '@/apollo/user.gql';
import { provideApolloClient, useQuery, useResult } from '@vue/apollo-composable';
import { reactive, toRefs, watch } from 'vue';
import { postgresClient } from '../apollo/client';

const AUTH_KEY = 'furrax_token';
export const AUTH_TOKEN = 'accessToken';

export interface User {
  [AUTH_TOKEN]: string;
  id: string;
  username: string;
  email: string;
  profileImage: string;
  role: string;
}

interface UserState {
  user?: User;
  authenticating: boolean;
}

interface MeMutationResponse {
  me: Partial<User>;
}

const state = reactive<UserState>({
  user: undefined,
  authenticating: false
});

const token = window.localStorage.getItem(AUTH_KEY);

const setUserData = () => {
  if (token) {
    state.authenticating = true;
    const { result, loading, error } = provideApolloClient(postgresClient)(() =>
      useQuery<MeMutationResponse>(me)
    );

    const userResult = provideApolloClient(postgresClient)(() =>
      useResult(result, null, data => data.me)
    );

    watch([loading], () => {
      const copy = { ...userResult.value };
      if (error.value) {
        window.localStorage.removeItem(AUTH_KEY);
        window.localStorage.removeItem('role');
      } else if (copy) {
        window.localStorage.setItem('role', (copy as any)?.role || '');
        state.user = copy as any;
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
    window.localStorage.removeItem('role');
    return Promise.resolve((state.user = undefined));
  };

  return {
    setUser,
    logout,
    ...toRefs(state)
  };
};
