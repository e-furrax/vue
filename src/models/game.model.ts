import StatisticModel from './statistic.model';

export default interface GameModel {
  id: number;
  name: string;
  statistics: StatisticModel[];
  selected?: boolean;
}

export interface GameQuery {
  getGames: GameModel[];
}
