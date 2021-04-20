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
    <div class="mt-60">
      <div class="container mx-auto w-full flex justify-end">
        <button
          class="mr-4 uppercase rounded bg-transparent border border-purple-400 text-purple-400 text-sm py-2 px-6 hover:border-purple-300 hover:text-purple-300 transition-all ease-in duration-200"
        >
          Chat
        </button>
        <button
          class="font-bold uppercase rounded bg-orange-600 text-sm py-2 px-6 hover:bg-orange-700 transition-all ease-in duration-200"
        >
          Play together
        </button>
      </div>
      <div class="container mx-auto mt-4 flex items-start">
        <div class="mb-10 mr-4">
          <div class="bg-purple-925 w-full rounded-sm border border-purple-custom relative mb-4 pb-3">
            <div class="profile-card absolute transform -translate-y-1/2 flex items-center px-4">
              <img
                src="/images/avatar1.png"
                class="rounded-full border-2 border-yellow-800 z-20"
                width="175"
                height="175"
              />
              <div
                class="flex flex-col bg-purple-1000 pl-16 pr-16 py-2 z-10 border border-purple-custom transform -translate-x-12 rounded-sm"
              >
                <div class="flex items-center">
                  <h2 class="text-2xl mr-2">{{ user.username }}</h2>
                  <img src="/images/icons/verified.svg" title="Verified user" />
                </div>
                <div class="flex flex-col mt-2 text-sm">
                  <span>French, English</span>
                  <span>22 y.o</span>
                  <span>Joined 1 year ago</span>
                </div>
              </div>
            </div>
            <div class="flex items-center absolute top-3 right-4">
              <img
                v-for="index of [1, 2, 3, 4]"
                :key="index"
                src="/images/icons/star.svg"
                width="22"
              />
              <img src="/images/icons/star_half.svg" width="22" />
              <span class="ml-2">(12)</span>
            </div>
            <section style="margin-top: 87.5px" class="pt-4 px-4">
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
            <section class="mt-4 pt-4 px-4">
              <h4 class="font-bold uppercase">About me</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officiis reprehenderit
                blanditiis omnis voluptas, commodi quia nisi in impedit alias placeat non nobis quo
                quas illo iste illum reiciendis id? Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Corrupti cumque ad veritatis similique molestias doloribus adipisci ut nulla
                porro quisquam dolorum voluptatibus, explicabo et est dicta id itaque quia saepe!
              </p>
            </section>
            <section class="px-4 bg-purple-925">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officiis reprehenderit
                blanditiis omnis voluptas, commodi quia nisi in impedit alias placeat non nobis quo
                quas illo iste illum reiciendis id? Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Corrupti cumque ad veritatis similique molestias doloribus adipisci ut nulla
                porro quisquam dolorum voluptatibus, explicabo et est dicta id itaque quia saepe!
              </p>
            </section>
          </div>
          <div class="bg-purple-925 w-full rounded-sm border border-purple-custom">
            <div class="flex items-center">
              <div class="p-4 md:p-6 text-center lg:text-left">
                <h4 class="font-bold uppercase">Comments</h4>
                <Commentary v-for="com in commentaries" :key="com.id" :commentary="com"></Commentary>
                <div class="flex items-center cursor-pointer w-full py-6">
                  <hr class="w-full border-1 border-purple-800" />
                  <p class="text-xs text-purple-300 uppercase flex-no-wrap w-1/3 px-2 text-center">
                    Load more comments
                  </p>
                  <hr class="w-full border-1 border-purple-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-purple-925 rounded-sm border bg-purple-925 border-purple-custom max-w-sm">
          <section class="pt-4 p-4">
            <h4 class="font-bold uppercase">Today's Agenda</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officiis reprehenderit
              blanditiis omnis voluptas, commodi quia nisi in impedit alias placeat non nobis quo quas
              illo iste illum reiciendis id? Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Corrupti cumque ad veritatis similique molestias doloribus adipisci ut nulla porro
              quisquam dolorum voluptatibus, explicabo et est dicta id itaque quia saepe!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officiis reprehenderit
              blanditiis omnis voluptas, commodi quia nisi in impedit alias placeat non nobis quo quas
              illo iste illum reiciendis id? Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Corrupti cumque ad veritatis similique molestias doloribus adipisci ut nulla porro
              quisquam dolorum voluptatibus, explicabo et est dicta id itaque quia saepe!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officiis reprehenderit
              blanditiis omnis voluptas, commodi quia nisi in impedit alias placeat non nobis quo quas
              illo iste illum reiciendis id? Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Corrupti cumque ad veritatis similique molestias doloribus adipisci ut nulla porro
              quisquam dolorum voluptatibus, explicabo et est dicta id itaque quia saepe!
            </p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import { getUser } from '@/apollo/user.gql';

import Commentary from '@/components/Commentary';
import Loader from '@/components/Loader';
import GameRank from '@/components/GameRank';

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
  components: { Commentary, Loader, GameRank },
  data() {
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

<style lang="scss" scoped>
.profile-header {
  height: 500px;
  z-index: -1;
}
.border-purple-custom {
  border-color: #3b2963;
}
</style>
