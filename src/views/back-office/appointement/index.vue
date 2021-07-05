,<template>
  <div class="grid grid-cols-12 gap-6 my-5">
    <action-warning-popup
      v-if="isPopupOpen && popupPayload.size"
      @on-close="isPopupOpen = false"
      :payload="popupPayload"
      name="Appointment"
    />

    <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
      <div class="flex justify-end mt-5 mx-5">
        <div class="flex items-center mr-10">
          <label for="select-all">Select All</label>
          <input
            id="select-all"
            type="checkbox"
            v-model="selectAll"
            :true-value="true"
            :false-value="false"
          />
        </div>
        <button
          class="flex justify-center border-red-500 border-2 outline-none font-bold text-white uppercase rounded bg-purple-800 text-sm py-1 w-1/12"
          :class="{
            'bg-purple-700 transition-all ease-in duration-200': selectedAppointment.size
          }"
          :disabled="!selectedAppointment.size"
          @click="handleRemoveAll"
        >
          Block all
        </button>
      </div>
      <table class="table-auto table-report mx-10 mb-10">
        <thead>
          <tr>
            <th class="whitespace-nowrap w-1/5">ID</th>
            <th class="text-center whitespace-nowrap w-1/6">FROM</th>
            <th class="text-center whitespace-nowrap w-1/6">TO</th>
            <th class="text-center whitespace-nowrap w-1/7">CREATED AT</th>
            <th class="text-center whitespace-nowrap w-1/7">LAST UPDATED</th>
            <th class="text-center whitespace-nowrap w-1/9">STATUS</th>
            <th class="text-center whitespace-nowrap w-1/12">ACTIONS</th>
          </tr>
        </thead>
        <Loader v-if="loading" />
        <div v-else-if="error">Error occured: {{ error }}</div>
        <tbody v-else-if="appointments && users">
          <tr
            v-for="appointment in appointments"
            :key="appointment._id"
            class="divide-x divide-gray-400 bg-white"
            :class="{ 'bg-blueGray-custom text-white': selectedAppointment.has(appointment._id) }"
            @click.prevent="select(appointment)"
          >
            <td class="rounded-l-lg h-20">
              <a href="" class="font-medium whitespace-nowrap">{{ appointment.title }}</a>
              <div class="text-gray-600 text-xs whitespace-nowrap mt-0.5">
                {{ appointment._id }}
              </div>
            </td>
            <td class="text-center">
              {{ `${getUsername(appointment.from)}` }}
            </td>
            <td class="text-center">
              {{ `${getUsername(appointment.to)}` }}
            </td>
            <td class="text-center">{{ formatDate(appointment._createdAt) }}</td>
            <td class="text-center">{{ formatDate(appointment._updatedAt) }}</td>
            <td class="w-40">
              <div
                class="flex items-center justify-center"
                :class="{
                  'text-theme-9': Math.random(0, 4) === 0
                }"
              >
                <img
                  :src="`/images/${appointment.status.toLowerCase()}.svg`"
                  :alt="`${appointment.status}`"
                  class="h-5 w-5"
                />
                {{ appointment.status }}
              </div>
            </td>
            <td class="table-report__action w-56 rounded-r-lg">
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
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { getAppointments } from '@/apollo/appointment.gql';
import { getUsers } from '@/apollo/user.gql';
import { useQuery, useResult, useQueryLoading } from '@vue/apollo-composable';
import Loader from '@/components/Loader.vue';
import ActionWarningPopup from '@/components/back-office/TransactionWarningPopup.vue';

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
  components: { Loader, ActionWarningPopup },
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
  border-spacing: 0 10px;
  border-collapse: separate;
}
</style>
