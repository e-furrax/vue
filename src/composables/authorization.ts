import { useAuth } from './auth';

export const useAuthorization = (roles: string[]) => {
  const { user } = useAuth();

  const isAuthorized = () => {
    if (user?.value) {
      return user && roles.includes(user.value.role || window.localStorage.getItem('role') || '');
    } else {
      return (
        window.localStorage.getItem('furrax_token') &&
        roles.includes(window.localStorage.getItem('role') || '')
      );
    }
  };

  return {
    isAuthorized
  };
};
