,<template>
  <div class="flex flex-col">
    <section class="flex flex-col sm:flex-row justify-center items-center">
      <StatsCard
        class="w-full lg:w-96"
        :items="appointments"
        label="TOTAL APPOINTMENTS"
        icon="/images/icons/profiles.svg"
      />
      <StatsCard
        class="w-full lg:w-96 mt-2 sm:ml-6 sm:mt-0"
        :items="appointmentsLast24h"
        label="APPOINTMENTS LAST 24H"
        icon="/images/icons/profiles.svg"
      />
    </section>
    <div class="grid grid-cols-12 gap-6 mt-6">
      <action-warning-popup
        v-if="isPopupOpen && popupPayload.size"
        @on-close="isPopupOpen = false"
        :payload="popupPayload"
        name="Appointment"
      />

      <div class="col-span-12 overflow-auto lg:overflow-visible">
        <div class="flex justify-end mb-4">
          <div class="flex items-center mr-10">
            <label for="select-all" class="mr-2 text-white">Select All</label>
            <input
              id="select-all"
              type="checkbox"
              v-model="selectAll"
              :true-value="true"
              :false-value="false"
            />
          </div>
          <button
            class="px-3 py-1 rounded border border-pink-500 hover:border-pink-400 hover:text-pink-400 transition duration-200"
            :class="[
              selectedAppointment.size ? 'bg-pink-500 text-white' : 'bg-transparent text-pink-500'
            ]"
            :disabled="!selectedAppointment.size"
            @click="handleRemoveAll"
          >
            Block all
          </button>
        </div>
        <table class="table-auto w-full table-report">
          <thead>
            <tr class="text-white text-xs">
              <th class="whitespace-nowrap w-1/5">ID</th>
              <th class="text-center">FROM</th>
              <th class="text-center">TO</th>
              <th class="text-center">CREATED AT</th>
              <th class="text-center">LAST UPDATED</th>
              <th class="text-center">STATUS</th>
              <th class="text-center">ACTIONS</th>
            </tr>
          </thead>
          <Loader v-if="loading" />
          <div v-else-if="error">Error occured: {{ error }}</div>
          <tbody v-else-if="appointments && users" class="text-sm">
            <tr
              v-for="appointment in appointments"
              :key="appointment._id"
              class="shadow text-white"
              :class="[
                selectedAppointment.has(appointment._id)
                  ? 'bg-green-600 bg-opacity-40'
                  : 'bg-darkpurple-400'
              ]"
              @click.prevent="select(appointment)"
            >
              <td class="px-2 py-2 flex items-center">
                <span>{{ appointment.title }}</span>
                <div class="">
                  {{ appointment._id }}
                </div>
              </td>
              <td class="text-center p-2">
                {{ `${getUsername(appointment.from)}` }}
              </td>
              <td class="text-center p-2">
                {{ `${getUsername(appointment.to)}` }}
              </td>
              <td class="text-center p-2">{{ formatDate(appointment._createdAt) }}</td>
              <td class="text-center p-2">{{ formatDate(appointment._updatedAt) }}</td>
              <td class="p-2">
                <div
                  class="flex items-center justify-center"
                  :class="{
                    'text-theme-9': Math.random(0, 4) === 0
                  }"
                >
                  <img
                    :src="`/images/icons/${appointment.status.toLowerCase()}.svg`"
                    :alt="`${appointment.status}`"
                    class="h-5 w-5"
                  />
                  {{ appointment.status }}
                </div>
              </td>
              <td class="table-report__action">
                <div class="flex justify-center items-center">
                  <img
                    src="/images/eyes.svg"
                    alt="details"
                    class="flex items-center mr-3 cursor-pointer"
                    @click.stop="$router.push(`/back-office/appointment/${appointment._id}`)"
                  />
                  <img
                    src="/images/trash.svg"
                    alt="trash"
                    class="flex items-center cursor-pointer"
                    @click.stop="handleRemove(appointment)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { getAppointments } from '@/apollo/appointment.gql';
import { getUsers } from '@/apollo/user.gql';
import { useQuery, useResult, useQueryLoading } from '@vue/apollo-composable';
import Loader from '@/components/Loader.vue';
import ActionWarningPopup from '@/components/back-office/TransactionWarningPopup.vue';
import AppointmentModel from '@/models/appointment.model';
import StatsCard from '@/components/back-office/StatsCard.vue';

interface User {
  id: string;
  username: string;
  email: string;
}
interface Transaction {
  _id: string;
  price: number;
  status: string;
}
interface Appointment {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  from: number;
  to: number;
  title: string;
  transactions: Transaction[];
}

export default defineComponent({
  components: { Loader, ActionWarningPopup, StatsCard },
  name: 'Appointement',
  setup() {
    const { result: appointmentsResult, error } = useQuery(getAppointments, null, {
      clientId: 'mongo'
    });
    const { result: usersResult } = useQuery(getUsers);

    const appointments = useResult(appointmentsResult, null, data => data.getAppointments);
    const users = useResult(usersResult, null, data => data.getUsers);
    const loading = useQueryLoading();
    const selectAll = ref(false);
    const selectedAppointment = ref(new Map());

    const getUsername = (userId: number) => {
      return users.value.find((user: User) => user.id === userId.toString()).username;
    };
    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString('fr-FR');
    };
    const getRecap = (appointment: any) => {
      return `From:${getUsername(appointment.from)}, To:${getUsername(
        appointment.to
      )} at ${formatDate(appointment.date)}`;
    };

    watch(selectAll, value => {
      if (!value) {
        selectedAppointment.value.clear();
        return;
      }
      const entries = appointments.value.reduce((acc: any[], curr: any) => {
        acc.push([curr._id]);
        return acc;
      }, []);
      selectedAppointment.value = new Map(entries);
    });

    return {
      appointments,
      users,
      loading,
      error,
      selectAll,
      selectedAppointment,
      getUsername,
      formatDate,
      getRecap,
      popupPayload: new Map(),
      isPopupOpen: ref(false)
    };
  },
  computed: {
    appointmentsLast24h(): AppointmentModel[] {
      if (this.appointments) {
        const limitDate = new Date();
        limitDate.setHours(limitDate.getHours() - 24);
        return this.appointments.filter((appointment: Appointment) => {
          return new Date(appointment._createdAt) >= limitDate;
        });
      }
      return [];
    }
  },
  methods: {
    handleRemove(appointment: any) {
      if (!this.selectedAppointment.has(appointment._id)) {
        this.selectedAppointment.set(appointment._id, this.getRecap(appointment));
      }
      this.popupPayload = new Map([[appointment._id, this.getRecap(appointment)]]);
      this.isPopupOpen = true;
    },
    handleRemoveAll() {
      this.popupPayload = this.selectedAppointment;
      this.isPopupOpen = true;
    },
    select(appointment: any) {
      this.selectedAppointment.has(appointment._id)
        ? this.selectedAppointment.delete(appointment._id)
        : this.selectedAppointment.set(appointment._id, this.getRecap(appointment));
    }
  }
});
</script>
<style scoped>
.table-report {
  border-spacing: 0 3px;
  border-collapse: separate;
}

.border-purple-custom {
  border-color: #382f66;
}
</style>
