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
          v-if="user.role === 'FURRAX'"
        >
          Play together
        </button>
        <router-link to="/become-furrax">
          <button
            class="
            font-bold
            uppercase
            rounded
            bg-purple-600
            text-sm
            py-2
            px-6
            hover:bg-purple-700
            transition-all
            ease-in
            duration-200
            lg:mr-4
          "
            v-if="isOwner() && authorized(['USER'])"
          >
            Become a furrax
          </button>
        </router-link>
      </div>
      <div class="container mx-auto mt-4 flex flex-col items-center lg:flex-row lg:items-start">
        <div class="lg:mb-10 mb-4 w-full lg:mr-4">
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
                :src="user.profileImage || '/images/avatar1.png'"
                class="rounded-full border-2 border-purple-custom z-20 w-32 lg:w-40"
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
                  <h2 class="text-xl lg:text-2xl flex items-center">
                    <span class="mr-2">{{ user.username }}</span>
                    <img
                      v-if="
                        user.gender.toLowerCase() === 'female' ||
                          user.gender.toLowerCase() === 'male'
                      "
                      width="20"
                      :src="`/images/icons/${user.gender.toLowerCase()}.svg`"
                    />
                  </h2>
                </div>
                <div class="flex flex-col items-start mt-2 text-sm">
                  <span
                    class="text-center text-xs mb-1 px-3 text-purple-300 py-0.5 bg-purple-900 rounded-full"
                    >{{ user.role }}</span
                  >
                  <div class="flex items-center flex-wrap mb-1">
                    <div v-for="language of user.languages" :key="language.id" class="z-20 mr-1">
                      <img
                        width="28"
                        :src="`/images/icons/countries/${language.name}.png`"
                        :title="language.name"
                      />
                    </div>
                  </div>
                  <span>Joined {{ dayjs().to(user.createdAt) }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col justify-center items-end absolute top-8 lg:top-4 right-4">
              <div v-show="computedAverageRating !== '0'" class="flex items-center">
                <img src="/images/icons/star.svg" width="18" />
                <span class="ml-1" ref="computedAverageRatingRef">{{ computedAverageRating }}</span>
                <span class="ml-2 text-sm">({{ computedReceivedRatings.length }})</span>
              </div>
            </div>
            <section class="lg:mt-20 pt-4 px-4">
              <h4 class="font-bold uppercase">Games</h4>
              <Selector
                :datas="games"
                :userId="userId"
                :userDatas="user.games"
                name="Games"
                @handle-add="handleAddGame"
                @handle-remove="handleRemoveGame"
              />
            </section>
            <section class="pt-4 px-4">
              <h4 class="font-bold uppercase">Languages</h4>
              <Selector
                :datas="languages"
                :userId="userId"
                :userDatas="user.languages"
                name="Languages"
                @handle-add="handleAddLanguage"
                @handle-remove="handleRemoveLanguage"
              />
            </section>
            <section class="pt-8 px-4">
              <h4 class="font-bold uppercase">
                Ranks ({{ user.statistics.length }}/{{ maxRanks }})
              </h4>
              <span v-if="!user.statistics.length">This user has no ranks.</span>
              <div class="grid gap-2 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1">
                <GameRank
                  v-for="statistic of user.statistics"
                  :key="statistic.id"
                  :games="games"
                  :statistic="statistic"
                  :editing="false"
                  :addGameCard="false"
                  @upsert-statistic="handleUpsertStatistic"
                  @delete-statistic="refetchUser()"
                />
                <GameRank
                  v-show="addingGame"
                  image="/images/ranks/lol/master.png"
                  background="/images/backgrounds/lowres/lol.jpg"
                  :editing="true"
                  :games="games"
                  @adding-game="handleEmitAddingGame"
                  @upsert-statistic="handleUpsertStatistic"
                  :addGameCard="true"
                />
                <div
                  @click="addingGame = !addingGame"
                  v-show="!addingGame && isOwner()"
                  class="
                    w-full
                    flex
                    border-2 border-dashed border-purple-custom
                    justify-center
                    items-center
                    cursor-pointer
                    transition
                    duration-200
                    bg-purple-1100
                    hover:bg-purple-1200
                    h-20
                  "
                >
                  <img src="/images/icons/add_circle.svg" width="24" />
                  <span class="ml-2">Add a rank</span>
                </div>
              </div>
              <div class="mt-4" v-if="isOwner()">
                <label for="lol-username" class="text-sm"
                  >Enter your League of Legends summoner's name to get your ranks
                  automatically</label
                >
                <div class="flex items-center">
                  <input
                    type="text"
                    ref="lolUsername"
                    class="mr-2 bg-purple-1200 px-2 py-0.5 rounded-sm"
                    name="lol-username"
                  />
                  <button
                    @click="getLolRanks"
                    class="
                      px-3
                      py-1
                      rounded
                      bg-transparent
                      border border-purple-400
                      text-purple-400
                      hover:border-purple-300
                      hover:text-purple-300
                      transition
                      duration-300
                      text-sm
                    "
                  >
                    GET RANKS
                  </button>
                </div>
              </div>
            </section>
            <section class="pt-8 px-4 relative">
              <img
                src="/images/icons/edit.svg"
                class="
                  absolute
                  top-3
                  right-3
                  cursor-pointer
                  hover:bg-white hover:bg-opacity-20
                  transition
                  duration-200
                  p-1
                  rounded-full
                "
                width="24"
                @click="handleEditingDescription"
                v-if="!editingDescription && (isOwner() || authorized(['ADMIN', 'MODERATOR']))"
              />
              <h4 class="font-bold uppercase">About me</h4>
              <p ref="descriptionRef" v-show="!editingDescription">
                {{ user.description || 'This user has no description.' }}
              </p>
              <Form
                class="flex flex-col"
                v-show="editingDescription"
                :validation-schema="descriptionSchema"
                @submit="handleDescription"
              >
                <Field
                  class="h-32 text-white bg-purple-1100 p-2 w-full"
                  name="description"
                  as="textarea"
                  :value="user.description"
                ></Field>
                <div class="mt-2 flex items-center justify-end">
                  <button
                    @click.prevent="handleEditingDescription"
                    class="
                      px-4
                      mr-2
                      cursor-pointer
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
                    type="submit"
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
              </Form>
            </section>
          </div>
          <div
            class="bg-purple-925 sm:bg-opacity-70 w-full lg:rounded-sm border border-purple-custom"
          >
            <div class="p-4 text-left">
              <h4 class="font-bold uppercase mb-2">Comments ({{ user.receivedRatings.length }})</h4>
              <Form
                :validation-schema="schema"
                class="flex flex-col items-start"
                v-if="!isOwner() && authorized(['USER', 'FURRAX', 'MODERATOR', 'ADMIN'])"
                @submit="handleRating"
              >
                <label for="rating">Rating<span class="text-red-500">*</span></label>
                <Field
                  class="w-20 mb-1 p-2 text-white bg-purple-1100"
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  step="0.1"
                  v-model="rating"
                />
                <ErrorMessage name="rating" class="text-red-500 mb-2" />
                <label for="comment">Comment</label>
                <Field
                  class="h-32 mb-1 text-white bg-purple-1100 p-2 w-full"
                  name="comments"
                  v-model="comments"
                  as="textarea"
                ></Field>
                <ErrorMessage name="password" class="text-red-500 mb-2" />
                <button
                  type="submit"
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
                  Send
                </button>
              </Form>
              <div class="mt-4" v-if="computedReceivedRatings.length" id="commentsDOM">
                <Comment
                  v-for="com in computedReceivedRatings"
                  :key="com.id"
                  :comment="com"
                  :userId="userId"
                  class="mt-2 bg-purple-1100"
                  @rating-removed="handleRatingRemoved"
                ></Comment>
              </div>
              <div v-else>This user did not receive any comments yet.</div>
            </div>
          </div>
        </div>
        <div
          v-if="user.role === 'FURRAX'"
          class="
            bg-opacity-70
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
            <Availability :userId="userId" />
          </section>
        </div>
      </div>
    </div>
  </div>
  <div
    class="absolute top-0 left-0 w-full h-full flex hidden items-center justify-center"
    id="play-modal"
    v-if="user"
  >
    <div class="w-full z-10 h-full bg-black bg-opacity-50 absolute" @click="handleModal"></div>
    <div class="bg-purple-1100 shadow-xl z-20 text-white rounded-sm relative">
      <img
        src="/images/icons/close.svg"
        width="20"
        class="absolute top-4 right-4 cursor-pointer"
        @click="handleModal"
      />
      <h2 class="text-xl p-4">Complete demand</h2>
      <Form :validation-schema="appointmentSchema" @submit="handleNewAppointment">
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
            <Field
              as="select"
              name="game"
              v-model="demandGame"
              class="bg-white py-0.5 px-1 bg-opacity-10"
            >
              <option
                :value="game.name"
                class="bg-purple-1000"
                v-for="game of games"
                :key="game.id"
                >{{ game.name }}</option
              >
            </Field>
            <ErrorMessage name="game" class="text-red-500" />
            <div class="mt-2 flex items-center">
              <img src="/images/avatar1.png" class="mr-2 w-5 h-5 rounded-full" />
              <span class="text-sm">{{ user.username }}</span>
            </div>
          </div>
          <div class="flex items-center">
            <img src="/images/icons/local_atm.svg" class="mr-1" height="16" />
            <span>0.00<span class="text-xs">/Match</span></span>
          </div>
        </div>
        <div class="px-4 my-4">
          <div class="mt-4 flex justify-between items-center">
            <label for="matches">Matches</label>
            <Field
              type="number"
              name="matches"
              v-model="matches"
              min="1"
              max="999"
              value="1"
              class="w-20 bg-purple-1200 p-1 text-white"
            />
          </div>
          <ErrorMessage name="matches" class="text-red-500" />
          <div class="mt-4 flex justify-between items-center">
            <label for="date">Start time</label>
            <Field type="datetime-local" name="date" class="bg-purple-1200 ml-6 p-1 text-white" />
          </div>
          <ErrorMessage name="date" class="text-red-500" />
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
            type="button"
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
            type="submit"
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
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { addRatingMutation } from '@/apollo/rating.gql';
import { useAuth } from '@/composables/auth';
import { defineComponent, ref } from 'vue';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import {
  getUser,
  updateDescriptionMutation,
  addGamesMutation,
  addLanguagesMutation,
  removeUserLanguageMutation,
  removeUserGameMutation
} from '@/apollo/user.gql';
import { getGames } from '@/apollo/game.gql';
import { getLanguages } from '@/apollo/language.gql';
import * as yup from 'yup';
import { Field, Form, ErrorMessage } from 'vee-validate';
import RatingModel from '@/models/rating.model';
import UserModel from '@/models/user.model';
import GameModel from '@/models/game.model';
import LanguageModel from '@/models/language.model';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import Comment from '@/components/Comment.vue';
import Error from '@/components/Error.vue';
import Loader from '@/components/Loader.vue';
import GameRank from '@/components/GameRank.vue';
import Availability from '@/components/Availability.vue';
import { useToast } from 'vue-toastification';
import { createAppointment } from '@/apollo/appointment.gql';
import { getLolStatsMutation } from '@/apollo/statistic.gql';
import StatisticModel from '@/models/statistic.model';
import { upsertStatisticMutation } from '@/apollo/statistic.gql';
import Selector from '@/components/Selector.vue';

interface UpsertStatisticVariables {
  data: {
    id?: number;
    rank: string;
    mode: string;
    game: {
      id: number;
    };
    playerId?: string;
  };
}

interface RatingForm {
  rating: string;
  comments?: string;
}

interface DescriptionForm {
  description: string;
}

interface AppointmentForm {
  game: string;
  matches: number;
  date: Date;
  description: string;
}

interface UpdateDescriptionVariables {
  description: string;
}

interface GetLolStatsVariables {
  username: string;
}

interface AddRatingVariables {
  data: {
    rating: string;
    comments?: string;
    toUser: {
      id: number;
    };
  };
}

interface AddGamesVariables {
  games: {
    ids: number[];
  };
}

interface AddLanguagesVariables {
  languages: {
    ids: number[];
  };
}

interface NewAppointmentVariables {
  appointmentInput: {
    to: number;
    from?: number;
    description: string;
    date: Date;
    matches: number;
    game: string;
  };
}

interface LolData {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: string;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

interface LolResponseType {
  getLolStats: LolData[];
}

interface NewAppointmentResponse {
  createAppointment: {
    _createdAt: string;
  };
}

export default defineComponent({
  data() {
    return {
      editingDescription: false,
      demandGame: 'League of Legends',
      addingGame: false,
      maxRanks: 6,
      matches: 1
    };
  },
  props: {
    userId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { user: userAuth } = useAuth();
    const computedAverageRatingRef = ref();
    const descriptionRef = ref();
    const lolUsername = ref();
    const { result, loading, error, refetch: refetchUser } = useQuery(getUser, {
      data: { id: parseInt(props.userId) }
    });
    const user = useResult(result, null, data => data.getUser);

    const { result: gamesResult } = useQuery(getGames);
    const games = useResult(gamesResult, null, data => data.getGames);

    const { result: languagesResult } = useQuery(getLanguages);
    const languages = useResult(languagesResult, null, data => data.getLanguages);

    const { mutate: removeUserGame } = useMutation<Partial<GameModel>, { id: number }>(
      removeUserGameMutation
    );

    const { mutate: addGames } = useMutation<Partial<GameModel>, AddGamesVariables>(
      addGamesMutation
    );

    const { mutate: removeUserLanguage } = useMutation<Partial<LanguageModel>, { id: number }>(
      removeUserLanguageMutation
    );

    const { mutate: addLanguages } = useMutation<Partial<LanguageModel>, AddLanguagesVariables>(
      addLanguagesMutation
    );

    const { mutate: addRating } = useMutation<Partial<RatingModel>, AddRatingVariables>(
      addRatingMutation
    );

    const { mutate: updateDescription } = useMutation<
      Partial<UserModel>,
      UpdateDescriptionVariables
    >(updateDescriptionMutation);

    const { mutate: getLolStats } = useMutation<LolResponseType, GetLolStatsVariables>(
      getLolStatsMutation
    );

    const { mutate: newAppointment } = useMutation<NewAppointmentResponse, NewAppointmentVariables>(
      createAppointment,
      {
        context: {
          uri: `${process.env.VUE_APP_MONGO_BACKEND_URL || 'http://localhost:4000'}/graphql`
        }
      }
    );

    const { mutate: upsertStatistic } = useMutation<
      Partial<StatisticModel>,
      UpsertStatisticVariables
    >(upsertStatisticMutation);

    const schema = yup.object({
      rating: yup
        .string()
        .required()
        .min(1)
        .max(5),
      comments: yup.string().max(500),
      toUser: yup.object().shape({
        id: yup.number()
      })
    });

    const gamesSchema = yup.object({
      games: yup.number()
    });

    const descriptionSchema = yup.object({
      description: yup
        .string()
        .required()
        .min(0)
        .max(2000)
    });

    const appointmentSchema = yup.object({
      game: yup.string().required(),
      matches: yup.number().required(),
      date: yup
        .date()
        .min(new Date())
        .required(),
      description: yup
        .string()
        .required()
        .min(5)
        .max(250)
    });

    const toast = useToast();

    return {
      dayjs,
      upsertStatistic,
      lolUsername,
      getLolStats,
      toast,
      computedAverageRatingRef,
      descriptionRef,
      schema,
      descriptionSchema,
      addRating,
      updateDescription,
      user,
      loading,
      error,
      refetchUser,
      userAuth,
      games,
      languages,
      gamesSchema,
      removeUserLanguage,
      addLanguages,
      addGames,
      removeUserGame,
      newAppointment,
      appointmentSchema
    };
  },
  computed: {
    computedReceivedRatings(): RatingModel[] {
      return this.orderRatings(this.user.receivedRatings);
    },
    computedAverageRating(): string {
      return this.calculateAverageRating(this.user.receivedRatings);
    },
    totalPrice(): string {
      return (0 * +this.matches).toFixed(2);
    }
  },
  name: 'UserProfile',
  provide() {
    return {
      authorized: this.authorized,
      isOwner: this.isOwner
    };
  },
  components: {
    Field,
    ErrorMessage,
    Form,
    Comment,
    Loader,
    GameRank,
    Availability,
    Error,
    Selector
  },
  methods: {
    authorized(roles: string[]) {
      return this.userAuth && roles.includes((this.userAuth as any).role);
    },
    isOwner() {
      return this.userAuth && (this.userAuth as any).id === this.userId;
    },
    findLolGame(): GameModel {
      return this.games.find((game: GameModel) => game.name === 'League of Legends');
    },
    handleRatingRemoved() {
      this.refetchUser();
    },
    getLolRanks() {
      this.getLolStats({
        username: this.lolUsername.value
      }).then(({ data }) => {
        const lolData = data?.getLolStats;
        if (!lolData || !lolData.length) {
          this.toast.info('No ranks found, are you sure you play the game?!');
          return;
        }

        const promises = [] as any;

        lolData.forEach(stat => {
          promises.push(
            this.upsertStatistic({
              data: {
                game: { id: +this.findLolGame().id },
                mode: stat.queueType === 'RANKED_SOLO_5x5' ? 'Ranked Solo/Duo' : 'Ranked Flex',
                rank: `${stat.tier} ${stat.rank}`,
                playerId: stat.summonerId
              }
            })
          );
        });

        Promise.all(promises)
          .then(() => {
            this.toast.success('Rank added successfully!');
            this.lolUsername.value = '';
            this.refetchUser();
          })
          .catch(() => {
            this.toast.error('An error occurred!');
          });
      });
    },
    handleUpsertStatistic() {
      this.addingGame = false;
      this.refetchUser();
    },
    handleEmitAddingGame(value: boolean) {
      this.addingGame = value;
    },
    handleAddGame(id: string) {
      if (id !== '') {
        this.addGames({
          games: {
            ids: [+id]
          }
        }).then(() => {
          this.refetchUser();
          this.toast.success('Game added successfully.');
        });
      }
    },
    handleRemoveGame({ target }: { target: HTMLImageElement }) {
      const gameId = target.dataset.gameId;
      if (gameId && gameId !== '') {
        this.removeUserGame({ id: +gameId }).then(() => {
          this.refetchUser();
          this.toast.success('Game removed successfully.');
        });
      }
    },
    handleAddLanguage(id: string) {
      if (id !== '') {
        this.addLanguages({
          languages: {
            ids: [+id]
          }
        }).then(() => {
          this.refetchUser();
          this.toast.success('Language added successfully.');
        });
      }
    },
    handleRemoveLanguage({ target }: { target: HTMLImageElement }) {
      const gameId = target.dataset.gameId;
      if (gameId && gameId !== '') {
        this.removeUserLanguage({ id: +gameId }).then(() => {
          this.refetchUser();
          this.toast.success('Language removed successfully.');
        });
      }
    },
    calculateAverageRating(ratings: RatingModel[]): string {
      const sum = ratings.reduce((acc: number, rating: RatingModel) => acc + +rating.rating, 0);
      return sum ? (sum / ratings.length).toFixed(2) : '0';
    },
    orderRatings(ratings: RatingModel[]) {
      const orderedRatings = JSON.parse(JSON.stringify(ratings));
      orderedRatings.sort((r1: RatingModel, r2: RatingModel) => {
        return new Date(r2.createdAt).getTime() - new Date(r1.createdAt).getTime();
      });
      return orderedRatings;
    },
    handleDescription(values: DescriptionForm) {
      if (values.description) {
        this.updateDescription({
          description: values.description
        })
          .then(() => {
            this.refetchUser();
            this.toast.success('Description edited successfully.');
            this.handleEditingDescription();
          })
          .catch(err => {
            const errorMessage =
              err.message || 'Oops, something went wrong, we could not send your comment.';
            this.toast.error(errorMessage);
            console.error(err);
          });
      }
    },
    handleRating(values: RatingForm, { resetForm }: any) {
      if (values.rating) {
        this.addRating({
          data: {
            rating: values.rating,
            comments: values.comments,
            toUser: { id: +this.userId }
          }
        })
          .then(() => {
            this.refetchUser();
            this.toast.success('Rating sent successfully.');
            resetForm();
          })
          .catch(err => {
            const errorMessage =
              err.message || 'Oops, something went wrong, we could not send your comment.';
            this.toast.error(errorMessage);
            console.error(err);
          });
      }
    },
    handleModal() {
      const playModal = document.getElementById('play-modal') as HTMLDivElement;
      playModal.classList.toggle('hidden');
      const body = document.querySelector('body') as HTMLBodyElement;
      body.classList.toggle('overflow-hidden');
    },
    handleEditingDescription() {
      this.editingDescription = this.editingDescription ? false : true;
    },
    handleNewAppointment({ date, game, matches }: AppointmentForm) {
      this.newAppointment({
        appointmentInput: {
          to: +this.userId,
          description: 'default description',
          date,
          game,
          matches: +matches
        }
      }).then(() => {
        this.toast.success('Your demand was sent !');
        this.handleModal();
      });
    }
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
