<template>
  <div class="home">
    <section class="main-section relative flex flex-col justify-center items-center py-20 xl:py-32">
      <div class="bg-img">
        <img
          src="/images/backgrounds/lowres/rl.jpg"
          data-src="/images/backgrounds/rl.jpg"
          class="opacity-25 absolute left-0 top-0 lazyload w-full h-full object-cover"
        />
        <img
          src="/images/backgrounds/lowres/lol.jpg"
          data-src="/images/backgrounds/lol.jpg"
          class="opacity-25 absolute left-0 top-0 hidden lazyload w-full h-full object-cover"
        />
        <img
          src="/images/backgrounds/lowres/valorant.jpg"
          data-src="/images/backgrounds/valorant.jpg"
          class="opacity-25 absolute left-0 top-0 hidden lazyload w-full h-full object-cover"
        />
        <img
          src="/images/backgrounds/lowres/csgo.jpg"
          data-src="/images/backgrounds/csgo.jpg"
          class="opacity-25 absolute left-0 top-0 hidden lazyload w-full h-full object-cover"
        />
      </div>
      <!-- <div class="bg-mask absolute w-full h-full"></div> -->
      <div class="flex flex-col items-center px-4 md:px-0">
        <div class="w-full z-20 text-white flex flex-col items-center justify-center">
          <h1 class="uppercase font-bold mb-4 text-center lg:text-5xl text-4xl">
            Find your <span class="text-orange-600">perfect</span> teammate
          </h1>
          <p class="text-xl text-center" style="max-width: 500px">
            E-furrax helps you find the teammate that matches your requirements. Surrend at 20 is
            over.
          </p>
        </div>
        <div
          class="grid gap-4 grid-cols-1 grid-rows-4 sm:gap-4 md:grid-cols-2 sm:grid-rows-2 sm:gap-2 lg:grid-cols-4 lg:grid-rows-1 lg:gap-3 xl:grid-cols-4 xl:grid-rows-1 xl:gap-4 text-white games-preview z-20 pt-10 w-full"
        >
          <GamePreview
            name="Rocket League"
            src="/images/rl.jpg"
            background="/images/backgrounds/rl.jpg"
          />
          <GamePreview
            name="League of Legends"
            src="/images/lol.jpg"
            background="/images/backgrounds/lol.jpg"
          />
          <GamePreview
            name="Valorant"
            src="/images/valorant.jpg"
            background="/images/backgrounds/valorant.jpg"
          />
          <GamePreview
            name="CS:GO"
            src="/images/csgo.png"
            background="/images/backgrounds/csgo.jpg"
          />
        </div>
      </div>
    </section>
    <section class="bg-purple-1000 py-20 px-4 lg:px-0">
      <div
        class="container mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center"
      >
        <FeatureCard class="lg:w-1/3">
          <template v-slot:icon>
            <img src="/images/icons/badge.svg" width="100" />
          </template>
          <template v-slot:title> Player Profile </template>
          <template v-slot:description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque earum deserunt illum esse
            ad eligendi dolorem inventore ut! Dolore nihil provident porro tempore deleniti.
          </template>
        </FeatureCard>
        <FeatureCard class="lg:w-1/3 lg:px-12 lg:py-0 py-12">
          <template v-slot:icon>
            <img src="/images/icons/person_search.svg" width="100" />
          </template>
          <template v-slot:title> Find a Teammate </template>
          <template v-slot:description>
            Optio veniam distinctio ipsam voluptatum a, neque earum deserunt provident porro tempore
            deleniti.
          </template>
        </FeatureCard>
        <FeatureCard class="lg:w-1/3">
          <template v-slot:icon>
            <img src="/images/icons/forum.svg" width="100" />
          </template>
          <template v-slot:title> Play together </template>
          <template v-slot:description>
            Dolor sit amet ipsam voluptatum a, neque earum deseruntdolorem inventore ut! Dolore
            nihil provident porro tempore deleniti.
          </template>
        </FeatureCard>
      </div>
    </section>
    <WaveSeparator class="bg-purple-1000 text-purple-1100" />
    <section class="text-white py-20 flex flex-col items-center">
      <h3 class="mb-10 text-2xl text-center">
        Do you want to find a <span class="text-orange-600">teammate</span> and start winning again?
      </h3>
      <router-link
        to="/sign-up"
        class="uppercase px-4 py-3 bg-orange-600 hover:bg-orange-500 transition duration-300 font-bold rounded-sm"
      >
        Create an account
      </router-link>
    </section>
    <WaveSeparator class="text-purple-1200" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FeatureCard from '../components/FeatureCard.vue';
import GamePreview from '../components/GamePreview.vue';
import WaveSeparator from '../components/WaveSeparator.vue';

export default defineComponent({
  name: 'Home',
  components: {
    GamePreview,
    FeatureCard,
    WaveSeparator
  }
});
</script>

<style lang="scss" scoped>
.bg-mask {
  opacity: 1;
  background-image: url('/images/backgrounds/bg-mask.png');
  background-repeat: repeat;
}
</style>
