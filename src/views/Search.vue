<template>
  <div class="search" v-if="loaded">
    <div>
      <div class="navTittle text-6xl m-20">🔎 Players List</div>
    </div>
    <div id="search-zone" class="grid grid-cols-5 gap-3 max-w-2xl">
      <div class="filterName text-sm">Filter:</div>
      <div class="search-criteria text-sm content-center">
        <select name="game w-auto">
          <option value="">game</option>
          <option value="game1">League of Legends</option>
          <option value="game2">valorant</option>
          <option value="game3">rocket league</option>
          <option value="game4">cs:go</option>
        </select>
      </div>
      <div class="search-criteria text-sm content-center">
        <select name="Notation" class="w-auto">
          <option value="">Notation</option>
          <option value="Notation1">>=1</option>
          <option value="Notation2">>=2</option>
          <option value="Notation3">>=3</option>
          <option value="Notation4">>=4</option>
        </select>
      </div>
      <div class="search-criteria text-sm content-center">
        <select name="sex" class="w-auto">
          <option value="">sex</option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="mtf">trans-mtf</option>
          <option value="ftm">trans-ftm</option>
        </select>
      </div>
      <div class="search-criteria text-sm content-center">
        <select name="language" class="w-auto">
          <option value="">language</option>
          <option value="Notation1">language</option>
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
import UserModel from '../models/User.model';

export default defineComponent({
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
      //users: [] as UserModel[],
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
  }
});
</script>
<style lang="scss">
.search-criteria {
}

#search-zone {
  margin-left: 5rem;
}

#search-result {
  margin-left: 2.5rem;
  margin-right: 2.5rem;
}
</style>
