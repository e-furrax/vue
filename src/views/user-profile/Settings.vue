<template>
  <router-view name="header" />
  <div class="flex text-white h-full">
    <section class="flex flex-col border-r border-opacity-10 bg-purple-1200 md:w-84">
      <div class="py-6">
        <ul class="">
          <div v-for="route in settingsRoutes" :key="route.path">
            <router-link
              :to="`/settings/${route.path}`"
              v-slot="{ href, route, navigate, isActive }"
              custom
            >
              <li :class="[isActive && 'border-y router-settings-link-active']">
                <a
                  :href="href"
                  @click="navigate"
                  class="flex h-16 px-4 md:px-6 items-center transition-colors duration-100 hover:bg-purple-1000"
                >
                  <img
                    :src="`/images/${route.meta.icon}`"
                    class="opacity-100"
                    style="width: 24px; max-width: inherit"
                  />
                  <div class="ml-2 md:flex hidden flex-col">
                    <h3 class="font-semibold text-sm text-white">{{ route.name }}</h3>
                    <span class="text-xs text-gray-300">
                      {{ route.meta.additionalInformations }}
                    </span>
                  </div>
                </a>
              </li>
            </router-link>
          </div>
        </ul>
      </div>
    </section>
    <section class="flex flex-col mt-6 w-full">
      <div class="mx-6">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { settingsRoutes } from '@/router/myProfile';

export default defineComponent({
  name: 'Settings',
  setup() {
    // const settingsRouteChildren = myProfileRoutes
    //   ?.filter(childRoute => childRoute.name === 'Settings')
    //   .map(settingsRoute => settingsRoute.children)[0];
    // console.log(myProfileRoutes);

    return {
      settingsRoutes
    };
  }
});
</script>

<style lang="postcss" scoped>
.border-opacity-20 {
  border-color: rgba(255, 255, 255, 0.2);
}
.router-settings-link-active {
  img {
    @apply opacity-100;
  }
  h3 {
    @apply text-white;
  }
  span {
    @apply text-gray-200;
  }
}
</style>
