<template>
  <div class="flex text-white h-full">
    <section class="flex flex-col w-1/3 border-r-2 border-opacity-20">
      <div class="m-16">
        <h1 class="font-bold text-2xl">Settings</h1>
        <ul class="my-10">
          <div v-for="route in settingsRouteChildren" :key="route.path">
            <router-link
              :to="`/profile/settings/${route.path}`"
              v-slot="{ href, route, navigate, isActive }"
              custom
            >
              <li :class="[isActive && 'router-settings-link-active']">
                <a
                  :href="href"
                  @click="navigate"
                  class="grid-container items-center text-gray-400 transition-colors duration-100"
                >
                  <span
                    class="rounded-xl h-10 w-10 bg-green-500 grid-area-icon flex items-center justify-center active-icon opacity-50"
                    ><i class="text-xs">{{ route.meta.icon }}</i></span
                  >
                  <span class="font-semibold grid-area-header text-lg">{{ route.name }}</span>
                  <span class="grid-area-chevron text-2xl">></span>
                  <span class="grid-area-info">{{ route.meta.additionalInformations }}</span>
                  <hr class="grid-area-hr mt-4 border-opacity-20" />
                </a>
              </li>
            </router-link>
          </div>
        </ul>
      </div>
    </section>
    <section class="flex flex-col w-2/3">
      <div class="mx-16">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { myProfileRoutes } from '@/router/myProfile';

export default defineComponent({
  name: 'Settings',
  setup() {
    const settingsRouteChildren = myProfileRoutes.children
      ?.filter(childRoute => childRoute.name === 'Settings')
      .map(settingsRoute => settingsRoute.children)[0];

    return {
      settingsRouteChildren
    };
  }
});
</script>

<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 15% 70% 5% 10%;
  grid-template-rows: auto;
  grid-template-areas:
    'icon header chevron .'
    '. info info .'
    '. hr hr hr';
  &:hover {
    color: rgba(255, 255, 255, 1);
  }
}
.grid-area-icon {
  grid-area: icon;
}
.grid-area-header {
  grid-area: header;
}
.grid-area-chevron {
  grid-area: chevron;
}
.grid-area-info {
  grid-area: info;
}
.grid-area-hr {
  grid-area: hr;
}
.border-opacity-20 {
  border-color: rgba(255, 255, 255, 0.2);
}
.router-settings-link-active {
  a {
    @apply text-white;
    .active-icon {
      opacity: 100;
    }
  }
}
</style>
