<template>
  <div class="grid grid-cols-12 gap-6 my-5">
    <action-warning-popup
      v-if="isPopupOpen && popupPayload.size"
      @on-close="isPopupOpen = false"
      :payload="popupPayload"
      name="Appointment"
    />

    <div class="intro-y col-span-12 overflow-auto lg:overflow-visible">
      <table class="table-auto table-report mx-10 mb-10">
        <thead>
          <tr>
            <th class="whitespace-nowrap w-1/5" @click="filterKey = 'username'">USER</th>
            <th class="text-center whitespace-nowrap w-1/6">GENDER</th>
            <th class="text-center whitespace-nowrap w-1/7" @click="filterKey = 'email'">EMAIL</th>
            <th class="text-center whitespace-nowrap w-1/7" @click="filterKey = 'role'">ROLE</th>
            <th class="text-center whitespace-nowrap w-1/12">ACTIONS</th>
          </tr>
        </thead>
        <Loader v-if="loading" />
        <tbody v-else-if="users">
          <tr v-for="user in users" :key="user.id" class="divide-x divide-gray-400 bg-white">
            <td class="rounded-l-lg h-20">
              <a href="" class="font-medium whitespace-nowrap">{{ user.username }}</a>

              <img
                :src="`${user.profileImage ? user.profileImage : '/images/photo-placeholder.jpg'}`"
                class="inline-flex items-center justify-center rounded-full h-8 w-8 lg:mr-4"
              />
              <div class="text-gray-600 text-xs whitespace-nowrap mt-0.5">
                {{ user.id }}
              </div>
            </td>
            <td class="text-center">
              {{ user.gender }}
            </td>
            <td class="text-center">
              {{ user.email }}
            </td>
            <td class="text-center">
              <select
                class="px-1 text-sm py-0.5 border border-purple-custom rounded"
                :ref="`ref-select-${user.id}`"
                name="user-status"
              >
                <option :value="user.role" select hidden>{{ user.role }}</option>
                <option v-for="role of roles" :key="role" :value="role">
                  {{ role }}
                </option>
              </select>
            </td>
            <td class="table-report__action w-56 rounded-r-lg">
              <div class="flex justify-center items-center">
                <img
                  src="/images/eyes.svg"
                  alt="details"
                  class="flex items-center mr-3 cursor-pointer"
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
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getUsersOverview } from '@/apollo/user.gql';
import { useQuery, useResult, useQueryLoading } from '@vue/apollo-composable';
import Loader from '@/components/Loader.vue';
import ActionWarningPopup from '@/components/back-office/UserWarningPopup.vue';

export default defineComponent({
  components: { Loader, ActionWarningPopup },
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
  methods: {
    test(e: any) {
      console.log(e);
    },
    wasModified(user: any) {
      console.log(this.$refs);
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
  border-spacing: 0 10px;
  border-collapse: separate;
}
</style>
