import { User } from '@/composables/auth';
import RatingModel from './rating.model';
export default interface UserModel {
  id: number;
  name: string;
  description: string;
  image: string;
  ratings: RatingModel[];
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

export enum ROLES {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  FURRAX = 'FURRAX',
  USER = 'USER',
  BANNED = 'BANNED'
}
