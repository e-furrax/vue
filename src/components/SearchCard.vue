<template>
  <router-link
    :to="'/user/' + user.id"
    class="
      flex flex-col
      rounded
      border
      bg-purple-925
      profile-card
      rounded-sm
      transition
      duration-300
      cursor-pointer
      bg-white
      grid grid-cols-1
    "
  >
    <div class="relative profile-top h-28 flex relative flex-col items-center overflow-hidden">
      <div class="flex items-start justify-start flex-wrap p-2 w-full">
        <div
          v-for="game of user.games"
          :key="game.id"
          class="
            z-20
            game-tag
            mr-1
            mb-1
            text-xs
            border border-purple-700
            text-gray-300
            rounded-full
            px-2
            py-0.5
          "
        >
          {{ game.name }}
        </div>
      </div>
      <div class="flex absolute bottom-0 right-0 items-start justify-start flex-wrap pb-2 pr-2">
        <div v-for="language of user.languages" :key="language.id" class="z-20 mr-1">
          <img
            width="28"
            :src="`/images/icons/countries/${language.name}.png`"
            :title="language.name"
          />
        </div>
      </div>
      <div
        class="
          profile-cover
          z-10
          absolute
          w-full
          h-full
          top-0
          left-0
          bg-cover
          opacity-50
          transition
          duration-300
        "
        style="background: center / cover no-repeat url('/images/backgrounds/profile-header.jpeg')"
      ></div>
    </div>
    <div class="z-30 text-left p-2 w-full transform -translate-y-10 h-36">
      <div class="ml-4 flex items-end">
        <img
          src="/images/avatar1.png"
          class="profile-picture rounded-full border-4 border-purple-925 z-20 mr-3"
          alt="profile picture"
          style="width: 70px"
        />
        <div class="flex text-white items-center z-20 mb-2">
          <h3 class="font-bold username mr-1">{{ user.username }}</h3>
          <img
            v-if="user.gender.toLowerCase() === 'female' || user.gender.toLowerCase() === 'male'"
            width="18"
            :src="`/images/icons/${user.gender}.svg`"
          />
        </div>
      </div>
      <p class="description text-white opacity-60 h-14 text-sm my-2">
        {{ user.description || 'This user has no description.' }}
      </p>
      <div v-if="user.receivedRatings.length" class="text-sm flex items-start">
        <img src="/images/star-rate.svg" class="h-4" />
        <span class="pl-1 text-white"
          >{{
            (
              user.receivedRatings.reduce((a, v) => a + +v.rating, 0) / user.receivedRatings.length
            ).toFixed(2)
          }}
          ({{ user.receivedRatings.length }})</span
        >
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Search',
  props: {
    user: Object
  },
  data() {
    return {
      play: false
    };
  },
  methods: {}
});
</script>

<style lang="scss" scoped>
.profile-picture {
  border: 1px solid #3b2963;
}

.game-tag {
  color: #8571b3;
  border: 1px solid #584586;
}

.playButton {
  width: 5.5rem;
  height: 1.75rem;
}

.profile-card {
  box-shadow: 0px 15px 20px 0px rgb(17 10 40 / 40%);
  border: 1px solid #3b2963;

  .profile-top {
    border-bottom: 1px solid #3b2963;
  }

  .description {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  &:hover {
    box-shadow: 0px 15px 20px 0px rgb(17 10 40 / 80%);
  }
}
</style>
