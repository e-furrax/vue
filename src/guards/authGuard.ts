import { useAuth } from '@/composables/auth';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  const { user } = useAuth();
  user?.value ? next() : next({ name: 'SignIn' });
};
