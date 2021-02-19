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

export const getUser = gql`
    query getUser($data: UserInput!) {
        getUser(id: $data) {
            id
            username
            email
        }
    }
`;
export const deleteMut  = gql`
mutation deleteUser($id: String!) {
    deleteUser(id: $id) { id }
}
`;