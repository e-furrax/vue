<template>
  <div class="grid grid-cols-12 gap-6 my-5">
    <remove-action-popup
      v-if="isOpen"
      @on-close="isOpen = false"
      :data="selectedAppointment"
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
          class="
          flex justify-center border-red-500 border-2 outline-none 
          font-bold text-white uppercase rounded 
          bg-purple-800 text-sm py-1 w-1/12"
          :class="{
            'bg-purple-700 transition-all ease-in duration-200': selectedAppointment.size
          }"
          :disabled="!selectedAppointment.size"
          @click="isOpen = true"
        >
          Block all
        </button>
      </div>
      <table class="table-auto table-report mx-10 mb-10">
        <thead>
          <tr>
            <th class="whitespace-nowrap w-1/5">TITLE</th>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                  <!-- TODO: in gql request only get the last transaction, get all the transactions when getting the details -->
                </svg>
                Pending
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
                  @click="isOpen = true"
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
import RemoveActionPopup from '@/components/back-office/RemoveActionPopup.vue';

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
  components: { Loader, RemoveActionPopup },
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

    watch(selectAll, value => {
      if (!value) {
        selectedAppointment.value.clear();
        return;
      }
      const entries = appointments.value.reduce((acc: any[], curr: Appointment) => {
        acc.push([curr._id, curr.title]);
        return acc;
      }, []);
      selectedAppointment.value = new Map(entries);
    });

    return {
      appointments,
      loading,
      users,
      error,
      selectAll,
      selectedAppointment,
      isOpen: ref(false)
    };
  },
  methods: {
    formatDate(date: string) {
      return new Date(date).toLocaleDateString('fr-FR');
    },
    getUsername(userId: number) {
      return this.users.find((user: User) => user.id === userId.toString()).username;
    },
    removeAppointment(appointmentId: string) {
      console.log(appointmentId);
    },
    select(appointment: Appointment) {
      this.selectedAppointment.has(appointment._id)
        ? this.selectedAppointment.delete(appointment._id)
        : this.selectedAppointment.set(appointment._id, appointment.title);
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
