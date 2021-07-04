import { gql } from '@apollo/client/core';

export const getAppointments = gql`
  {
    getAppointments {
      _id
      _createdAt
      _updatedAt
      from
      to
      status
      transactions {
        _id
        price
        status
      }
    }
  }
`;

export const getAppointmentsByUser = gql`
  query getAppointmentsByUser($from: Float!) {
    getAppointmentsByUser(from: $from) {
      _id
      _createdAt
      _updatedAt
      from
      to
      game
      date
      matches
    }
  }
`;

export const createAppointment = gql`
  mutation createAppointment($appointmentInput: AppointmentInput!) {
    createAppointment(appointmentInput: $appointmentInput) {
      _createdAt
    }
  }
`;

export const deleteAppointment = gql`
  mutation deleteAppointment($payload: AppointmentIdsInput!) {
    deleteAppointment(payload: $payload)
  }
`;
