<template>
  <Loader v-if="loading" />
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div class="relative text-white" v-if="user">
    <div
      :style="`
        background-image: linear-gradient(180deg, rgba(23, 16, 56, 0) 70%, #1b153d 100%),
          url('/images/backgrounds/profile-header.jpeg');
      `"
      class="profile-header absolute top-0 left-0 w-full bg-no-repeat bg-cover bg-top opacity-40"
    ></div>
    <div class="mt-8 lg:mt-40">
      <div class="container mx-auto w-full flex justify-center lg:justify-end">
        <button
          class="font-bold uppercase rounded bg-orange-600 text-sm py-2 px-6 hover:bg-orange-700 transition-all ease-in duration-200"
          @click="handleModal"
        >
          Play together
        </button>
      </div>
      <div class="container mx-auto mt-4 flex flex-col items-center lg:flex-row lg:items-start">
        <div class="lg:mb-10 mb-4 lg:mr-4">
          <div
            class="bg-purple-925 bg-opacity-70 w-full sm:rounded-sm border border-purple-custom relative mb-4 pb-3"
          >
            <div
              class="profile-card mt-4 lg:mt-0 lg:absolute lg:transform lg:-translate-y-1/2 flex items-center px-4"
            >
              <img
                src="/images/avatar1.png"
                class="rounded-full border-2 border-yellow-800 z-20 w-32 lg:w-40"
              />
              <div
                class="flex flex-col lg:bg-purple-1000 ml-4 lg:pl-16 lg:pr-16 w-full lg:w-auto lg:py-2 lg:z-10 lg:border border-purple-custom lg:transform lg:-translate-x-12 rounded-sm"
              >
                <div class="flex items-center">
                  <h2 class="text-xl lg:text-2xl mr-2">{{ user.username }}</h2>
                  <img src="/images/icons/verified.svg" title="Verified user" width="18" />
                </div>
                <div class="flex flex-col mt-2 text-sm">
                  <span>French, English</span>
                  <span>22 y.o</span>
                  <span>Joined 1 year ago</span>
                </div>
              </div>
            </div>
            <div class="flex items-center absolute top-8 lg:top-4 right-4">
              <img
                v-for="index of [1, 2, 3, 4]"
                :key="index"
                src="/images/icons/star.svg"
                width="18"
              />
              <img src="/images/icons/star_half.svg" width="18" />
              <span class="ml-2 text-sm">(12)</span>
            </div>
            <section class="lg:mt-20 pt-4 px-4">
              <h4 class="font-bold uppercase">Games</h4>
              <div class="grid gap-2 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1">
                <GameRank background="/images/backgrounds/lowres/rocket-league.jpg">
                  <template v-slot:image>
                    <img src="/images/ranks/rocket-league/c3.png" width="60" />
                  </template>
                  <template v-slot:game>Rocket League</template>
                  <template v-slot:mode>Ranked standard 3v3</template>
                  <template v-slot:rank>Champion III Division IV</template>
                </GameRank>
                <GameRank background="/images/backgrounds/lowres/csgo.jpg">
                  <template v-slot:image>
                    <img src="/images/ranks/csgo/supreme.png" width="75" />
                  </template>
                  <template v-slot:game>CS:GO</template>
                  <template v-slot:mode>Competitive 5v5</template>
                  <template v-slot:rank>Supreme Master</template>
                </GameRank>
                <GameRank background="/images/backgrounds/lowres/valorant.png">
                  <template v-slot:image>
                    <img src="/images/ranks/valorant/radiant.png" width="50" />
                  </template>
                  <template v-slot:game>Valorant</template>
                  <template v-slot:mode>Competitive 5v5</template>
                  <template v-slot:rank>Radiant</template>
                </GameRank>
                <GameRank background="/images/backgrounds/lowres/league-of-legends.jpg">
                  <template v-slot:image>
                    <img src="/images/ranks/lol/master.png" width="60" />
                  </template>
                  <template v-slot:game>League of Legends</template>
                  <template v-slot:mode>Competitive 5v5</template>
                  <template v-slot:rank>Master</template>
                </GameRank>
              </div>
            </section>
            <section class="pt-4 px-4">
              <h4 class="font-bold uppercase">About me</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officiis reprehenderit
                blanditiis omnis voluptas, commodi quia nisi in impedit alias placeat non nobis quo
                quas illo iste illum reiciendis id? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Corrupti cumque ad veritatis similique molestias doloribus
                adipisci ut nulla porro quisquam dolorum voluptatibus, explicabo et est dicta id
                itaque quia saepe!
              </p>
            </section>
            <section class="px-4 bg-purple-925">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officiis reprehenderit
                blanditiis omnis voluptas, commodi quia nisi in impedit alias placeat non nobis quo
                quas illo iste illum reiciendis id? Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Corrupti cumque ad veritatis similique molestias doloribus
                adipisci ut nulla porro quisquam dolorum voluptatibus, explicabo et est dicta id
                itaque quia saepe!
              </p>
            </section>
          </div>
          <div
            class="bg-purple-925 sm:bg-opacity-70 w-full lg:rounded-sm border border-purple-custom"
          >
            <div class="p-4 text-left">
              <h4 class="font-bold uppercase">Comments ({{ comments.length }})</h4>
              <Comment v-for="com in comments" :key="com.id" :comment="com" class="mt-2"></Comment>
              <div class="flex items-center cursor-pointer w-full pt-6">
                <hr class="w-full border-1 border-purple-800" />
                <p
                  class="text-xs text-purple-300 hover:underline hover:text-purple-200 uppercase flex-no-wrap w-1/3 px-2 text-center"
                >
                  Load more comments
                </p>
                <hr class="w-full border-1 border-purple-800" />
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-purple-925 bg-opacity-70 sm:rounded-sm border bg-purple-925 border-purple-custom lg:max-w-sm mb-10 lg:mb-0"
        >
          <section class="pt-4 p-4">
            <h4 class="font-bold uppercase mb-2">Availability</h4>
            <Availability />
          </section>
        </div>
      </div>
    </div>
  </div>
  <div
    class="hidden absolute top-0 left-0 w-full h-full flex items-center justify-center"
    id="play-modal"
  >
    <div class="w-full z-10 h-full bg-black bg-opacity-50 absolute" @click="handleModal"></div>
    <div class="w-96 bg-purple-1100 shadow-xl z-20 p-4 text-white rounded-sm relative">
      <img
        src="/images/icons/close.svg"
        width="20"
        class="absolute top-4 right-4 cursor-pointer transform hover:rotate-90 transition duration-700"
        @click="handleModal"
      />
      <h2 class="text-xl">Play with <span class="text-orange-600">Kyzoid</span></h2>
      <p class="mt-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus necessitatibus iusto
        facere excepturi odio quasi ipsum harum distinctio, a laudantium, doloremque, rerum beatae
        nam sint praesentium vero nobis impedit! Nobis.
      </p>
      <div class="mt-4 flex flex-col">
        <label for="game">Game</label>
        <select name="game" class="bg-purple-1200 p-1">
          <option value="">-</option>
          <option value="rl">Rocket League</option>
          <option value="lol">League of Legends</option>
          <option value="valorant">Valorant</option>
          <option value="csgo">Counter Strike: Global Offensive</option>
        </select>
      </div>
      <div class="mt-4 flex flex-col">
        <label for="time">Start time</label>
        <input type="datetime-local" name="time" class="bg-purple-1200 p-1 text-white" />
      </div>
      <div class="flex items-center mt-4 justify-between">
        <button
          class="font-bold uppercase rounded bg-transparent border border-purple-custom text-sm py-2 px-6 hover:bg-purple-1200 transition-all ease-in duration-200"
          @click="handleModal"
        >
          Cancel
        </button>
        <button
          class="font-bold uppercase rounded bg-orange-600 text-sm py-2 px-6 hover:bg-orange-700 transition-all ease-in duration-200"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import { getUser } from '@/apollo/user.gql';

import Comment from '@/components/Comment';
import Loader from '@/components/Loader';
import GameRank from '@/components/GameRank';
import Availability from '@/components/Availability';

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
  components: { Comment, Loader, GameRank, Availability },
  methods: {
    handleModal() {
      const playModal = document.getElementById('play-modal') as HTMLDivElement;
      playModal.classList.toggle('hidden');
      const body = document.querySelector('body') as HTMLBodyElement;
      body.classList.toggle('overflow-hidden');
    }
  },
  data() {
    return {
      loaded: false,
      comments: [
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

<style lang="scss" scoped>
.profile-header {
  height: 500px;
  z-index: -1;
}
.border-purple-custom {
  border-color: #3b2963;
}
</style>
