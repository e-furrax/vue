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
      @update:to-page="attachPopoverToCalendarAppointments"
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
              <span class="font-bold">{{
                dayjs(new Date(attr.customData.appointment.date)).format('h:mm A')
              }}</span>
              <br />
              {{ attr.customData.appointment.game }} with
              {{ attr.customData.appointment.from.username }}
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
import { getAppointmentsByUser } from '@/apollo/appointment.gql';
import { useQuery, useResult } from '@vue/apollo-composable';
import dayjs from 'dayjs';
import { useToast } from 'vue-toastification';

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
  from: UserModel;
  to: UserModel;
  game: string;
  date: string;
  status: string;
  matches: string;
}

interface Transaction {
  _id: string;
  price: number;
  status: string;
}

interface AppointmentsResponse {
  getAppointmentsByUser: {
    date: string;
    game: string;
    status: string;
    from: number;
    to: number;
  };
}

export default defineComponent({
  name: 'Appointments',
  components: {
    Calendar
  },
  setup() {
    const toast = useToast();
    const { user } = useAuth();
    const { result: appointmentsResult } = useQuery(
      getAppointmentsByUser,
      { from: user && user.value ? +user.value.id : 0 },
      { clientId: 'mongo', fetchPolicy: 'no-cache' }
    );

    const appointments = useResult(appointmentsResult, null, data => data.getAppointmentsByUser);

    const { result: usersResult } = useQuery(getUsers);
    const users = useResult(usersResult, null, data => data.getUsers);

    return {
      user,
      dayjs,
      users,
      appointments,
      toast
    };
  },
  watch: {
    appointments(): void {
      const clonedAppointments: Appointment[] = [...JSON.parse(JSON.stringify(this.appointments))];
      this.attributes = clonedAppointments.map((appointment, index) => {
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
    }
  },
  methods: {
    findUser(id: number): UserModel {
      return this.users.find((user: UserModel) => user.id == id);
    },
    handleCancel() {
      this.toast.success('Appointment cancelled successfully!');
    },
    handleConfirm() {
      this.toast.success('Appointment confirmed successfully!');
    },
    attachPopoverToCalendarAppointments() {
      this.$nextTick(() => {
        this.attributes.forEach(attr => {
          const appointmentDOM = document.getElementById(attr.customData.id);
          if (appointmentDOM) {
            tippy(appointmentDOM, {
              content: `
            <div class="flex flex-col">
              <span>Start at: <span class="text-gold">${this.dayjs(
                new Date(attr.customData.appointment.date)
              ).format('h:mm A')}</span></span>
              <span>With: <span class="text-gold">${
                attr.customData.appointment.from.username
              }</span></span>
              <span>Game: <span class="text-gold">${attr.customData.appointment.game}</span></span>
              <span>Matches: <span class="text-gold">${
                attr.customData.appointment.matches
              }</span></span>
              <span>Status: <span class="text-gold">Pending</span></span>
              <div class="mt-2 flex items-center justify-between">
                <img
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
                  class="
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
