import { gql } from '@apollo/client/core';

export const getAvailability = gql`
  query getAvailability($user: UserInput!) {
    getAvailability(user: $user) {
      value
    }
  }
`;

export const updateAvailabilityMutation = gql`
  mutation updateAvailability($value: String!) {
    updateAvailability(value: $value) {
      value
    }
  }
`;
