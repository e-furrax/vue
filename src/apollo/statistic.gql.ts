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
