<template>
  <div class="search">
    <div>
      <div class="navTittle text-6xl m-20">🔎 Players List</div>
    </div>
    <div id="search-zone" class="grid grid-cols-5 gap-3 max-w-2xl">
      <div class="filterName text-sm">Filter:</div>
      <div class="search-criteria text-sm content-center">
        <select name="game w-auto">
          <option value="">game</option>
          <option value="game1">game1</option>
          <option value="game2">game2</option>
          <option value="game3">game3</option>
          <option value="game4">game4</option>
        </select>
      </div>
      <div class="search-criteria text-sm content-center">
        <select name="Notation" class="w-auto">
          <option value="">Notation</option>
          <option value="Notation1">Notation1</option>
          <option value="Notation2">Notation2</option>
          <option value="Notation3">Notation3</option>
          <option value="Notation4">Notation4</option>
        </select>
      </div>
      <div class="search-criteria text-sm content-center">
        <select name="sex" class="w-auto">
          <option value="">sex</option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="mtf">trans-mtf</option>
          <option value="ftm">trans-ftm</option>
        </select>
      </div>
      <div class="search-criteria text-sm content-center">
        <select name="language" class="w-auto">
          <option value="">language</option>
          <option value="Notation1">language</option>
          <option value="fr">french</option>
          <option value="en">english</option>
          <option value="du">dutch</option>
        </select>
      </div>
    </div>
    <div id="search-result"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Search'
});
</script>
<style lang="scss">
.search-criteria {
}
#search-zone {
  margin-left: 5rem;
}

#search-result {
  margin-left: 2.5rem;
}
</style>
