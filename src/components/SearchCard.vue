<template>
  <router-link
    to="/search"
    class="
    flex product-card border border-gray-400 p-4 rounded-sm my-4
    transition duration-300 cursor-pointer bg-white grid grid-cols-1"
  >
    <div>
      <img src="/mock-pp.jpg" alt="profile picture" />
      <div id="user-plus">
        <div v-on:click="playOrPause(user.id)" class="playButton">
          <audio :id="'audio-' + user.id" name="audio" src="/audio/audio-sample.mp3" />
          <img src="/play.png" class="play" v-if="!play" alt="play" />
          <img src="/pause.png" class="play" v-if="play" alt="pause" />
        </div>
      </div>
    </div>
    <div class="flex flex-col text-left pl-2 w-full">
      <h3 class="font-bold mb-1">{{ user.name }}</h3>
      <hr class="border-gray-400 my-2 w-full" />
      <p class="description text-sm">
        <span class="text-gray-600">Presentation: </span>
        {{ user.description }}
      </p>
      <a
        v-on:click.stop.prevent
        v-on:click="readMoreOrLess"
        class="read-more hover:text-blue-700 text-sm underline"
      >
        Read more
      </a>
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
  data: function() {
    return {
      expanded: false,
      play: false
    };
  },
  methods: {
    readMoreOrLess(event: Event): void {
      const target = event.target as HTMLElement;
      const parent = target.parentNode!;
      const readMoreElement = parent.querySelector('.description') as HTMLParagraphElement;

      if (!this.expanded) {
        this.expanded = true;
        target.textContent = 'Read less';
        readMoreElement.style.webkitLineClamp = '99';
        return;
      }

      this.expanded = false;
      readMoreElement.style.webkitLineClamp = '3';
      target.textContent = 'Read more';
    },
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
img {
  max-width: 200px;
  max-height: 200px;
}
.play {
  padding-top: 2.5px;
  margin-left: 15px;
  width: 20px;
  height: 17.5px;
}
.playButton {
  width: 50px;
  height: 20px;
  border-radius: 60px;
  background: #8d65ea;
  opacity: 0.8;
}
.product-card:hover {
  box-shadow: 0 0.6rem 0.6rem rgba(0, 0, 0, 0.1);
}

.description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.read-more {
  user-select: none;
}
</style>
