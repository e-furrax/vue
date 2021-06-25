import { gql } from '@apollo/client/core';

export const getGames = gql`
  {
    getGames {
      id
      name
    }
  }
`;

export const createGameMutation = gql`
  mutation createGame($data: InsertGameInput!) {
    createGame(data: $data) {
      id
      name
    }
  }
`;

export const deleteGameMutation = gql`
  mutation deleteGame($id: ID!) {
    deleteGame(id: $id)
  }
`;

export const updateGameMutation = gql`
  mutation updateGame($id: ID!, $data: InsertGameInput!) {
    updateGame(id: $id, data: $data) {
      id
      name
    }
  }
`;
