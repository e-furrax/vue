<template>
  <header>
    <nav class="fixed w-full bg-purple-1050 h-14">
      <div class="flex text-white mx-4 h-full items-center justify-between">
        <div class="flex text-lg">
          <a class="cursor-pointer"><span>LOGO</span></a>
          <ul class="ml-14">
            <li
              class="mx-2 hover:text-orange-300 border-b border-transparent hover:border-orange-300 transition"
            >
              E-Furrax BackOffice
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  data() {
    return {
      isActive: false
    };
  }
});
</script>

<style>
.search-bar {
  border: 1px solid rgb(55, 43, 96);
  background-color: rgb(35, 28, 67);
}
</style>
