import { gql } from '@apollo/client/core';

export const newMessageSubscription = gql`
  subscription newMessage {
    newMessage {
      id
      content
      fromUser {
        id
        username
      }
      createdAt
    }
  }
`;

export const sendMessageMutation = gql`
  mutation sendMessage($data: MessageInput!) {
    sendMessage(data: $data)
  }
`;

export const getConversation = gql`
  query getConversation($toUser: UserInput!) {
    getConversation(toUser: $toUser) {
      id
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

export const getConversations = gql`
  query getConversations {
    getConversations {
      id
      username
    }
  }
`;
