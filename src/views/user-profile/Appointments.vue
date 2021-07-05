<template>
  <div class="my-10 container mx-auto flex flex-col items-start text-white">
    <h2 class="font-semibold border-b-2 border-purple-700 mb-6">Appointments</h2>
    <Calendar
      class="custom-calendar max-w-full"
      :masks="masks"
      :attributes="attributes"
      v-model="today"
      transition="slide-h"
      is-dark
      is-expanded
      @update:from-page="attachPopoverToCalendarAppointments"
    >
      <template v-slot:day-content="{ day, attributes }">
        <div class="flex flex-col h-full z-10 overflow-hidden">
          <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
          <div class="flex-grow overflow-y-auto overflow-x-auto">
            <p
              v-for="attr in attributes"
              :key="attr.key"
              class="bg-pink-500 cursor-pointer text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
              :id="attr.customData.id"
            >
              <span class="font-bold">
                {{ dayjs(new Date(attr.customData.appointment.date)).format('h:mm A') }}
                <span class="text-xs font-normal">({{ attr.customData.appointment.status }})</span>
              </span>
              <br />
              {{ attr.customData.appointment.game }} with
              {{
                attr.customData.appointment.from.username === user.username
                  ? attr.customData.appointment.to.username
                  : attr.customData.appointment.from.username
              }}
            </p>
          </div>
        </div>
      </template>
    </Calendar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getUsers } from '@/apollo/user.gql';
import { Calendar } from 'v-calendar';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/material.css';
import 'tippy.js/animations/shift-away.css';
import { useAuth } from '@/composables/auth';
import {
  getAppointmentsByUser,
  deleteAppointment,
  confirmAppointment
} from '@/apollo/appointment.gql';
import { provideApolloClient, useMutation, useQuery, useResult } from '@vue/apollo-composable';
import dayjs from 'dayjs';
import { useToast } from 'vue-toastification';
import { mongoClient } from '@/apollo/client';

interface AttributeType {
  key: number;
  customData: {
    id: string;
    appointment: Appointment;
  };
  dates: Date;
}

interface UserModel {
  id: number;
  username: string;
  email: string;
}

interface Appointment {
  _id: string;
  from: UserModel;
  to: UserModel;
  game: string;
  date: string;
  status: string;
  matches: string;
}

interface AppointmentVariables {
  payload: {
    ids: string[];
  };
}

interface AppointmentsResult {
  getAppointmentsByUser: Appointment[];
}

enum ROLES {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  FURRAX = 'FURRAX',
  USER = 'USER',
  BANNED = 'BANNED'
}

export default defineComponent({
  name: 'Appointments',
  components: {
    Calendar
  },
  setup() {
    const toast = useToast();
    const { user } = useAuth();

    const appointments = [] as Appointment[];

    const { result: usersResult } = useQuery(getUsers);
    const users = useResult(usersResult, null, data => data.getUsers);

    const { mutate: deleteAppointmentMutation } = useMutation<boolean, AppointmentVariables>(
      deleteAppointment
    );

    const { mutate: confirmAppointmentMutation } = useMutation<boolean, AppointmentVariables>(
      confirmAppointment
    );

    const queryAppointmentsByUser = (userData: any) => {
      const { onResult } = provideApolloClient(mongoClient)(() =>
        useQuery(
          getAppointmentsByUser,
          {
            data: {
              from: userData ? +userData.id : 0,
              status: ['PENDING', 'CONFIRMED']
            }
          },
          { fetchPolicy: 'no-cache' }
        )
      );
      return onResult;
    };

    return {
      deleteAppointmentMutation,
      confirmAppointmentMutation,
      user,
      dayjs,
      users,
      appointments,
      toast,
      queryAppointmentsByUser
    };
  },
  mounted() {
    if (!this.appointmentsLoaded && this.user) {
      const onResult = this.queryAppointmentsByUser(this.user);
      onResult(({ data }: { data: AppointmentsResult }) => {
        this.setAttributes(JSON.parse(JSON.stringify(data.getAppointmentsByUser)));
        this.appointmentsLoaded = true;
      });
    }
  },
  watch: {
    user(): void {
      this.appointmentsLoaded = true;
      const onResult = this.queryAppointmentsByUser(this.user);
      onResult(({ data }: { data: AppointmentsResult }) => {
        this.setAttributes(JSON.parse(JSON.stringify(data.getAppointmentsByUser)));
      });
    }
  },
  methods: {
    authorized(roles: string[]) {
      return this.user && roles.includes((this.user as any).role);
    },
    setAttributes(appointments: Appointment[]) {
      this.clonedAppointments = JSON.parse(JSON.stringify(appointments));
      this.attributes = appointments.map((appointment, index) => {
        appointment.from = this.findUser(+appointment.from);
        appointment.to = this.findUser(+appointment.to);
        return {
          key: index,
          customData: {
            id: `appointment-${index}`,
            appointment
          },
          dates: new Date(appointment.date)
        };
      });
      this.attachPopoverToCalendarAppointments();
    },
    findUser(id: number): UserModel {
      return this.users.find((user: UserModel) => user.id == id);
    },
    handleCancel(event: Event) {
      const appointmentId = (event.target as HTMLElement).dataset.id;
      if (appointmentId) {
        this.deleteAppointmentMutation(
          {
            payload: { ids: [appointmentId] }
          },
          {
            context: {
              uri: `${process.env.VUE_APP_MONGO_BACKEND_URL || 'http://localhost:4000'}/graphql`
            }
          }
        )
          .then(() => {
            this.toast.success('Appointment cancelled successfully!');
            const index = this.clonedAppointments.findIndex(v => v._id === appointmentId);
            this.clonedAppointments[index].status = 'CANCELLED';
            this.setAttributes(this.clonedAppointments);
            this.$forceUpdate();
          })
          .catch(() => {
            this.toast.error('An error occurred.');
          });
      }
    },
    handleConfirm(event: Event) {
      const appointmentId = (event.target as HTMLElement).dataset.id;
      if (appointmentId) {
        this.confirmAppointmentMutation(
          {
            payload: { ids: [appointmentId] }
          },
          {
            context: {
              uri: `${process.env.VUE_APP_MONGO_BACKEND_URL || 'http://localhost:4000'}/graphql`
            }
          }
        )
          .then(() => {
            this.toast.success('Appointment confirmed successfully!');
            const index = this.clonedAppointments.findIndex(v => v._id === appointmentId);
            this.clonedAppointments[index].status = 'CONFIRMED';
            this.setAttributes(this.clonedAppointments);
            this.$forceUpdate();
          })
          .catch(() => {
            this.toast.error('An error occurred.');
          });
      }
    },
    destroyAllTippyInstances() {
      this.tippyInstances.forEach((i: any) => {
        if (!i.state.isDestroyed) {
          i.destroy();
        }
      });
    },
    attachPopoverToCalendarAppointments() {
      this.$nextTick(() => {
        this.destroyAllTippyInstances();
        this.attributes.forEach(attr => {
          const appointmentDOM = document.getElementById(attr.customData.id);
          if (appointmentDOM) {
            const instance = tippy(appointmentDOM, {
              content: `
            <div class="flex flex-col">
              <span>Start at: <span class="text-gold">${this.dayjs(
                new Date(attr.customData.appointment.date)
              ).format('h:mm A')}</span></span>
              <span>With: <span class="text-gold">${
                attr.customData.appointment.from.username === (this.user as any).username
                  ? attr.customData.appointment.to.username
                  : attr.customData.appointment.from.username
              }</span></span>
              <span>Game: <span class="text-gold">${attr.customData.appointment.game}</span></span>
              <span>Matches: <span class="text-gold">${
                attr.customData.appointment.matches
              }</span></span>
              <span>Status: <span class="text-gold">${
                attr.customData.appointment.status
              }</span></span>
              <div class="mt-2 flex items-center justify-between">
                <img
                  data-id="${attr.customData.appointment._id}"
                  class="
                    cancel
                    cursor-pointer
                    bg-white
                    hover:bg-red-500
                    rounded-full
                    transition
                    duration-200
                    p-1
                    bg-opacity-10
                    hover:bg-opacity-60
                  "
                  title="Cancel"
                  src="/images/icons/close.svg"
                  width="24"
                />
                <img
                  data-id="${attr.customData.appointment._id}"
                  class="
                    ${
                      !this.authorized([ROLES.FURRAX, ROLES.MODERATOR, ROLES.ADMIN]) ? 'hidden' : ''
                    }
                    confirm
                    cursor-pointer
                    bg-white
                    hover:bg-green-500
                    rounded-full
                    transition
                    duration-200
                    p-1
                    bg-opacity-20
                    hover:bg-opacity-60
                  "
                  title="Confirm"
                  src="/images/icons/done.svg"
                  width="24"
                />
              </div>
            </div>
          `,
              allowHTML: true,
              arrow: false,
              trigger: 'click',
              interactive: true,
              theme: 'material',
              animation: 'shift-away',
              appendTo: () => document.body,
              onShown: () => {
                const cancel = document.querySelector('.tippy-box .cancel');
                const confirm = document.querySelector('.tippy-box .confirm');
                if (cancel && confirm) {
                  cancel.addEventListener('click', this.handleCancel);
                  confirm.addEventListener('click', this.handleConfirm);
                }
              }
            });
            this.tippyInstances.push(instance);
          }
        });
      });
    }
  },
  data() {
    return {
      today: new Date(),
      masks: {
        weekdays: 'WWW'
      },
      tippyInstances: [] as any,
      appointmentsLoaded: false,
      clonedAppointments: [] as Appointment[],
      attributes: [] as AttributeType[]
    };
  }
});
</script>

<style lang="postcss">
::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  display: none;
}

.text-gold {
  color: #bd9e59;
}

.custom-calendar.vc-container .vc-popover-content {
  background-color: #160d33;
  box-shadow: rgb(21 11 37 / 50%) 0px 2px 10px;
  color: white;
  border: 0;
}

.custom-calendar.vc-container .vc-popover-content .vc-nav-item:hover {
  border: 2px solid #2d2652;
  background-color: transparent;
  color: white;
}

.custom-calendar.vc-container .vc-popover-content .vc-nav-item.is-current {
  border: 2px solid #2d2652;
  color: white;
}

.custom-calendar.vc-container .vc-popover-content .vc-nav-item.is-active {
  background-color: #2d2652;
  border: 2px solid #2d2652;
}

.custom-calendar.vc-container .vc-popover-content .vc-nav-title {
  color: white;
}

.custom-calendar.vc-container .vc-popover-content .vc-nav-title:hover {
  background-color: #2d2652;
}

.custom-calendar.vc-container {
  --day-border: 1px solid #302c50;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #261f48;
  --weekday-border: 1px solid #302c50;

  border: 0px;
  border-radius: 1rem;
  box-shadow: rgb(21 11 37 / 50%) 0px 2px 10px;
}

.custom-calendar.vc-container .vc-arrow,
.custom-calendar.vc-container .vc-nav-arrow {
  transition: all 0.2s linear;
  border-radius: 100rem;
}

.custom-calendar.vc-container .vc-arrow:hover,
.custom-calendar.vc-container .vc-nav-arrow:hover {
  transition: all 0.2s linear;
  background-color: rgba(255, 255, 255, 0.2);
}

.custom-calendar.vc-container .vc-header {
  background-color: #261f48;
  padding: 10px 0;
}

.custom-calendar.vc-container .is-today {
  background-color: #2d2652 !important;
  border: 1px solid #bd9e59 !important;
  box-shadow: rgba(189, 158, 89, 0.2) 0px 2px 10px;
  z-index: 10;
}

.custom-calendar.vc-container .is-today .day-label {
  color: #bd9e59 !important;
  font-weight: bold;
}

.custom-calendar.vc-container .vc-weeks {
  padding: 0;
}

.custom-calendar.vc-container .vc-weekday {
  background-color: var(--weekday-bg);
  border-bottom: var(--weekday-border);
  border-top: var(--weekday-border);
  padding: 5px 0;
  color: white;
}

.custom-calendar.vc-container .vc-day {
  padding: 0 5px 3px 5px;
  text-align: left;
  height: var(--day-height);
  min-width: var(--day-width);
  background-color: #2d2652;
}

.custom-calendar.vc-container .vc-day.weekday-1,
.custom-calendar.vc-container .vc-day.weekday-7 {
  background-color: #2d2652;
}

.custom-calendar.vc-container .vc-day:not(.on-bottom) {
  border-bottom: var(--day-border);
}

.custom-calendar.vc-container .vc-day:not(.on-right) {
  border-right: var(--day-border);
}

.custom-calendar.vc-container .vc-day-dots {
  margin-bottom: 5px;
}
.custom-calendar.vc-container .vc-title {
  color: white;
}

.custom-calendar.vc-container .day-label {
  color: #a6a6c6;
}

.tippy-box[data-theme='material'] .tippy-content {
  background-color: #261f48 !important;
  border-radius: 0.25rem;
  box-shadow: rgb(21 11 37 / 50%) 0px 2px 10px;
  font-weight: 400;
  border: 1px solid #302c50;
}
</style>
