import { gql } from '@apollo/client/core';

export const getLanguages = gql`
  {
    getLanguages {
      id
      name
    }
  }
`;

export const createLanguageMutation = gql`
  mutation createLanguage($data: InsertLanguageInput!) {
    createLanguage(data: $data) {
      id
      name
    }
  }
`;

export const deleteLanguageMutation = gql`
  mutation deleteLanguage($id: ID!) {
    deleteLanguage(id: $id)
  }
`;

export const updateLanguageMutation = gql`
  mutation updateLanguage($id: ID!, $data: InsertLanguageInput!) {
    updateLanguage(id: $id, data: $data) {
      id
      name
    }
  }
`;
