<template>
  <h1 class="text-3xl font-semibold mb-6 text-white">Email Verification</h1>
  <p class="text-white">Fill in the box below with the code that was sent to</p>
  <span class="text-orange-500">{{ email }}</span>
  <Form
    class="flex flex-col justify-center space-y-4 mt-4"
    @submit="verify"
    :validation-schema="schema"
  >
    <Field
      type="text"
      class="w-72 mx-1 h-14 text-center"
      maxlength="5"
      name="code"
      :class="error && 'border-error'"
    />
    <div class="text-red-500 flex justify-center">
      {{ error }}
    </div>
    <div class="flex justify-evenly">
      <button
        class="border-none outline-none font-bold text-white uppercase rounded bg-purple-700 bg-opacity-50 text-sm leading-8 py-1 hover:bg-purple-700 transition-all ease-in duration-200 w-1/4"
        type="button"
        @click="sendNewCode"
      >
        Resend
      </button>
      <button
        class="border-none outline-none font-bold text-white uppercase rounded bg-purple-700 bg-opacity-50 text-sm leading-8 py-1 hover:bg-purple-700 transition-all ease-in duration-200 w-1/4"
        type="submit"
      >
        Verify
      </button>
    </div>
  </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Form, Field } from 'vee-validate';
import { object, number } from 'yup';
import { confirmUserMutation } from '@/apollo/user.gql';
import { useMutation } from '@vue/apollo-composable';
import { useRegisteredInfo } from '@/composables/registration';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { ConfirmUserMutationResponse } from '@/models/user.model';
import { useAuth } from '@/composables/auth';
import { useStep } from '@/composables/stepper';

export default defineComponent({
  name: 'SignUpFirstStep',
  components: {
    Form,
    Field
  },
  setup() {
    const { mutate, error } = useMutation<ConfirmUserMutationResponse>(confirmUserMutation);
    const router = useRouter();
    const toast = useToast();
    const {
      state: { email }
    } = useRegisteredInfo();
    const { setUser } = useAuth();
    const { setStep } = useStep();
    const schema = object({
      code: number().required()
    });

    const verify = (values: { code: string }) => {
      mutate(values).then(({ data }) => {
        if (data) {
          setUser(data.confirmUser);
          toast.success('Welcome !');
          router.push({ name: 'Home' });
          setStep(1);
        }
      });
    };

    return {
      schema,
      verify,
      email,
      error,
      mutate
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
