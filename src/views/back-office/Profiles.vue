<template>
  <div class="flex flex-col">
    <SearchBar placeholder="Search" class="bg-black m-4 w-2/5" />
    <Loader v-if="loading" />
    <ProfileList
      v-else-if="result && result.getUsers"
      class="ml-10 mt-10"
      :profiles="result.getUsers"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { getUsers } from '@/apollo/user.gql.ts';
import SearchBar from '@/components/SearchBar.vue';
import Loader from '@/components/Loader.vue';
import ProfileList from '@/components/back-office/ProfileList.vue';

const mockUsers = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  .split(' ')
  .map((user, i) => ({
    id: i,
    username: user,
    email: `${user}-email@email.com`,
    roles: ['Furry'],
    ratings: [],
    meetings: []
  }));

export default defineComponent({
  name: 'Profile',
  components: { SearchBar, ProfileList, Loader },
  setup() {
    const { result, loading } = useQuery(getUsers);
    return {
      result,
      loading
    };
  },
  data() {
    return {
      mockUsers
    };
  }
});
</script>
