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
  query getAppointmentsByUser($data: AppointmentStatusInput!) {
    getAppointmentsByUser(data: $data) {
      _id
      _createdAt
      _updatedAt
      from
      to
      game
      date
      matches
      status
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

export const confirmAppointment = gql`
  mutation confirmAppointment($payload: AppointmentIdsInput!) {
    confirmAppointment(payload: $payload)
  }
`;
