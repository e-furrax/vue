import { gql } from '@apollo/client/core';

export const getUsers = gql`
{
  getUsers {
    id
    username
    email
  }
}
`;