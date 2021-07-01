<template>
  <div
    class="
      game-rank
      flex
      items-center
      py-2
      h-20
      px-3
      border border-purple-custom
      hover:border-purple-900
      transition
      duration-200
      rounded-sm
      relative
    "
    :style="
      `
        background-image: linear-gradient(to left, rgba(27, 21, 61, 0.5) 100px, rgba(27, 21, 61, 1) 140px),
    url('${backgroundSrc.value}');
    `
    "
  >
    <img
      class="
        absolute
        top-1
        right-1
        cursor-pointer
        hover:bg-white
        rounded-full
        transition
        duration-200
        p-1
        hover:bg-opacity-20
      "
      src="/images/icons/edit.svg"
      width="24"
      @click="isEditing = true"
      v-show="!isEditing"
      title="Edit"
    />
    <img :src="image" width="60" />
    <div v-show="!isEditing" class="flex flex-col ml-3">
      <span class="font-bold">{{ game }}</span>
      <span class="text-sm text-gray-200">{{ rank }}</span>
      <span class="text-xs text-gray-200">{{ mode }}</span>
    </div>
    <Form
      class="flex flex-col ml-3"
      :validation-schema="schema"
      @submit="handleGame"
      v-show="isEditing"
    >
      <Field
        as="select"
        class="px-1 mb-0.5 border border-purple-custom bg-white bg-opacity-10 rounded"
        name="game"
        ref="myGameAdd"
        @input="changeBackground"
      >
        <option class="bg-black" value="" select hidden>Game</option>
        <option
          class="bg-purple-950"
          v-for="currentGame of games"
          :key="currentGame.id"
          :value="currentGame.id"
        >
          {{ currentGame.name }}
        </option>
      </Field>
      <Field
        class="
          px-1
          mb-0.5
          text-sm
          bg-white bg-opacity-10
          border border-purple-custom
          text-white
          rounded-sm
        "
        type="text"
        placeholder="Rank"
        name="rank"
        :value="rank"
      />
      <Field
        class="
          px-1
          text-xs
          bg-white bg-opacity-10
          border border-purple-custom
          text-white
          rounded-sm
        "
        type="text"
        placeholder="Mode"
        name="mode"
        :value="mode"
      />
      <div class="absolute bottom-0 right-1 items-center">
        <button
          class="
            cursor-pointer
            hover:bg-red-500
            rounded-full
            transition
            duration-200
            p-1
            hover:bg-opacity-20
          "
          @click.prevent="emitAddingGame"
        >
          <img src="/images/icons/close.svg" width="18" />
        </button>
        <button
          type="submit"
          class="
            cursor-pointer
            hover:bg-green-500
            rounded-full
            transition
            duration-200
            p-1
            hover:bg-opacity-20
          "
        >
          <img src="/images/icons/done.svg" width="18" />
        </button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import * as yup from 'yup';
import { Field, Form } from 'vee-validate';
import { provideApolloClient, useMutation } from '@vue/apollo-composable';
import { postgresClient } from '@/apollo/client';
import { useAuth } from '@/composables/auth';
import { useToast } from 'vue-toastification';
import { upsertStatisticMutation, deleteStatisticMutation } from '@/apollo/statistic.gql';
import StatisticModel from '@/models/statistic.model';

interface UpsertStatisticVariables {
  data: {
    rank: string;
    mode: string;
    game: {
      id: number;
    };
    playerId?: string;
  };
}

interface StatisticForm {
  rank: string;
  mode: string;
  game: string;
  playerId?: string;
}

export default defineComponent({
  name: 'GameRank',
  components: {
    Field,
    Form
  },
  data() {
    return {
      isEditing: this.editing,
      backgrounds: [
        '/images/backgrounds/lowres/rl.jpg',
        '/images/backgrounds/lowres/lol.jpg',
        '/images/backgrounds/lowres/valorant.jpg',
        '/images/backgrounds/lowres/csgo.jpg'
      ]
    };
  },
  props: {
    background: String,
    rank: String,
    mode: String,
    games: [],
    game: String,
    image: String,
    editing: Boolean
  },
  setup(props) {
    provideApolloClient(postgresClient);

    const backgroundSrc = reactive({ value: props.background });

    const { user } = useAuth();

    const schema = yup.object({
      game: yup
        .string()
        .required()
        .min(1)
        .max(40),
      mode: yup
        .string()
        .required()
        .max(1)
        .max(40),
      rank: yup
        .string()
        .required()
        .max(1)
        .max(40)
    });

    const { mutate: upsertStatistic } = useMutation<
      Partial<StatisticModel>,
      UpsertStatisticVariables
    >(upsertStatisticMutation);

    const { mutate: deleteStatistic } = useMutation<Partial<boolean>, { id: number }>(
      deleteStatisticMutation
    );

    const toast = useToast();

    return {
      toast,
      schema,
      user,
      backgroundSrc,
      upsertStatistic,
      deleteStatistic
    };
  },
  methods: {
    changeBackground({ target }: { target: HTMLSelectElement }) {
      this.backgroundSrc.value = this.backgrounds[+target.value - 1];
    },
    emitAddingGame() {
      this.$emit('adding-game', false);
    },
    handleGame(values: StatisticForm) {
      const { game, mode, rank } = values;
      this.upsertStatistic({
        data: {
          game: { id: +game },
          mode,
          rank
        }
      }).then(() => {
        this.isEditing = false;
        this.toast.success('Rank added successfully!');
      });
    }
  }
});
</script>

<style lang="postcss" scoped>
.game-rank {
  background-repeat: no-repeat;
  background-position: right center;
  background-size: auto 100%;
  @apply bg-purple-1100;
}

.border-purple-custom {
  border-color: #3b2963;
}
</style>
