<template>
  <div v-if="usersError" class="mt-10 container mx-auto">
    <Error :message="usersError.message"></Error>
  </div>
  <div v-else class="container mx-auto px-2 pb-14 flex flex-col items-start">
    <div class="my-10 text-2xl text-white">Players List</div>
    <Form
      @submit="onSubmit"
      @change="onChange"
      :validation-schema="schema"
      class="flex flex-wrap text-white text-xs mb-5 items-center"
    >
      <div class="search-criteria mb-2 mr-2">
        <Field as="select" name="games">
          <option value="" select hidden>All games</option>
          <option v-for="game of games" :key="game.id" :value="game.id">{{ game.name }}</option>
        </Field>
      </div>
      <div class="search-criteria mb-2 mr-2">
        <Field as="select" name="gender">
          <option value="" select hidden>All genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Field>
      </div>
      <div class="search-criteria mb-2">
        <Field as="select" name="languages">
          <option value="" select hidden>All languages</option>
          <option v-for="language of languages" :key="language.id" :value="language.id">
            {{ language.name }}
          </option>
        </Field>
      </div>
      <button @click="onReset" type="reset" class="mb-2 ml-2 hover:underline cursor-pointer">
        Clear filters
      </button>
      <button
        ref="filterFormSubmitRef"
        type="submit"
        class="hidden ml-2 hover:underline cursor-pointer"
      >
        Filter
      </button>
    </Form>
    <div
      class="
        w-full
        grid
        xl:grid-cols-5
        lg:grid-cols-4
        md:grid-cols-3
        sm:grid-cols-2
        grid-cols-1
        gap-5
      "
    >
      <Loader v-if="usersLoading" />
      <SearchCard v-else v-for="user in users" :key="user.id" :user="user"></SearchCard>
      <div v-if="users && !users.length" class="w-full text-white flex flex-col text-left">
        <h3 class="text-xl">No players found.</h3>
        <span class="text-sm"
          >Try adjusting some of your filters to explore more users to play with.</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getUsers } from '@/apollo/user.gql';
import { getGames } from '@/apollo/game.gql';
import { getLanguages } from '@/apollo/language.gql';
import { provideApolloClient, useQuery, useResult } from '@vue/apollo-composable';
import { postgresClient } from '@/apollo/client';

import { Field, Form } from 'vee-validate';
import * as yup from 'yup';

import SearchCard from '@/components/SearchCard.vue';
import Error from '@/components/Error.vue';
import Loader from '@/components/Loader.vue';

interface FilterForm {
  games?: string;
  languages?: string;
  gender?: string;
}

export default defineComponent({
  name: 'Search',
  components: {
    SearchCard,
    Loader,
    Error,
    Field,
    Form
  },
  setup() {
    provideApolloClient(postgresClient);
    const filterFormSubmitRef = ref();

    const { result: usersResult, loading: usersLoading, error: usersError } = useQuery(getUsers);
    const users = useResult(usersResult, null, data => data.getUsers);

    const { result: gamesResult, loading: gamesLoading } = useQuery(getGames);
    const games = useResult(gamesResult, null, data => data.getGames);

    const { result: languagesResult, loading: languagesLoading } = useQuery(getLanguages);
    const languages = useResult(languagesResult, null, data => data.getLanguages);

    const schema = yup.object({
      games: yup.number(),
      languages: yup.number(),
      gender: yup.string()
    });

    return {
      filterFormSubmitRef,
      users,
      languages,
      games,
      schema,
      usersLoading,
      gamesLoading,
      languagesLoading,
      usersError
    };
  },
  methods: {
    onChange() {
      this.filterFormSubmitRef.click();
    },
    onReset() {
      const { result: usersResult } = useQuery(getUsers);
      this.users = useResult(usersResult, null, data => data.getUsers);
      this.$forceUpdate();
    },
    onSubmit({ games, languages, gender }: FilterForm) {
      const data = {
        games: games ? [+games] : undefined,
        languages: languages ? [+languages] : undefined,
        gender
      };

      const { result: usersResult } = useQuery(getUsers, { data });
      this.users = useResult(usersResult, null, data => data.getUsers);
      this.$forceUpdate();
    }
  }
});
</script>

<style lang="postcss" scoped>
.search-criteria > select {
  @apply bg-purple-1100 rounded px-4 py-1;
  border: 1px solid #3b2963;
}
</style>
