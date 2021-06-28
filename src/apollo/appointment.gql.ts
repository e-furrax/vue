import { gql } from '@apollo/client/core';

export const getAppointments = gql`
  {
    getAppointments {
      _id
      _createdAt
      _updatedAt
      from
      to
      title
      status
      transactions {
        _id
        price
        status
      }
    }
  }
`;

export const getAppointmentbyUser = gql`
  query getAppointmentByUser($id: number!) {
    getAppointmentsByUser(id: $id) {
      _id
      _createdAt
      _updatedAt
      from
      to
      title
      transactions {
        price
        status
      }
    }
  }
`;

export const deleteAppointment = gql`
  mutation deleteAppointment($payload: AppointmentIdsInput!) {
    deleteAppointment(payload: $payload) {
      _id
      status
      transactions {
        _id
        _createdAt
        _updatedAt
        description
        price
        status
      }
    }
  }
`;
