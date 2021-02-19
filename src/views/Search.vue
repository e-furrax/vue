<template>
  <div class="container mx-auto px-2 pb-14" v-if="loaded">
    <div class="py-10 text-5xl text-white">Players List</div>
    <div class="flex text-white text-xs mb-5 items-center">
      <div class="mr-2">Filter</div>
      <div class="search-criteria mr-2">
        <select name="game w-auto">
          <option value="">Game</option>
          <option value="game1">LoL</option>
          <option value="game2">Valorant</option>
          <option value="game3">Rocket League</option>
          <option value="game4">CS:GO</option>
        </select>
      </div>
      <div class="search-criteria mr-2">
        <select name="Notation" class="w-auto">
          <option value="">Notation</option>
          <option value="Notation1">>= 1</option>
          <option value="Notation2">>= 2</option>
          <option value="Notation3">>= 3</option>
          <option value="Notation4">>= 4</option>
        </select>
      </div>
      <div class="search-criteria mr-2">
        <select name="gender" class="w-auto">
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="search-criteria">
        <select name="language" class="w-auto">
          <option value="">Language</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="du">Dutch</option>
        </select>
      </div>
    </div>
    <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
      <SearchCard v-for="user in users" :key="user.id" :user="user"></SearchCard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchCard from '../components/SearchCard.vue';

export default defineComponent({
  name: 'Search',
  components: {
    SearchCard
  },
  async created() {
    //this.users = await this.getUsers();
    this.loaded = true;
  },
  data() {
    return {
      //users: [] as UserModel[],
      loaded: false,
      users: [
        {
          id: 1,
          avatar: '/images/avatar1.png',
          cover: '/images/aurelion-sol.jpg',
          name: 'Tom',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis tincidunt libero, non mollis eros. Donec eget accumsan diam. Vestibulum varius quis ipsum eu blandit. Morbi sodales tempus gravida. Vivamus suscipit maximus feugiat. Quisque quis dapibus lacus. Duis egestas vitae arcu at aliquam. Nam eget augue ante. Curabitur iaculis nunc eu metus volutpat, at blandit ligula blandit. Donec sit amet enim sed mauris congue vestibulum.'
        },
        {
          id: 2,
          avatar: '/images/avatar1.png',
          cover: '/images/aurelion-sol.jpg',
          name: 'Pierre',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis tincidunt libero, non mollis eros. Donec eget accumsan diam. Vestibulum varius quis ipsum eu blandit. Morbi sodales tempus gravida. Vivamus suscipit maximus feugiat. Quisque quis dapibus lacus. Duis egestas vitae arcu at aliquam. Nam eget augue ante. Curabitur iaculis nunc eu metus volutpat, at blandit ligula blandit. Donec sit amet enim sed mauris congue vestibulum.'
        },
        {
          id: 3,
          avatar: '/images/avatar1.png',
          cover: '/images/aurelion-sol.jpg',
          name: 'Basile',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis tincidunt libero, non mollis eros. Donec eget accumsan diam. Vestibulum varius quis ipsum eu blandit. Morbi sodales tempus gravida. Vivamus suscipit maximus feugiat. Quisque quis dapibus lacus. Duis egestas vitae arcu at aliquam. Nam eget augue ante. Curabitur iaculis nunc eu metus volutpat, at blandit ligula blandit. Donec sit amet enim sed mauris congue vestibulum.'
        },
        {
          id: 4,
          avatar: '/images/avatar1.png',
          cover: '/images/aurelion-sol.jpg',
          name: 'Thomas',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis tincidunt libero, non mollis eros. Donec eget accumsan diam. Vestibulum varius quis ipsum eu blandit. Morbi sodales tempus gravida. Vivamus suscipit maximus feugiat. Quisque quis dapibus lacus. Duis egestas vitae arcu at aliquam. Nam eget augue ante. Curabitur iaculis nunc eu metus volutpat, at blandit ligula blandit. Donec sit amet enim sed mauris congue vestibulum.'
        },
        {
          id: 5,
          avatar: '/images/avatar1.png',
          cover: '/images/aurelion-sol.jpg',
          name: 'Tom',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis tincidunt libero, non mollis eros. Donec eget accumsan diam. Vestibulum varius quis ipsum eu blandit. Morbi sodales tempus gravida. Vivamus suscipit maximus feugiat. Quisque quis dapibus lacus. Duis egestas vitae arcu at aliquam. Nam eget augue ante. Curabitur iaculis nunc eu metus volutpat, at blandit ligula blandit. Donec sit amet enim sed mauris congue vestibulum.'
        },
        {
          id: 6,
          avatar: '/images/avatar1.png',
          cover: '/images/aurelion-sol.jpg',
          name: 'Pierre',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis tincidunt libero, non mollis eros. Donec eget accumsan diam. Vestibulum varius quis ipsum eu blandit. Morbi sodales tempus gravida. Vivamus suscipit maximus feugiat. Quisque quis dapibus lacus. Duis egestas vitae arcu at aliquam. Nam eget augue ante. Curabitur iaculis nunc eu metus volutpat, at blandit ligula blandit. Donec sit amet enim sed mauris congue vestibulum.'
        },
        {
          id: 7,
          avatar: '/images/avatar1.png',
          cover: '/images/aurelion-sol.jpg',
          name: 'Basile',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis tincidunt libero, non mollis eros. Donec eget accumsan diam. Vestibulum varius quis ipsum eu blandit. Morbi sodales tempus gravida. Vivamus suscipit maximus feugiat. Quisque quis dapibus lacus. Duis egestas vitae arcu at aliquam. Nam eget augue ante. Curabitur iaculis nunc eu metus volutpat, at blandit ligula blandit. Donec sit amet enim sed mauris congue vestibulum.'
        },
        {
          id: 8,
          avatar: '/images/avatar1.png',
          cover: '/images/aurelion-sol.jpg',
          name: 'Thomas',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis tincidunt libero, non mollis eros. Donec eget accumsan diam. Vestibulum varius quis ipsum eu blandit. Morbi sodales tempus gravida. Vivamus suscipit maximus feugiat. Quisque quis dapibus lacus. Duis egestas vitae arcu at aliquam. Nam eget augue ante. Curabitur iaculis nunc eu metus volutpat, at blandit ligula blandit. Donec sit amet enim sed mauris congue vestibulum.'
        }
      ]
    };
  }
});
</script>

<style lang="postcss" scoped>
.search-criteria > select {
  @apply bg-purple-1200 rounded-full px-3 py-1;
}
</style>
