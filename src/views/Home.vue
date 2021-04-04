<template>
  <div class="home">
    <section
      class="relative main-section flex flex-col justify-center items-center overflow-hidden"
    >
      <div class="bg-img">
        <img
          src="/images/backgrounds/lowres/rocket-league.jpg"
          data-src="/images/backgrounds/rocket-league.jpg"
          class="opacity-25 absolute left-0 top-0 lazyload w-full h-full object-cover"
        />
        <img
          src="/images/backgrounds/lowres/league-of-legends.jpg"
          data-src="/images/backgrounds/league-of-legends.jpg"
          class="opacity-25 absolute left-0 top-0 hidden lazyload w-full h-full object-cover"
        />
        <img
          src="/images/backgrounds/lowres/valorant.png"
          data-src="/images/backgrounds/valorant.png"
          class="opacity-25 absolute left-0 top-0 hidden lazyload w-full h-full object-cover"
        />
        <img
          src="/images/backgrounds/lowres/csgo.jpg"
          data-src="/images/backgrounds/csgo.jpg"
          class="opacity-25 absolute left-0 top-0 hidden lazyload w-full h-full object-cover"
        />
      </div>
      <div class="bg-mask absolute w-full h-full"></div>
      <div class="flex flex-col" style="margin-top: -3.5rem">
        <div class="w-full z-20 text-white flex flex-col items-center justify-center">
          <h1 class="uppercase text-5xl font-bold mb-4">
            Find your <span class="text-orange-600">perfect</span> teammate
          </h1>
          <p class="text-xl text-center" style="width: 500px">
            E-furrax helps you find the teammate that matches your requirements. Surrend at 20 is
            over.
          </p>
        </div>
        <div class="flex justify-center text-white games-preview z-20 pt-10">
          <GamePreview
            name="Rocket League"
            src="/images/rl.jpg"
            background="/images/backgrounds/rocket-league.jpg"
          />
          <GamePreview
            name="League of Legends"
            src="/images/lol.jpg"
            background="/images/backgrounds/league-of-legends.jpg"
          />
          <GamePreview
            name="Valorant"
            src="/images/valorant.jpg"
            background="/images/backgrounds/valorant.png"
          />
          <GamePreview
            name="CS:GO"
            src="/images/csgo.png"
            background="/images/backgrounds/csgo.jpg"
          />
        </div>
      </div>
    </section>
    <section class="text-white py-20 bg-purple-1000 flex flex-col items-center">
      <h3 class="mb-10 text-2xl">Do you want to find a teammate and start winning again?</h3>
      <router-link
        to="/sign-up"
        class="uppercase px-4 py-3 bg-orange-600 hover:bg-orange-500 transition duration-300 font-bold rounded-sm"
      >
        Create an account
      </router-link>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GamePreview from '../components/GamePreview.vue';

export default defineComponent({
  name: 'Home',
  components: {
    GamePreview
  }
});
</script>

<style lang="scss" scoped>
.main-section {
  height: calc(100vh - 3.5rem);
}
.bg-mask {
  opacity: 1;
  background-image: url('/images/backgrounds/bg-mask.png');
  background-repeat: repeat;
}
</style>
