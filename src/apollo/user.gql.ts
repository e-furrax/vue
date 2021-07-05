import { gql } from '@apollo/client/core';

export const me = gql`
  query me {
    me {
      id
      email
      username
      profileImage
      role
    }
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
      createdAt
      languages {
        name
      }
      games {
        id
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
      createdAt
      role
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
      statistics {
        id
        rank
        mode
        playerId
        game {
          id
          name
        }
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
export const getUsersOverview = gql`
  query getProfile {
    getUsers {
      id
      profileImage
      email
      username
      gender
      role
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
      id
      email
      username
      role
      profileImage
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

export const resetPassword = gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email)
  }
`;

export const changePassword = gql`
  mutation changePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword)
  }
`;

export const addGamesMutation = gql`
  mutation addGames($games: GamesInput!) {
    addGames(games: $games) {
      username
      games {
        name
      }
    }
  }
`;

export const addLanguagesMutation = gql`
  mutation addLanguages($languages: LanguagesInput!) {
    addLanguages(languages: $languages) {
      username
      languages {
        name
      }
    }
  }
`;

export const removeUserGameMutation = gql`
  mutation removeUserGame($id: Float!) {
    removeUserGame(id: $id) {
      username
      games {
        name
      }
    }
  }
`;

export const removeUserLanguageMutation = gql`
  mutation removeUserLanguage($id: Float!) {
    removeUserLanguage(id: $id) {
      username
      languages {
        name
      }
    }
  }
`;

export const addGamesLolMutation = gql`
  mutation addGamesLol($userName: String!) {
    addGamesLol(userName: $userName)
  }
`;

export const addGamesCSMutation = gql`
  mutation addGamesCS($userName: String!) {
    addGamesCS(userName: $userName)
  }
`;

export const becomeFurrax = gql`
  mutation becomeFurrax($data: BecomeFurraxInput!) {
    becomeFurrax(data: $data)
  }
`;
