<template>
  <div class="relative z-30" :class="[isActive ? 'w-72' : 'w-52']" search-bar-default>
    <div
      id="search-bar"
      class="p-1 text-xs w-full border-default bg-purple-1000 transition duration-300 border"
      :class="[isActive ? 'rounded-t border-b-0' : 'rounded-sm']"
      @click="isActive = !isActive ? !isActive : isActive"
      v-click-outside="onClickOutside"
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
          placeholder="Search..."
          @keyup="handleSearchEvent"
        />
      </div>
    </div>
    <div
      :class="[
        isActive
          ? 'absolute shadow-xl bg-purple-950 w-full max-h-62 overflow-hidden overflow-y-scroll border border-default rounded-b scrollbar py-2 border-t-0'
          : 'hidden'
      ]"
    >
      <!-- <ul class="mt-3" v-if="results && results.games">
        <li v-for="game of results.games" :key="game.id">
          <div class="mt-1 mx-3 text-sm text-violet-300">Games</div>
          <div
            class="cursor-pointer mx-2 hover:bg-trueGray-800 rounded transition-colors duration-200"
          >
            <div class="h-20 px-2 flex items-center">
              <img class="w-12 h-12 rounded-lg mr-2" src="/images/rl.jpg" alt="game image" />
              <span>{{ game.name }}</span>
            </div>
          </div>
        </li>
      </ul> -->
      <h3 class="px-4 mb-2 font-bold text-gray-400">Profiles</h3>
      <Loader v-if="loading" class="ml-2" />
      <ul v-if="results && results.users">
        <router-link :to="`/user/${user.id}`" v-for="user of results.users" :key="user.id">
          <li class="cursor-pointer hover:bg-purple-1000 px-4 py-2">
            <div class="flex items-center">
              <img
                class="w-8 h-8 border-2 border-yellow-600 rounded-full mr-2"
                src="/images/lol.jpg"
                alt="player image"
              />
              <span>{{ user.username }}</span>
            </div>
          </li>
        </router-link>
      </ul>
      <div v-if="!totalLength" class="px-4">No results found...</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { debounce } from 'debounce';
import { useQuery, useResult } from '@vue/apollo-composable';
import clickOutside from '../library/click-outside';
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
  name: 'SearchBar',
  components: { Loader },
  setup() {
    const isActive = ref(false);
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
      inputRef.value = { input: (event.target as HTMLInputElement).value };
    }, 1000);

    const totalLength = computed(() => {
      if (!results.value?.games && !results.value?.users) {
        return 0;
      }
      return results.value.games.length + results.value.users.length;
    });

    const onClickOutside = () => {
      isActive.value = false;
    };

    return {
      handleSearchEvent,
      results,
      totalLength,
      loading,
      error,
      isActive,
      onClickOutside
    };
  },
  directives: {
    clickOutside
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
