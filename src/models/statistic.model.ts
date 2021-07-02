import UserModel from './user.model';
import GameModel from './game.model';

export default interface StatisticModel {
  id: number;
  playerId: string;
  rank: string;
  mode: string;
  user: UserModel;
  game: GameModel;
  updatedAt: string;
  createdAt: string;
}
