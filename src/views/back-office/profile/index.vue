<template>
  <div class="flex flex-col">
    <SearchBar placeholder="Search" class="m-4 w-2/5" />
    <Loader v-if="loading" />
    <div v-else-if="error">Oops, an error occured: {{ error }}</div>
    <Pagination
      v-else-if="users"
      :element-by-page="10"
      :size="users.length"
      @change-page="handleChangePage"
    >
      <ProfileList class="mx-auto" :users="users" />
    </Pagination>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import { getUsers } from '@/apollo/user.gql';
import SearchBar from '@/components/SearchBar.vue';
import Loader from '@/components/Loader.vue';
import ProfileList from '@/components/back-office/ProfileList.vue';
import Pagination from '@/components/Pagination.vue';

export default defineComponent({
  name: 'Profile',
  components: { SearchBar, ProfileList, Loader, Pagination },
  setup() {
    const { result, loading, error } = useQuery(getUsers);
    const users = useResult(result, null, data => data.getUsers);
    return { users, loading, error };
  },
  data: () => ({
    currentPage: 1
  }),
  computed: {},
  methods: {
    handleChangePage(n: string) {
      this.currentPage = parseInt(n);
    }
  }
});
</script>
