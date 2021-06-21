<template>
  <h1 class="text-3xl font-semibold mb-6 text-white">Email Verification</h1>
  <p class="text-white">Fill in the box below with the code that was sent to</p>
  <span class="text-orange-500">{{ email }}</span>
  <form class="flex flex-col justify-center space-y-4 mt-4" @submit.prevent="verify">
    <input
      type="text"
      class="w-72 mx-1 h-14 text-center"
      maxlength="5"
      v-model="code"
      :class="error && 'border-error'"
    />
    <div class="text-red-500 flex justify-center">
      {{ error }}
    </div>
    <div class="flex justify-evenly">
      <button
        class="border-none outline-none font-bold text-white uppercase rounded bg-purple-800 text-sm leading-8 py-1 hover:bg-purple-700 transition-all ease-in duration-200 w-1/4"
        @click="sendNewCode"
      >
        Resend
      </button>
      <button
        class="border-none outline-none font-bold text-white uppercase rounded bg-purple-800 text-sm leading-8 py-1 hover:bg-purple-700 transition-all ease-in duration-200 w-1/4"
        type="submit"
      >
        Verify
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useField, useForm } from 'vee-validate';
import { object, number } from 'yup';
import { confirmUserMutation } from '@/apollo/user.gql';
import { useMutation } from '@vue/apollo-composable';
import { useRegisteredInfo } from '@/composables/registration';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

interface ConfirmUserMutationResponse {
  confirmUser: boolean;
}
export default defineComponent({
  name: 'SignUpFirstStep',
  setup() {
    const { mutate, error } = useMutation<ConfirmUserMutationResponse>(confirmUserMutation);
    const router = useRouter();
    const toast = useToast();
    const {
      state: { email }
    } = useRegisteredInfo();
    const schema = object({
      code: number().required()
    });
    const { handleSubmit } = useForm({ validationSchema: schema });
    const { value: code } = useField<number>('code');

    const verify = handleSubmit(values => {
      mutate(values).then(() => {
        toast.success('Welcome !');
        router.push({ name: 'Home' });
      });
    });

    return {
      schema,
      code,
      verify,
      email,
      error
    };
  },
  methods: {
    sendNewCode() {
      console.log('TODO send new code');
    }
  }
});
</script>

<style lang="postcss" scoped>
.form-grid {
  display: grid;
  grid-template-columns: 100%;
  row-gap: 20px;
  width: 100%;
}

.input-grid {
  display: grid;
  grid-template-areas: 'input';
  grid-template-columns: 1fr;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  border-radius: 3px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(136, 22, 22);
  min-width: 180px;
  padding: 8px 40px;
  box-sizing: border-box;
  transition: background-color 0.2s ease-in 0s, border 0.2s ease-in 0s, opacity 0.2s ease-in 0s;
  opacity: 1;
}

.border-error {
  border: 1px solid rgb(224, 18, 115);
}
</style>
