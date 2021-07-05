<template>
  <h1 class="text-2xl font-bold text-white">Basic Information (2/2)</h1>
  <section>
    <Availability @availability-change="handleAvailabilityChange" />
  </section>
</template>
<script lang="ts">
import { getGames } from '@/apollo/game.gql';
import GameModel, { GameQuery } from '@/models/game.model';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent, ref, watch } from 'vue';
import Availability from '@/components/become-furrax/Availability.vue';
import { updateAvailabilityMutation } from '@/apollo/availability.gql';

interface UpdateAvailabilityVariables {
  value: string;
}

interface AvailabilityMutation {
  updateAvailability: UpdateAvailabilityVariables;
}

export default defineComponent({
  components: { Availability },
  setup() {
    const { result: gamesResult, loading: gamesLoading } = useQuery<GameQuery>(getGames);
    const games = useResult(gamesResult, null, data => data.getGames);
    const clonedGames = ref<GameModel[]>([]);
    const clonedGames2 = ref<GameModel[]>([]);
    const availibility = ref([]);
    const bgImages = new Map([
      ['League of Legends', '/images/backgrounds/lol.jpg'],
      ['CS:GO', '/images/backgrounds/csgo.jpg'],
      ['Rocket League', '/images/backgrounds/rl.jpg'],
      ['Valorant', '/images/backgrounds/valorant.jpg']
    ]);

    const { mutate: updateAvailability } = useMutation<
      AvailabilityMutation,
      UpdateAvailabilityVariables
    >(updateAvailabilityMutation);

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

    const handleAvailabilityChange = (event: any) => {
      availibility.value = event;
    };

    return {
      clonedGames,
      gamesLoading,
      handleFilter,
      getBgImage,
      handleAvailabilityChange
    };
  }
});
</script>

<style lang="postcss" scoped></style>
