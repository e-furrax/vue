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
      v-show="!isEditing && isOwner()"
      title="Edit"
    />
    <img
      class="
        absolute
        bottom-1
        right-1
        cursor-pointer
        hover:bg-red-400
        rounded-full
        transition
        duration-200
        p-1
        hover:bg-opacity-40
      "
      src="/images/icons/delete.svg"
      width="24"
      :data-id="statistic?.id"
      @click="handleDelete"
      v-show="!isEditing && isOwner()"
      title="Edit"
    />
    <!-- <img width="60" /> -->
    <div v-show="!isEditing" class="flex flex-col ml-3">
      <span class="font-bold">{{ statistic ? statistic.game.name : '' }}</span>
      <span class="text-sm text-gray-200">{{ statistic ? statistic.rank : '' }}</span>
      <span class="text-xs text-gray-200">{{ statistic ? statistic.mode : '' }}</span>
    </div>
    <Form
      class="flex flex-col ml-3"
      :validation-schema="schema"
      @submit="handleGame"
      v-show="isEditing"
    >
      <Field class="hidden" type="text" name="id" :value="statistic?.id" />
      <Field
        as="select"
        class="px-1 mb-0.5 border border-purple-custom bg-white bg-opacity-10 rounded"
        name="game"
        ref="myGameAdd"
        @input="changeBackground"
      >
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
        :value="statistic?.rank"
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
        :value="statistic?.mode"
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
import { defineComponent, reactive, ref } from 'vue';
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
    id?: number;
    rank: string;
    mode: string;
    game: {
      id: number;
    };
    playerId?: string;
  };
}

interface StatisticForm {
  id: string;
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
      isEditing: this.editing
    };
  },
  props: {
    games: [],
    editing: Boolean,
    addGameCard: Boolean,
    statistic: Object
  },
  inject: ['isOwner', 'authorized'],
  setup(props) {
    provideApolloClient(postgresClient);
    const myGameAdd = ref();

    const backgrounds = [
      '/images/backgrounds/lowres/rl.jpg',
      '/images/backgrounds/lowres/lol.jpg',
      '/images/backgrounds/lowres/valorant.jpg',
      '/images/backgrounds/lowres/csgo.jpg'
    ];

    const backgroundSrc = reactive({ value: backgrounds[props.statistic?.game.id - 1] });

    const { user } = useAuth();

    const schema = yup.object({
      id: yup.string(),
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
      backgrounds,
      upsertStatistic,
      deleteStatistic,
      myGameAdd
    };
  },
  methods: {
    handleDelete({ target }: { target: HTMLImageElement }) {
      const statisticId = target.dataset.id;
      if (statisticId) {
        this.deleteStatistic({ id: +statisticId }).then(() => {
          this.$emit('delete-statistic');
          this.toast.success('Rank deleted successfully!');
        });
      }
    },
    changeBackground({ target }: { target: HTMLSelectElement }) {
      this.backgroundSrc.value = this.backgrounds[+target.value - 1];
    },
    emitAddingGame() {
      if (this.addGameCard) {
        this.$emit('adding-game', false);
      }

      if (!this.addGameCard) {
        this.isEditing = false;
      }
    },
    handleGame(values: StatisticForm, { resetForm }: any) {
      const { id, game, mode, rank } = values;
      this.upsertStatistic({
        data: {
          id: id ? +id : undefined,
          game: { id: +game },
          mode,
          rank
        }
      }).then(() => {
        if (!this.addGameCard) {
          this.isEditing = false;
        }
        if (this.addGameCard) {
          this.backgroundSrc.value = '';
        }
        this.$emit('upsert-statistic');
        this.toast.success('Rank added successfully!');
        resetForm();
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
