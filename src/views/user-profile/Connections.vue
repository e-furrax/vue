<template>
  <div class="flex flex-col items-start">
    <h2 class="font-semibold border-b-2 border-purple-800 mb-6">Connect your accounts</h2>
    <p class="text-sm sm:text-base">
      Connect your accounts to display your rank, username, number of games played and more on your
      profile.
    </p>
    <div>
      <button
        v-for="game of games"
        :key="game.name"
        class="game-button flex items-center w-full mt-2 border-none outline-none font-bold text-white uppercase text-sm leading-8 transition-all ease-in duration-200"
        @click="test"
      >
        <span
          class="transition duration-300 left rounded-l flex items-center px-4 h-10 bg-purple-800"
          ><img :src="game.image" width="24" alt="" />
        </span>
        <span
          class="transition duration-300 right px-4 h-10 w-full text-xs sm:text-sm sm:w-60 flex items-center bg-purple-700 rounded-r"
          >Link {{ game.name }}</span
        >
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { addGamesCSMutation, addGamesLolMutation } from '@/apollo/user.gql';
import { useMutation } from '@vue/apollo-composable';

interface AddGamesVariables {
  userName: string;
}
interface AddGamesModel {
  userName: string;
}

export default defineComponent({
  name: 'Connections',
  //riot version
  /*setup(props) {
    const { mutate: usersResult } = useMutation<Partial<AddGamesLolModel>, AddGamesLolVariables>(
        addGamesLolMutation
    );
    return { usersResult };
  },
  methods: {
    test() {
      console.log(this.usersResult({ userId: 'Ωuroborοs' }));
    }
  },*/
  //csGO version
  setup(props) {
    const { mutate: usersResult } = useMutation<Partial<AddGamesModel>, AddGamesVariables>(
      addGamesCSMutation
    );
    return { usersResult };
  },
  methods: {
    test() {
      this.usersResult({ userName: '76561198023279252'.toString() }).then(result => {
        console.log(result);
      });
    }
  },
  data: () => {
    return {
      games: [
        { name: 'League of Legends', image: '/images/icons/games/lol.webp' },
        { name: 'Rocket League', image: '/images/icons/games/rocket-league.png' },
        { name: 'Valorant', image: '/images/icons/games/valorant.png' },
        { name: 'CS:GO', image: '/images/icons/games/csgo.png' }
      ]
    };
  }
});
</script>

<style lang="postcss" scoped>
.game-button:hover .left {
  @apply bg-purple-700;
}

.game-button:hover .right {
  @apply bg-purple-600;
}
</style>
