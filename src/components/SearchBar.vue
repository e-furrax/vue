<template>
  <div class="relative">
    <div
      id="search-bar"
      class="p-1 text-xs mr-4 rounded-full bg-gray-900 search-bar transition duration-300 border"
      :class="[isActive ? 'border-purple-800 w-96' : 'search-bar-default']"
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
          ? 'absolute bg-purple-1200 w-full max-h-80 overflow-hidden overflow-y-scroll rounded scrollbar py-2'
          : 'hidden'
      ]"
    >
      <Loader v-if="loading" />
      <ul class="mt-3" v-if="results && results.games">
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
      </ul>
      <ul class="mt-3" v-if="results && results.users">
        <li v-for="user of results.users" :key="user.id">
          <div class="mt-1 mx-3 text-sm text-violet-300">Furrax</div>
          <div
            class="cursor-pointer mx-2 hover:bg-trueGray-800 rounded transition-colors duration-200"
          >
            <div class="h-20 px-2 flex items-center">
              <img class="w-12 h-12 rounded-lg mr-2" src="/images/lol.jpg" alt="player image" />
              <span>{{ user.username }}</span>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="!totalLength">no results found</div>
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

.search-bar {
  background-color: rgb(35, 28, 67);
}

.search-bar-default {
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
