<template>
  <pagination :size="size" :element-by-page="elementByPage" @change-page="handleChangePage">
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
          <span
            class="inline-flex items-center justify-center rounded-full h-8 w-8 lg:mr-4"
            @click="filterModified = (filterModified + 1) % 3"
          >
            {{ filterModifiedText }}
          </span>
          <table class="table-auto w-full table-report">
            <thead>
              <tr class="text-white text-xs">
                <th class="text-center" @click="useFilterBy('username')">USER</th>
                <th class="text-center">GENDER</th>
                <th class="text-center" @click="useFilterBy('email')">EMAIL</th>
                <th class="text-center" @click="useFilterBy('role')">ROLE</th>
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
                    @change="({ target }) => wasModified(target, user)"
                    :disabled="user.role === 'ADMIN' || user.role === currUser.role"
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
                      @click.stop="$router.push(`/user/${user.id}`)"
                    />
                    <img
                      v-show="modifiedUsers.has(user.id)"
                      src="/images/trash.svg"
                      alt="trash"
                      class="flex items-center cursor-pointer"
                      @click="update(user)"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </pagination>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { getUsersOverview } from '@/apollo/user.gql';
import { useQuery, useResult, useQueryLoading } from '@vue/apollo-composable';
import { useAuth } from '@/composables/auth';
import Loader from '@/components/Loader.vue';
import ActionWarningPopup from '@/components/back-office/UserWarningPopup.vue';
import StatsCard from '@/components/back-office/StatsCard.vue';
import UserModel from '@/models/user.model';
import Pagination from '@/components/Pagination.vue';

export default defineComponent({
  components: { Loader, ActionWarningPopup, Pagination, StatsCard },
  name: 'Profiles',
  setup() {
    const { user: currUser } = useAuth();
    const { result: usersQuery } = useQuery(getUsersOverview);

    const usersQueryResult = useResult(usersQuery, []);
    const loading = useQueryLoading();
    const modifiedUsers = ref(new Map());

    const filterKey = ref({ key: 'username', order: 1 });
    const useFilterBy = (key: string) => {
      if (filterKey.value.key === key) {
        filterKey.value.order = filterKey.value.order * -1;
        return;
      }
      filterKey.value = { key, order: 1 };
    };
    const filterModified = ref(0);

    const elementByPage = ref(12);
    const currentPage = ref(0);
    const handleChangePage = (n: number) => {
      currentPage.value = n;
    };

    const users = computed(() => {
      const start = currentPage.value * elementByPage.value;
      const end = start + elementByPage.value;
      let usersCopy = usersQueryResult.value.slice(start, end);
      if (filterModified.value) {
        usersCopy = usersCopy.filter((user: any) =>
          filterModified.value === 1
            ? modifiedUsers.value.has(user.id)
            : !modifiedUsers.value.has(user.id)
        );
      }

      return usersCopy?.sort((a: any, b: any) => {
        return a[filterKey.value.key].localeCompare(b[filterKey.value.key]) * filterKey.value.order;
      });
    });
    const filterModifiedText = computed(() => {
      if (filterModified.value === 0) return 'ALL';
      if (filterModified.value === 1) return 'MODIFIED ONLY';
      else return 'UNMODIFIED ONLY';
    });

    const roles =
      currUser?.value?.role === 'ADMIN'
        ? ['BANNED', 'USER', 'FURRAX', 'MODERATOR']
        : ['BANNED', 'USER', 'FURRAX'];

    return {
      loading,
      users,
      modifiedUsers,
      filterModified,
      filterModifiedText,
      size: usersQueryResult.value.length,
      useFilterBy,
      filterKey,
      roles,
      currUser,
      elementByPage,
      currentPage,
      handleChangePage,
      popupPayload: {},
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
    test(e: any) {
      console.log(e);
    },
    wasModified(target: any, user: any) {
      const wasModified = target.value !== user.role;
      wasModified
        ? this.modifiedUsers.set(user.id, target.value)
        : this.modifiedUsers.delete(user.id);
    },
    update(user: any) {
      this.popupPayload = { user, newRole: this.modifiedUsers.get(user.id) };
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
