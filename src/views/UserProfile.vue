<template>
  <Loader v-if="loading" />
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div class="pt-16" v-if="user">
    <section
      class="relative font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover"
    >
      <div class="max-w-4xl flex items-center h-auto lg:h-full flex-wrap mx-auto my-32 lg:my-0">
        <div
          id="profile"
          class="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div class="p-4 md:p-12 text-center lg:text-left">
            <div
              class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
              style="background-image: url('/user_icon.jpg')"
            ></div>
            <h1 class="text-4xl font-bold pt-8 lg:pt-0 w-1/3">{{ user.username }}</h1>
            <h3 class="font-bold pt-8 lg:pt-0 w-1/3">3.5★</h3>
            <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-purple-1100 opacity-25"></div>
            <p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <svg
                class="h-4 fill-current text-purple-1100 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z"
                />
              </svg>
              your games
            </p>
            <p
              class="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start"
            >
              <svg
                class="h-4 fill-current text-purple-1100 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z"
                />
              </svg>
              Your language
            </p>
            <div class="flex flex-col text-left pl-2 w-full">
              <hr class="border-gray-400 my-2 w-full" />
              <p class="description pt-8 text-sm">
                <span class="text-gray-600">Presentation: </span>
                {{ user.description }}
              </p>
            </div>
            <div class="pt-12 pb-8">
              <button
                class="bg-purple-1100 hover:bg-text-purple-1100 text-white font-bold py-2 px-4 rounded-full"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-2/5">
          <img
            src="/user_icon.jpg"
            class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
            alt="pp"
            style="height: 511px; width: 700px"
          />
        </div>
      </div>
    </section>
    <section
      class="relative font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover p-8"
    >
      <div class="max-w-4xl flex items-center h-auto lg:h-full flex-wrap mx-auto my-32 lg:my-0">
        <div
          id="commentary"
          class="w-full rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div class="p-4 md:p-6 text-center lg:text-left">
            <h1 class="text-5xl font-bold pt-8 lg:pt-0 underline pb-2">Commentary</h1>
            <Commentary v-for="com in commentaries" :key="com.id" :commentary="com"></Commentary>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import { getUser } from '@/apollo/user.gql.ts';

import Commentary from '@/components/Commentary';
import Loader from '@/components/Loader';

export default defineComponent({
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { result, loading, error } = useQuery(getUser, { data: { id: parseInt(props.userId) } });
    const user = useResult(result, null, data => data.getUser);
    return {
      user,
      loading,
      error
    };
  },
  name: 'UserProfile',
  components: { Commentary, Loader },
  data: function() {
    return {
      loaded: false,
      commentaries: [
        {
          id: 1,
          author: 'Thomas',
          message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec elit venenatis, malesuada est laoreet, aliquet nulla. Donec eu mattis lectus. Morbi fringilla elementum augue, ut tempus libero tempor quis. Mauris consectetur nisi quam, commodo tincidunt.'
        },
        {
          id: 2,
          author: 'Pierre',
          message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec elit venenatis, malesuada est laoreet, aliquet nulla. Donec eu mattis lectus. Morbi fringilla elementum augue, ut tempus libero tempor quis. Mauris consectetur nisi quam, commodo tincidunt.'
        },
        {
          id: 3,
          author: 'Basile',
          message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec elit venenatis, malesuada est laoreet, aliquet nulla. Donec eu mattis lectus. Morbi fringilla elementum augue, ut tempus libero tempor quis. Mauris consectetur nisi quam, commodo tincidunt.'
        }
      ]
    };
  }
});
</script>

<style scoped>
.full-vh {
  height: 100vh;
}
</style>
