import { useAuth } from '@/composables/auth';

export default (): boolean => {
  const { user } = useAuth();
  if (user) {
    return true;
  }
  return false;
};
