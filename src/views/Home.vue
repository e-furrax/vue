<template>
  <div class="home">
    <section class="relative full-vh flex flex-col justify-center items-center">
      <div id="particles-js" class="absolute full-h w-full"></div>
      <div class="w-full z-20 text-white flex flex-col items-center justify-center">
        <h1 class="uppercase text-4xl font-bold">Find your perfect teammate</h1>
        <p class="text-xl">
          E-furrax helps you find the teammate that matches your requirements. Surrend at 20 is
          over.
        </p>
      </div>
      <div class="flex justify-center text-white games-preview z-20 pt-10">
        <GamePreview name="Rocket League" src="/images/rl.jpg" />
        <GamePreview name="League of Legends" src="/images/lol.jpg" />
        <GamePreview name="Valorant" src="/images/valorant.jpg" />
        <GamePreview name="CS:GO" src="/images/csgo.png" />
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
.full-vh {
  height: 100vh;
}
</style>
