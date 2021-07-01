<template>
  <div class="h-full w-full fixed top-0 left-0 z-50 burger-menu invisible" data-opened="false">
    <div
      class="burger-layer w-full h-full bg-black transition duration-300 opacity-0"
      @click="handleBurger"
    ></div>
    <div
      class="burger-nav absolute top-0 left-0 bg-purple-1200 h-full translate-x-240"
      style="width: 240px"
    >
      <ul class="h-14 border-b border-purple-1000 flex items-center">
        <img
          src="/images/icons/menu.svg"
          class="block pl-6 mr-6 cursor-pointer opacity-50"
          @click="handleBurger"
        />
        <router-link to="/" class="text-lg flex items-center" @click="handleBurger">
          <img src="/images/e-furrax.svg" width="24" /><span class="ml-3 text-base">E-FURRAX</span>
        </router-link>
      </ul>
      <ul class="py-3 border-b border-purple-1000">
        <li class="cursor-pointer px-6 py-2 hover:bg-purple-1000" @click="handleBurger">
          <router-link to="/" class="flex items-center">
            <img src="/images/icons/home.svg" class="opacity-50 mr-6" />
            <span>Home</span>
          </router-link>
        </li>
        <li class="cursor-pointer px-6 py-2 hover:bg-purple-1000" @click="handleBurger">
          <router-link to="/search" class="flex items-center">
            <img src="/images/icons/person_search.svg" class="opacity-50 mr-6" />
            <span>Find your teammate</span>
          </router-link>
        </li>
        <!-- <li class="cursor-pointer px-6 py-2 hover:bg-purple-1000" @click="handleBurger">
          <router-link to="/profile" class="flex items-center">
            <img src="/images/icons/person.svg" class="opacity-50 mr-6" />
            <span>Profile</span>
          </router-link>
        </li> -->
      </ul>
      <ul v-if="!user" class="py-3 px-4 flex flex-col items-start">
        <li
          class="
            px-3
            py-1
            cursor-pointer
            bg-orange-600
            hover:bg-orange-700
            transition
            duration-300
            rounded
          "
          @click="handleBurger"
        >
          <router-link to="/sign-up"> Sign Up </router-link>
        </li>
        <li
          @click="handleBurger"
          class="
            px-3
            py-1
            mt-3
            cursor-pointer
            rounded
            bg-transparent
            border border-purple-400
            text-purple-400
            hover:border-purple-300
            hover:text-purple-300
            transition
            duration-300
          "
        >
          <router-link to="/sign-in"> Log In </router-link>
        </li>
      </ul>
      <button
        v-else
        class="
          my-3
          mx-4
          px-3
          py-1
          mx-2
          rounded
          bg-transparent
          border border-purple-400
          text-purple-400
          hover:border-purple-300
          hover:text-purple-300
          transition
          duration-300
        "
        @click="handleLogout"
      >
        Log Out
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuth } from '@/composables/auth';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HeaderBurger',
  inject: ['handleBurger'],
  setup() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
      logout().then(() => {
        router.push({ name: 'Home' });
      });
    };

    return {
      user,
      handleLogout
    };
  }
});
</script>

<style lang="scss" scoped>
.translate-x-240 {
  transform: translateX(-240px);
}

.burger-nav {
  transition: transform 0.3s ease;
}
</style>
