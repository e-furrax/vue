import { User } from '@/composables/auth';

export interface UserModel {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginMutationResponse {
  login: User;
}

export interface ConfirmUserMutationResponse {
  confirmUser: User;
}
