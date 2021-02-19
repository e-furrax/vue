<template>
  <router-link
    to="/search"
    class="flex flex-col rounded border bg-purple-925 profile-card rounded-sm transition duration-300 cursor-pointer bg-white grid grid-cols-1"
  >
    <div class="profile-top flex relative flex-col items-center overflow-hidden">
      <div
        class="profile-cover absolute w-full h-full top-0 left-0 bg-cover opacity-50 transition duration-300"
        :style="`background-image: url('${user.cover}')`"
      ></div>
      <img
        :src="user.avatar"
        class="rounded-full border-2 border-yellow-800 z-20 mt-2"
        alt="profile picture"
        style="width: 150px"
      />
      <div class="flex flex-col text-white items-center z-20 mb-2 mt-1">
        <h3 class="font-bold username">{{ user.name }}</h3>
        <div class="text-xs flex items-center">
          <img src="/images/star-rate.svg" class="h-4" />
          <span class="pl-1">4.8 (232)</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col text-left p-2 w-full">
      <p class="description text-gray-400 text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ullam quis explicabo vero
        modi nobis obcaecati hic assumenda cupiditate suscipit, velit dolores veniam sequi minus
        natus corporis molestiae consequatur itaque?
      </p>
      <div class="flex text-white justify-between items-center">
        <span class="text-lg">$4<span class="text-xs">.00/G</span></span>
        <div
          v-on:click="playOrPause(user.id)"
          class="flex items-center justify-between playButton bg-purple-1100 rounded-full px-2 hover:bg-purple-1200 transition duration-300"
        >
          <audio :id="'audio-' + user.id" name="audio" src="/audio/audio-sample.mp3" />
          <img src="/images/sound.svg" class="h-5" alt="wave" />
          <img src="/images/play.svg" class="h-5" v-if="!play" alt="play" />
          <img src="/images/pause.svg" class="h-5" v-if="play" alt="pause" />
        </div>
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
  methods: {
    playOrPause(id: string): void {
      const audio = document.getElementById('audio-' + id) as HTMLAudioElement;
      if (audio.paused) {
        audio.play();
        this.play = true;
      } else {
        audio.pause();
        this.play = false;
      }
      audio.onended = () => {
        this.play = false;
      };
    }
  }
});
</script>

<style lang="scss" scoped>
audio {
  display: none;
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

    .profile-cover {
      transform: scale(1.1);
    }
  }
}
</style>
