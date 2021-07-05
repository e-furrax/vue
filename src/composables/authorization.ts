import { useAuth } from './auth';

export const useAuthorization = (roles: string[]) => {
  const { user } = useAuth();

  const isAuthorized = () => {
    if (user?.value) {
      return user && roles.includes(user.value.role);
    }
  };

  return {
    isAuthorized
  };
};
