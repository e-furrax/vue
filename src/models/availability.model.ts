import UserModel from './user.model';

export default interface AvailabilityModel {
  id: number;
  value: string;
  user: UserModel;
}
