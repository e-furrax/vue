import { gql } from '@apollo/client/core';

export const sendMessageMutation = gql`
  mutation sendMessage($data: MessageInput!) {
    sendMessage(data: $data) {
      content
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

export const getConversation = gql`
  query getConversation {
    getConversation {
      content
      toUser {
        id
        username
      }
      fromUser {
        id
        username
      }
      createdAt
    }
  }
`;
