<template>
  <Loader v-if="loading" />
  <div v-else-if="error" class="mt-10 container mx-auto">
    <Error :message="error.message"></Error>
  </div>
  <div class="relative text-white" v-if="user">
    <div
      :style="
        `
        background-image: linear-gradient(180deg, rgba(23, 16, 56, 0) 70%, #1b153d 100%),
          url('/images/backgrounds/profile-header.jpeg');
      `
      "
      class="profile-header absolute top-0 left-0 w-full bg-no-repeat bg-cover bg-top opacity-40"
    ></div>
    <div class="mt-8 lg:mt-40">
      <div class="container mx-auto w-full flex justify-center lg:justify-end">
        <button
          class="
            font-bold
            uppercase
            rounded
            bg-orange-600
            text-sm
            py-2
            px-6
            hover:bg-orange-700
            transition-all
            ease-in
            duration-200
          "
          @click="handleModal"
        >
          Play together
        </button>
      </div>
      <div class="container mx-auto mt-4 flex flex-col items-center lg:flex-row lg:items-start">
        <div class="lg:mb-10 mb-4 lg:mr-4">
          <div
            class="
              bg-purple-925 bg-opacity-70
              w-full
              sm:rounded-sm
              border border-purple-custom
              relative
              mb-4
              pb-3
            "
          >
            <div
              class="
                profile-card
                mt-4
                lg:mt-0
                lg:absolute
                lg:transform
                lg:-translate-y-1/2
                flex
                items-center
                px-4
              "
            >
              <img
                src="/images/avatar1.png"
                class="rounded-full border-2 border-yellow-800 z-20 w-32 lg:w-40"
              />
              <div
                class="
                  flex flex-col
                  lg:bg-purple-1000
                  ml-4
                  lg:pl-16
                  lg:pr-16
                  w-full
                  lg:w-auto
                  lg:py-2
                  lg:z-10
                  lg:border
                  border-purple-custom
                  lg:transform
                  lg:-translate-x-12
                  rounded-sm
                "
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
            <div class="flex flex-col justify-center items-end absolute top-8 lg:top-4 right-4">
              <div class="flex items-center">
                <img src="/images/icons/local_atm.svg" class="mr-1" height="20" />
                <span class="text-lg">4.50<span class="text-sm">/Match</span></span>
              </div>
              <div class="flex items-center">
                <img
                  v-for="index of [1, 2, 3, 4]"
                  :key="index"
                  src="/images/icons/star.svg"
                  width="18"
                />
                <img src="/images/icons/star_half.svg" width="18" />
                <span class="ml-2 text-sm">(12)</span>
              </div>
            </div>
            <section class="lg:mt-20 pt-4 px-4">
              <h4 class="font-bold uppercase">Games</h4>
              <div class="grid gap-2 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1">
                <GameRank background="/images/backgrounds/lowres/rl.jpg">
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
                <GameRank background="/images/backgrounds/lowres/valorant.jpg">
                  <template v-slot:image>
                    <img src="/images/ranks/valorant/radiant.png" width="50" />
                  </template>
                  <template v-slot:game>Valorant</template>
                  <template v-slot:mode>Competitive 5v5</template>
                  <template v-slot:rank>Radiant</template>
                </GameRank>
                <GameRank background="/images/backgrounds/lowres/lol.jpg">
                  <template v-slot:image>
                    <img src="/images/ranks/lol/master.png" width="60" />
                  </template>
                  <template v-slot:game>League of Legends</template>
                  <template v-slot:mode>Competitive 5v5</template>
                  <template v-slot:rank>Master</template>
                </GameRank>
              </div>
            </section>
            <section class="pt-4 px-4 relative">
              <img
                src="/images/icons/edit.svg"
                class="absolute top-4 right-4 cursor-pointer"
                width="20"
                @click="handleEditingDescription"
                v-if="!editingDescription"
              />
              <h4 class="font-bold uppercase">About me</h4>
              <p v-if="!editingDescription">
                {{ user.description }}
              </p>
              <div class="flex flex-col" v-else>
                <textarea
                  class="h-32 text-white bg-purple-1100 p-2 w-full"
                  v-model="user.description"
                ></textarea>
                <div class="mt-2 flex items-center justify-end">
                  <button
                    @click="handleEditingDescription"
                    class="
                      px-4
                      mr-2
                      outline-none
                      font-bold
                      text-white
                      uppercase
                      rounded
                      border border-purple-800
                      text-sm
                      leading-8
                      py-1
                      hover:border-purple-700
                      transition-all
                      ease-in
                      duration-200
                    "
                  >
                    Cancel
                  </button>
                  <button
                    @click="handleEditingDescription"
                    class="
                      px-4
                      outline-none
                      font-bold
                      text-white
                      uppercase
                      rounded
                      bg-purple-800
                      text-sm
                      leading-8
                      py-1
                      hover:bg-purple-700
                      transition-all
                      ease-in
                      duration-200
                    "
                  >
                    Save
                  </button>
                </div>
              </div>
            </section>
          </div>
          <div
            class="bg-purple-925 sm:bg-opacity-70 w-full lg:rounded-sm border border-purple-custom"
          >
            <div class="p-4 text-left">
              <h4 class="font-bold uppercase mb-2">Comments ({{ ratings.length }})</h4>
              <form class="flex flex-col items-start" @submit.prevent="handleRating">
                <label for="rating">Rating</label>
                <input
                  class="w-20 mb-2 p-2 text-white bg-purple-1100"
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  v-model="rating"
                />
                <Alert :message="ratingError" alert-type="danger" v-if="ratingError" />
                <label for="comment">Comment</label>
                <textarea
                  class="h-32 mb-2 text-white bg-purple-1100 p-2 w-full"
                  name="comments"
                  v-model="comments"
                ></textarea>
                <Alert :message="commentsError" alert-type="danger" v-if="commentsError" />
                <button
                  class="
                    px-4
                    outline-none
                    font-bold
                    text-white
                    uppercase
                    rounded
                    bg-purple-800
                    text-sm
                    leading-8
                    py-1
                    hover:bg-purple-700
                    transition-all
                    ease-in
                    duration-200
                    self-end
                  "
                >
                  Envoyer
                </button>
              </form>
              <Comment v-for="com in ratings" :key="com.id" :comment="com" class="mt-2"></Comment>
            </div>
          </div>
        </div>
        <div
          class="
            bg-purple-925 bg-opacity-70
            sm:rounded-sm
            border
            bg-purple-925
            border-purple-custom
            lg:max-w-sm
            mb-10
            lg:mb-0
          "
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
    v-if="user"
  >
    <div class="w-full z-10 h-full bg-black bg-opacity-50 absolute" @click="handleModal"></div>
    <div class="w-96 bg-purple-1100 shadow-xl z-20 text-white rounded-sm relative">
      <img
        src="/images/icons/close.svg"
        width="20"
        class="absolute top-4 right-4 cursor-pointer"
        @click="handleModal"
      />
      <h2 class="text-xl p-4">Complete demand</h2>
      <div
        class="demand-banner flex items-start justify-between bg-purple-1200 p-4"
        :style="
          `
        background-image: linear-gradient(90deg, rgba(22, 16, 51, 1) 70%, rgba(22, 16, 51, 0.4) 100%),
        url('/images/backgrounds/lowres/${demandGame}.jpg');
        `
        "
      >
        <div class="flex flex-col">
          <select @change="handleGameChange" name="game" class="bg-purple-1200">
            <option value="lol">League of Legends</option>
            <option value="rl">Rocket League</option>
            <option value="valorant">Valorant</option>
            <option value="csgo">CS:GO</option>
          </select>
          <div class="mt-2 flex items-center">
            <img src="/images/avatar1.png" class="mr-2 w-5 h-5 rounded-full" />
            <span class="text-sm">{{ user.username }}</span>
          </div>
        </div>
        <div class="flex items-center">
          <img src="/images/icons/local_atm.svg" class="mr-1" height="16" />
          <span>4.50<span class="text-xs">/Match</span></span>
        </div>
      </div>
      <div class="px-4 my-4">
        <div class="mt-4 flex justify-between items-center">
          <label for="round">Matches</label>
          <input
            @input="handleRoundChange"
            type="number"
            name="round"
            min="1"
            max="999"
            value="1"
            class="w-20 bg-purple-1200 p-1 text-white"
          />
        </div>
        <div class="mt-4 flex justify-between items-center">
          <label for="time">Start time</label>
          <input type="datetime-local" name="time" class="bg-purple-1200 p-1 text-white" />
        </div>
      </div>
      <div class="p-4 border-t border-purple-925 flex justify-between items-center">
        <span>Total</span>
        <div class="flex items-center">
          <img src="/images/icons/local_atm.svg" class="mr-1" height="16" />
          <span>{{ totalPrice }}</span>
        </div>
      </div>
      <div class="p-4 bg-purple-1200 flex items-center justify-between">
        <button
          class="
            font-bold
            uppercase
            rounded
            bg-transparent
            border border-purple-custom
            text-sm
            py-2
            px-6
            hover:bg-purple-1200
            transition-all
            ease-in
            duration-200
          "
          @click="handleModal"
        >
          Cancel
        </button>
        <button
          class="
            font-bold
            uppercase
            rounded
            bg-orange-600
            text-sm
            py-2
            px-6
            hover:bg-orange-700
            transition-all
            ease-in
            duration-200
          "
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { addRatingMutation } from '@/apollo/rating.gql';
import { defineComponent } from 'vue';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { getUser } from '@/apollo/user.gql';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import RatingModel from '@/models/rating.model';

import Comment from '@/components/Comment.vue';
import Alert from '@/components/Alert.vue';
import Error from '@/components/Error.vue';
import Loader from '@/components/Loader.vue';
import GameRank from '@/components/GameRank.vue';
import Availability from '@/components/Availability.vue';
import { useToast } from 'vue-toastification';

interface RatingForm {
  rating: number;
  comments?: string;
}

interface AddRatingVariables {
  data: {
    rating: number;
    comments?: string;
    toUser: number;
  };
}

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

    const { mutate: addRating } = useMutation<Partial<RatingModel>, AddRatingVariables>(
      addRatingMutation
    );

    const schema = yup.object({
      rating: yup
        .number()
        .required()
        .min(1)
        .max(5),
      comments: yup.string().max(500)
    });

    const { handleSubmit } = useForm<RatingForm>({
      validationSchema: schema,
      initialValues: {
        rating: 1,
        comments: ''
      }
    });

    const toast = useToast();

    const { value: comments, errorMessage: commentsError } = useField<string>('comments');
    const { value: rating, errorMessage: ratingError } = useField<number>('rating');

    const handleRating = handleSubmit(values => {
      if (values.rating) {
        addRating({
          data: {
            rating: values.rating,
            comments: values.comments,
            toUser: parseInt(props.userId)
          }
        }).then(() => {
          toast.success('Rating sent successfully.');
        });
      }
    });

    return {
      handleRating,
      user,
      loading,
      error,
      comments,
      rating,
      commentsError,
      ratingError
    };
  },
  name: 'UserProfile',
  components: { Alert, Comment, Loader, GameRank, Availability, Error },
  methods: {
    handleModal() {
      const playModal = document.getElementById('play-modal') as HTMLDivElement;
      playModal.classList.toggle('hidden');
      const body = document.querySelector('body') as HTMLBodyElement;
      body.classList.toggle('overflow-hidden');
    },
    handleRoundChange(event: { target: HTMLInputElement }) {
      this.totalPrice = (4.5 * +event.target.value).toFixed(2);
    },
    handleGameChange(event: { target: HTMLInputElement }) {
      this.demandGame = event.target.value;
    },
    handleEditingDescription() {
      this.editingDescription = this.editingDescription ? false : true;
    }
  },
  data() {
    return {
      loaded: false,
      editingDescription: false,
      totalPrice: '4.50',
      demandGame: 'lol',
      ratings: [
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

<style lang="postcss" scoped>
.profile-header {
  height: 500px;
  z-index: -1;
}
.border-purple-custom {
  border-color: #3b2963;
}

.demand-banner {
  background-repeat: no-repeat;
  background-position: right center;
  background-size: contain;
}
</style>
