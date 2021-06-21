import RatingModel from './rating.model';

export default interface UserModel {
  id: number;
  name: string;
  description: string;
  image: string;
  ratings: RatingModel[];
}
