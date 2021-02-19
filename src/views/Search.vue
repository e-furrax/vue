<template>
  <div class="search" v-if="loaded">
    <div>
      <div class="navTittle text-6xl m-20">🔎 Players List</div>
    </div>
    <div id="search-zone" class="grid grid-cols-4 w-96 ">
      <div class="filterName text-sm text-white">Filter:</div>
      <div class="search-criteria text-sm content-center">
        <select name="game" ref="game" class="w-auto">
          <option value="">game</option>
          <option value="game1">League of Legends</option>
          <option value="game2">valorant</option>
          <option value="game3">rocket league</option>
          <option value="game4">cs:go</option>
        </select>
      </div>
      <div class="search-criteria text-sm content-center">
        <select name="notation" ref="notation" class="w-auto">
          <option value="">Notation</option>
          <option value="Notation1">>=1</option>
          <option value="Notation2">>=2</option>
          <option value="Notation3">>=3</option>
          <option value="Notation4">>=4</option>
        </select>
      </div>
      <div class="search-criteria text-sm content-center">
        <select name="language" ref="language" class="w-auto">
          <option value="">language</option>
          <option value="fr">french</option>
          <option value="en">english</option>
          <option value="du">dutch</option>
        </select>
      </div>
    </div>
    <div id="search-result" class="grid grid-cols-5 gap-3">
      <SearchCard v-for="user in users" :key="user.id" :user="user"></SearchCard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchCard from '../components/SearchCard.vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';

export default defineComponent({
  setup() {
    const { result, loading, error, variables } = useQuery(
      gql`
        query filterUsers($data: UserFilterInput!) {
          filterUsers(data: $data) {
            id
            username
            description
          }
        }
      `,
      {
        data: {
          gameId: 1,
          languageCode: 'fr',
          notation: 0
        }
      }
    );
    const users1 = useResult(result, null, data => data.filterUsers);
    return {
      users1,
      loading,
      error,
      variables
    };
  },
  name: 'Search',
  components: {
    SearchCard
  },
  async created() {
    //this.users = await this.getUsers();
    this.loaded = true;
  },
  data: function() {
    return {
      loaded: false,
      users: [
        {
          id: 1,
          image: '/mock-pp.jpg',
          name: 'Tom',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis tincidunt libero, non mollis eros. Donec eget accumsan diam. Vestibulum varius quis ipsum eu blandit. Morbi sodales tempus gravida. Vivamus suscipit maximus feugiat. Quisque quis dapibus lacus. Duis egestas vitae arcu at aliquam. Nam eget augue ante. Curabitur iaculis nunc eu metus volutpat, at blandit ligula blandit. Donec sit amet enim sed mauris congue vestibulum.'
        },
        {
          id: 2,
          image: '/mock-pp.jpg',
          name: 'Pierre',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis tincidunt libero, non mollis eros. Donec eget accumsan diam. Vestibulum varius quis ipsum eu blandit. Morbi sodales tempus gravida. Vivamus suscipit maximus feugiat. Quisque quis dapibus lacus. Duis egestas vitae arcu at aliquam. Nam eget augue ante. Curabitur iaculis nunc eu metus volutpat, at blandit ligula blandit. Donec sit amet enim sed mauris congue vestibulum.'
        },
        {
          id: 3,
          image: '/mock-pp.jpg',
          name: 'Basile',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis tincidunt libero, non mollis eros. Donec eget accumsan diam. Vestibulum varius quis ipsum eu blandit. Morbi sodales tempus gravida. Vivamus suscipit maximus feugiat. Quisque quis dapibus lacus. Duis egestas vitae arcu at aliquam. Nam eget augue ante. Curabitur iaculis nunc eu metus volutpat, at blandit ligula blandit. Donec sit amet enim sed mauris congue vestibulum.'
        },
        {
          id: 4,
          image: '/mock-pp.jpg',
          name: 'Thomas',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis tincidunt libero, non mollis eros. Donec eget accumsan diam. Vestibulum varius quis ipsum eu blandit. Morbi sodales tempus gravida. Vivamus suscipit maximus feugiat. Quisque quis dapibus lacus. Duis egestas vitae arcu at aliquam. Nam eget augue ante. Curabitur iaculis nunc eu metus volutpat, at blandit ligula blandit. Donec sit amet enim sed mauris congue vestibulum.'
        },
        {
          id: 5,
          image: '/mock-pp.jpg',
          name: 'Tom',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis tincidunt libero, non mollis eros. Donec eget accumsan diam. Vestibulum varius quis ipsum eu blandit. Morbi sodales tempus gravida. Vivamus suscipit maximus feugiat. Quisque quis dapibus lacus. Duis egestas vitae arcu at aliquam. Nam eget augue ante. Curabitur iaculis nunc eu metus volutpat, at blandit ligula blandit. Donec sit amet enim sed mauris congue vestibulum.'
        },
        {
          id: 6,
          image: '/mock-pp.jpg',
          name: 'Pierre',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis tincidunt libero, non mollis eros. Donec eget accumsan diam. Vestibulum varius quis ipsum eu blandit. Morbi sodales tempus gravida. Vivamus suscipit maximus feugiat. Quisque quis dapibus lacus. Duis egestas vitae arcu at aliquam. Nam eget augue ante. Curabitur iaculis nunc eu metus volutpat, at blandit ligula blandit. Donec sit amet enim sed mauris congue vestibulum.'
        },
        {
          id: 7,
          image: '/mock-pp.jpg',
          name: 'Basile',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis tincidunt libero, non mollis eros. Donec eget accumsan diam. Vestibulum varius quis ipsum eu blandit. Morbi sodales tempus gravida. Vivamus suscipit maximus feugiat. Quisque quis dapibus lacus. Duis egestas vitae arcu at aliquam. Nam eget augue ante. Curabitur iaculis nunc eu metus volutpat, at blandit ligula blandit. Donec sit amet enim sed mauris congue vestibulum.'
        },
        {
          id: 8,
          image: '/mock-pp.jpg',
          name: 'Thomas',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis tincidunt libero, non mollis eros. Donec eget accumsan diam. Vestibulum varius quis ipsum eu blandit. Morbi sodales tempus gravida. Vivamus suscipit maximus feugiat. Quisque quis dapibus lacus. Duis egestas vitae arcu at aliquam. Nam eget augue ante. Curabitur iaculis nunc eu metus volutpat, at blandit ligula blandit. Donec sit amet enim sed mauris congue vestibulum.'
        }
      ]
    };
  },
  methods: {
    update() {
      const game: number = (this.$refs.game as any).valueAsNumber;
      const notation: number = (this.$refs.notation as any).valueAsNumber;
      const language: string = (this.$refs.language as any).valueAsString;
      this.variables = {
        data: {
          gameId: game,
          languageCode: language,
          notation: notation
        }
      };
    }
  }
});
</script>
<style lang="scss">
.search-criteria {
  width: 5rem;
  overflow: hidden;
}

#search-zone {
  margin-left: 5rem;
}

#search-result {
  margin-left: 2.5rem;
  margin-right: 2.5rem;
}
</style>
