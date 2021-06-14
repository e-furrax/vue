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
      transactions {
        _id
        price
        status
      }
    }
  }
`;

export const getAppointmentsOverview = gql`
  {
    getAppointments {
      _id
      _updatedAt
      from
      to
      title
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
