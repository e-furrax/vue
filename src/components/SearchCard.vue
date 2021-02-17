<template>
  <router-link
    to="/search"
    class="
    flex product-card border border-gray-400 p-4 rounded-sm my-4
    transition duration-300 cursor-pointer bg-white grid grid-cols-1"
  >
    <img src="/mock-pp.jpg" alt="profile picture" />
    <audio controls>
      <source src="/audio/audio-sample.mp3"/>
      Your browser does not support the audio element.
    </audio>
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
      expanded: false
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
    }
  }
});
</script>

<style lang="scss" scoped>
audio {
}
audio:not([controls]) {
  display: none !important;
}
img {
  max-width: 200px;
  max-height: 200px;
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
