import { gql } from '@apollo/client/core';

export const getAppointments = gql`
  query getAppointments {
    _id
    _createdAt
    _updatedAt
    userId
    title
    transactions {
      _id
      price
      status
    }
  }
`;

export const getAppointmentbyUser = gql`
  query getAppointmentByUser($id: number!) {
    getAppointmentsByUser(id: $id) {
      _id
      _createdAt
      _updatedAt
      userId
      title
      transactions {
        price
        status
      }
    }
  }
`;
