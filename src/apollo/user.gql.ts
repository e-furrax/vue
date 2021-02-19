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
export const deleteUser = gql`
mutation deleteUser($id: String!) {
    deleteUser(id: $id)
}
`;