import { gql } from '@apollo/client/core';

export const addRatingMutation = gql`
  mutation addRating($data: RatingInput!) {
    addRating(data: $data) {
      rating
      comments
      createdAt
      fromUser {
        username
      }
      toUser {
        username
      }
    }
  }
`;

export const getRatings = gql`
  query getRatings {
    getRatings {
      id
      rating
      comments
      createdAt
      fromUser {
        username
      }
      toUser {
        username
      }
    }
  }
`;

export const removeRatingMutation = gql`
  mutation removeRating($ratings: RatingIdsInput!) {
    removeRating(ratings: $ratings)
  }
`;
