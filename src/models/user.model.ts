import RatingModel from './ratings.model';
import MeetModel from './meet.model';

export default interface UserModel {
    '@id': string;
    '@type': string;
    id: number;
    username: string;
    email: string;
    roles: string[];
    ratings: RatingModel[];
    meetings: MeetModel[];
  };
  