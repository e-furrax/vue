import { gql } from '@apollo/client/core';

export const addRatingMutation = gql`
  mutation addRating($data: RatingInput!) {
    addRating(data: $data) {
      rating
      comments
      toUser
    }
  }
`;
