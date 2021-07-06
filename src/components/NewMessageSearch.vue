<template>
  <div>
    <div
      id="search-bar"
      class="p-2 text-xs w-full border-default bg-purple-1000 transition duration-300 border"
    >
      <div class="flex">
        <svg fill="currentColor" viewBox="0 0 512.005 512.005" class="search-icon ml-2 mr-3">
          <path
            d="M505.749 475.587l-145.6-145.6c28.203-34.837 45.184-79.104 45.184-127.317C405.333 90.926 314.41.003 202.666.003S0 90.925 0 202.669s90.923 202.667 202.667 202.667c48.213 0 92.48-16.981 127.317-45.184l145.6 145.6c4.16 4.16 9.621 6.251 15.083 6.251s10.923-2.091 15.083-6.251c8.341-8.341 8.341-21.824-.001-30.165zM202.667 362.669c-88.235 0-160-71.765-160-160s71.765-160 160-160 160 71.765 160 160-71.766 160-160 160z"
          ></path>
        </svg>
        <input
          class="outline-none text-white border-none bg-transparent w-full"
          type="text"
          autocomplete="off"
          placeholder="Search username"
          @keyup="handleSearchEvent"
        />
      </div>
    </div>
    <div
      class="
        shadow-xl
        bg-purple-950
        w-full
        max-h-62
        overflow-hidden overflow-y-scroll
        border border-default
        rounded-b
        scrollbar
        py-2
        border-t-0
      "
    >
      <div class="h-72">
        <Loader v-if="loading" class="ml-2" />
        <ul v-if="results && results.users">
          <li
            class="cursor-pointer hover:bg-purple-1000 border-b border-default px-4 py-2"
            v-for="user of results.users"
            :key="user.id"
            @click="$emit('user-selected', user.id)"
          >
            <div class="flex items-center">
              <img
                class="w-10 h-10 rounded-full mr-2"
                :src="user.profileImage || '/images/avatar1.png'"
                alt="player image"
              />
              <span>{{ user.username }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { debounce } from 'debounce';
import { useQuery, useResult } from '@vue/apollo-composable';
import Loader from './Loader.vue';
import { searchByUsernameOrGamename } from '@/apollo/search.gql';

interface SearchApiResponse {
  SearchByUsernameOrGamename: SearchApiData;
}

interface SearchApiData {
  games: {
    name: string;
    id: string;
  }[];
  users: {
    username: string;
    id: string;
  }[];
}

export default defineComponent({
  name: 'NewMessageSearch',
  components: { Loader },
  setup() {
    const inputRef = ref({
      input: ''
    });
    const enabled = ref(false);
    const { result, loading, error } = useQuery<SearchApiResponse>(
      searchByUsernameOrGamename,
      inputRef,
      () => ({
        enabled: enabled.value
      })
    );

    const results = useResult(result);

    const handleSearchEvent = debounce((event: KeyboardEvent) => {
      if (!enabled.value) {
        enabled.value = true;
      }
      const eventValue = (event.target as HTMLInputElement).value;
      if (eventValue) {
        inputRef.value = { input: (event.target as HTMLInputElement).value };
      }
    }, 1000);

    const totalLength = computed(() => {
      if (!results.value?.games && !results.value?.users) {
        return 0;
      }
      return results.value.games.length + results.value.users.length;
    });

    return {
      handleSearchEvent,
      results,
      totalLength,
      loading,
      error
    };
  }
});
</script>

<style lang="postcss" scoped>
.search-icon {
  display: flex;
  width: 1rem;
  height: 1rem;
  fill: rgb(137, 145, 182);
}

.border-default {
  border-color: rgb(55, 43, 96);
}

.scrollbar::-webkit-scrollbar-track {
  border: 1px solid #000;
  padding: 2px 0;
  background-color: #404040;
}

.scrollbar::-webkit-scrollbar {
  width: 10px;
}

.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #737272;
  border: 1px solid #000;
}
</style>
