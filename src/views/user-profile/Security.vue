<template>
  <div class="flex flex-col items-start">
    <h2 class="font-semibold border-b-2 border-purple-800 mb-6">Change Password</h2>
    <form class="w-full md:w-96" @submit.prevent="changePassword">
      <div>
        <div class="flex flex-col py-2 w-full">
          <label for="password-old" class="text-sm font-semibold"
            >Initial Password<span class="text-red-500 ml-1">*</span></label
          >
          <input type="password" id="password-old" class="h-10 p-4" v-model="initialPassword" />
          <Alert :message="initialPasswordError" alert-type="danger" v-if="initialPasswordError" />
        </div>
        <div class="flex flex-col py-2 w-full">
          <label for="password-new" class="text-sm font-semibold"
            >New Password<span class="text-red-500 ml-1">*</span></label
          >
          <input type="password" id="password-new" class="h-10 p-4" v-model="newPassword" />
          <Alert :message="newPasswordError" alert-type="danger" v-if="newPasswordError" />
        </div>
      </div>
      <button
        class="w-full mt-2 border-none outline-none font-bold text-white uppercase rounded bg-purple-800 text-sm leading-8 py-1 hover:bg-purple-700 transition-all ease-in duration-200"
      >
        Change Password
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { updatePasswordMutation } from '@/apollo/user.gql';
import { useMutation } from '@vue/apollo-composable';
import Alert from '@/components/Alert.vue';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { useToast } from 'vue-toastification';

interface ChangePasswordVariables {
  initialPassword: string;
  newPassword: string;
}

export default defineComponent({
  name: 'Security',
  components: { Alert },
  setup() {
    const { mutate: updatePassword } = useMutation<boolean, ChangePasswordVariables>(
      updatePasswordMutation
    );

    const schema = yup.object({
      initialPassword: yup.string().required('Initial Password is a required field'),
      newPassword: yup
        .string()
        .required('New Password is a required field')
        .min(8, 'Password should be 8 characters minimum')
    });

    const { handleSubmit } = useForm<ChangePasswordVariables>({
      validationSchema: schema
    });

    const { value: initialPassword, errorMessage: initialPasswordError } = useField<string>(
      'initialPassword'
    );
    const { value: newPassword, errorMessage: newPasswordError } = useField<string>('newPassword');

    const toast = useToast();

    const changePassword = handleSubmit(values => {
      updatePassword(values).then(() => toast.success('Password updated'));
    });

    return {
      changePassword,
      initialPassword,
      initialPasswordError,
      newPassword,
      newPasswordError
    };
  }
});
</script>

<style lang="postcss" scoped>
input,
textarea {
  @apply text-white bg-purple-1100 shadow-md border rounded-md;
  border-color: rgba(255, 255, 255, 0.2);
  resize: none !important;
}
</style>
