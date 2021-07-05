<template>
  <div class="flex flex-col">
    <section class="flex flex-col sm:flex-row justify-center items-center">
      <StatsCard
        class="w-full lg:w-96"
        :items="users"
        label="TOTAL USERS"
        icon="/images/icons/profiles.svg"
      />
      <StatsCard
        class="w-full lg:w-96 mt-2 sm:ml-6 sm:mt-0"
        :items="usersLast24h"
        label="REGISTRATIONS LAST 24H"
        icon="/images/icons/profiles.svg"
      />
    </section>
    <div class="grid grid-cols-12 gap-2 mt-6">
      <action-warning-popup
        v-if="isPopupOpen && popupPayload.size"
        @on-close="isPopupOpen = false"
        :payload="popupPayload"
        name="Appointment"
      />

      <div class="overflow-x-scroll col-span-12 overflow-auto lg:overflow-visible">
        <table class="table-auto w-full table-report">
          <thead>
            <tr class="text-white text-xs">
              <th class="text-center" @click="filterKey = 'username'">USERNAME</th>
              <th class="text-center">GENDER</th>
              <th class="text-center" @click="filterKey = 'email'">EMAIL</th>
              <th class="text-center" @click="filterKey = 'role'">ROLE</th>
              <th class="text-center">ACTIONS</th>
            </tr>
          </thead>
          <Loader v-if="loading" />
          <tbody class="text-sm" v-else-if="users">
            <tr v-for="user in users" :key="user.id" class="shadow bg-darkpurple-400 text-white">
              <td class="rounded-l px-2 py-1 flex items-center">
                <img
                  :src="
                    `${user.profileImage ? user.profileImage : '/images/photo-placeholder.jpg'}`
                  "
                  class="inline-flex items-center justify-center rounded-full h-8 w-8 lg:mr-4"
                />
                <span>{{ user.username }}</span>
              </td>
              <td class="text-center px-2 py-1">
                {{ user.gender }}
              </td>
              <td class="text-center px-2 py-1">
                {{ user.email }}
              </td>
              <td class="text-center px-2 py-1">
                <select
                  class="bg-darkpurple-200 px-1 text-sm py-0.5 rounded"
                  :ref="`ref-select-${user.id}`"
                  name="user-status"
                >
                  <option :value="user.role" select hidden>{{ user.role }}</option>
                  <option v-for="role of roles" :key="role" :value="role">
                    {{ role }}
                  </option>
                </select>
              </td>
              <td class="table-report__action w-56 px-2 py-1">
                <div class="flex justify-center items-center">
                  <img
                    src="/images/eyes.svg"
                    alt="details"
                    class="flex items-center cursor-pointer"
                    @click.stop="$router.push(`/back-office/profile/${user.id}`)"
                  />
                  <img
                    v-if="wasModified(user)"
                    src="/images/trash.svg"
                    alt="trash"
                    class="flex items-center cursor-pointer"
                    @click.stop="handleRemove(user)"
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
import { defineComponent, ref } from 'vue';
import { getUsersOverview } from '@/apollo/user.gql';
import { useQuery, useResult, useQueryLoading } from '@vue/apollo-composable';
import Loader from '@/components/Loader.vue';
import ActionWarningPopup from '@/components/back-office/UserWarningPopup.vue';
import StatsCard from '@/components/back-office/StatsCard.vue';
import UserModel from '@/models/user.model';

export default defineComponent({
  components: { Loader, ActionWarningPopup, StatsCard },
  name: 'Profiles',
  setup() {
    const { result: usersResult } = useQuery(getUsersOverview);

    const users = useResult(usersResult, null, data => data.getUsers);
    const loading = useQueryLoading();

    return {
      loading,
      users,
      filterKey: 'username',
      roles: ['BANNED', 'USER', 'FURRAX', 'MODERATOR', 'ADMIN'],
      popupPayload: new Map(),
      isPopupOpen: ref(false)
    };
  },
  computed: {
    usersLast24h(): UserModel[] {
      if (this.users) {
        const limitDate = new Date();
        limitDate.setHours(limitDate.getHours() - 24);
        return this.users.filter((user: UserModel) => {
          return new Date(user.createdAt) >= limitDate;
        });
      }
      return [];
    }
  },
  methods: {
    wasModified(user: any) {
      return (
        this.$refs[`ref-select-${user.id}`] &&
        (this.$refs[`ref-select-${user.id}`] as any).value !== user.role
      );
    },
    handleRemove(user: any) {
      this.popupPayload = new Map([[user.id, user]]);
      this.isPopupOpen = true;
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
