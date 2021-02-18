<template>
  <div class="flex flex-col bg-gray-200">
    <SearchBar placeholder="Search" class="bg-black m-4 w-2/5" />
    <ProfileList class="ml-10 mt-10" :profiles="mockUsers" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
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
  components: { SearchBar, ProfileList },
  data() {
    return {
      mockUsers
    };
  }
});
</script>
