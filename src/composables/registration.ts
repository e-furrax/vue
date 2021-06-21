import { reactive, toRefs } from 'vue';

interface RegistrationState {
  email: string;
}

const state = reactive({ email: '' });

export const useRegisteredInfo = () => {
  const setRegisteredInfo = (newState: RegistrationState) => {
    state.email = newState.email;
  };

  return {
    state: toRefs(state),
    setRegisteredInfo
  };
};
