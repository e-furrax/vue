<template>
  <h1 class="text-2xl font-bold text-white">Choose your games (1/2)</h1>
  <section>
    <input
      type="text"
      id="search"
      class="border-0 border-b-2 border-purple-800 h-12 p-4 bg-purple-200 w-full"
      placeholder="Search a game..."
      @input="handleFilter($event)"
    />
    <div class="flex flex-wrap overflow-hidden sm:-mx-4 mt-4">
      <div
        v-for="game in clonedGames"
        :key="game.id"
        class="my-2 px-2 w-full overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-2 md:px-2 md:w-1/2 lg:my-2 lg:px-2 lg:w-1/3 xl:my-2 xl:px-2 xl:w-1/4"
      >
        <div class="h-40 space-y-3">
          <img
            class="text-center object-cover h-28 cursor-pointer rounded-md w-full"
            :src="getBgImage(game.name)"
            :class="game.selected && 'border-green-400 border-2'"
            @click="game.selected = !game.selected"
          />
          <div class="inline-flex cursor-pointer space-x-2" @click="game.selected = !game.selected">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              class="fill-current"
              :class="game.selected ? 'text-green-400 opacity-100' : 'text-gray-500 opacity-50'"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"
              />
            </svg>
            <span class="text-white">{{ game.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <p class="text-purple-100 text-sm">More games are coming soon</p>
</template>
<script lang="ts">
import { getGames } from '@/apollo/game.gql';
import GameModel, { GameQuery } from '@/models/game.model';
import { useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  setup() {
    const { result: gamesResult, loading: gamesLoading } = useQuery<GameQuery>(getGames);
    const games = useResult(gamesResult, null, data => data.getGames);
    const clonedGames = ref<GameModel[]>([]);
    const clonedGames2 = ref<GameModel[]>([]);
    const bgImages = new Map([
      ['League of Legends', '/images/backgrounds/lol.jpg'],
      ['CS:GO', '/images/backgrounds/csgo.jpg'],
      ['Rocket League', '/images/backgrounds/rl.jpg'],
      ['Valorant', '/images/backgrounds/valorant.jpg']
    ]);

    const getBgImage = (gameName: string): string | undefined => bgImages.get(gameName);

    const gamesWithSelectedState = (): GameModel[] | [] => {
      if (games.value) {
        return games.value.map(game => ({
          ...game,
          selected: false
        }));
      } else {
        return [];
      }
    };

    if (games.value) {
      clonedGames.value = gamesWithSelectedState();
      clonedGames2.value = gamesWithSelectedState();
    }

    watch(games, () => {
      clonedGames.value = gamesWithSelectedState();
      clonedGames2.value = gamesWithSelectedState();
    });

    const handleFilter = (event: Event) => {
      const query = (event.target as HTMLInputElement).value;
      clonedGames.value =
        query && query.length > 2
          ? clonedGames.value.filter(game => {
              return query
                .toLowerCase()
                .split(' ')
                .every(v => game.name.toLowerCase().includes(v));
            })
          : clonedGames2.value;
    };

    return {
      clonedGames,
      gamesLoading,
      handleFilter,
      getBgImage
    };
  }
});
</script>

<style lang="postcss" scoped></style>
