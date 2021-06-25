import { gql } from '@apollo/client/core';

export const me = gql`
  query me {
    me
  }
`;
export const getUsers = gql`
  query($data: FilterInput) {
    getUsers(data: $data) {
      id
      email
      username
      description
      gender
      languages {
        name
      }
      games {
        name
      }
      receivedRatings {
        rating
      }
    }
  }
`;
export const getUser = gql`
  query getUser($data: UserInput!) {
    getUser(data: $data) {
      id
      email
      username
      description
      gender
      receivedRatings {
        id
        comments
        rating
        fromUser {
          username
        }
        createdAt
      }
      givenRatings {
        id
        comments
        rating
        toUser {
          username
        }
        createdAt
      }
      languages {
        id
        name
      }
      games {
        id
        name
      }
    }
  }
`;
export const getProfileQuery = gql`
  query getProfile {
    getProfile {
      id
      email
      username
      description
    }
  }
`;
export const getProfileSidebar = gql`
  query getProfileSidebar {
    getProfile {
      id
      profileImage
      username
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
      gender
    }
  }
`;

export const updateProfileMutation = gql`
  mutation updateProfile($data: UpdateProfileInput!) {
    updateProfile(data: $data) {
      username
      email
      description
    }
  }
`;

export const updateDescriptionMutation = gql`
  mutation updateDescription($description: String!) {
    updateDescription(description: $description)
  }
`;

export const updatePasswordMutation = gql`
  mutation updatePassword($initialPassword: String!, $newPassword: String!) {
    updatePassword(initialPassword: $initialPassword, newPassword: $newPassword)
  }
`;
export const updateProfilePicMutation = gql`
  mutation updateProfilePic($picture: Upload!) {
    updateProfilePic(picture: $picture)
  }
`;
export const confirmUserMutation = gql`
  mutation confirmUser($code: String!) {
    confirmUser(code: $code) {
      accessToken
    }
  }
`;
