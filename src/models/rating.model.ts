import UserModel from './user.model';

export default interface RatingModel {
  id: number;
  rating: number;
  comments: string;
  fromUser: UserModel;
  toUser: UserModel;
  createdAt: string;
}
