import { gql } from '@apollo/client/core';

export const searchByUsernameOrGamename = gql`
  query SearchByUsernameOrGamename($input: String!) {
    SearchByUsernameOrGamename(input: $input) {
      users {
        id
        username
      }
      games {
        id
        name
      }
    }
  }
`;