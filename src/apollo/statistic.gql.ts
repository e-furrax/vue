import { gql } from '@apollo/client/core';

export const upsertStatisticMutation = gql`
  mutation upsertStatistic($data: StatisticInput!) {
    upsertStatistic(data: $data) {
      id
      mode
      game {
        id
      }
      playerId
    }
  }
`;

export const deleteStatisticMutation = gql`
  mutation deleteStatistic($id: Float!) {
    deleteStatistic(id: $id)
  }
`;
export const getLolStatsMutation = gql`
  query getLolStats($username: String!) {
    getLolStats(username: $username) {
      tier
      rank
      summonerId
      summonerName
      queueType
    }
  }
`;
