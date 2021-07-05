import { gql } from '@apollo/client/core';

export const updateRole = gql`
  mutation updateRole($promotion: PromotionInput!) {
    updateRole(promotion: $promotion) {
      id
      email
      username
      role
    }
  }
`;
