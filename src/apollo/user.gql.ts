import { gql } from '@apollo/client/core';

export const me = gql`
  query me {
    me
  }
`;

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
    getUser(data: $data) {
      id
      username
      email
    }
  }
`;
export const getProfile = gql`
  query getProfile {
    getProfile {
      email
      username
      description
    }
  }
`;

export const deleteMutation = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const loginMutation = gql`
  mutation login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      accessToken
    }
  }
`;

export const registerMutation = gql`
  mutation register($data: RegisterInput!) {
    register(data: $data) {
      username
      email
    }
  }
`;
