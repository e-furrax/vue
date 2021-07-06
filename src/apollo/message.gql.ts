import { gql } from '@apollo/client/core';

export const newMessageSubscription = gql`
  subscription newMessage {
    newMessage {
      id
      conversationId
      content
      fromUser {
        id
        username
        profileImage
      }
      toUser {
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
  query getConversation($conversationId: Float!) {
    getConversation(conversationId: $conversationId) {
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
      conversationId
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
