<template>
  <div class="space-y-12 my-16">
    <h1 class="font-bold text-2xl">Account Settings</h1>
    <hr class="border-white opacity-20" />
    <h2 class="font-semibold text-xl">Personal Informations</h2>
    <form class="space-y-16" @submit.prevent="saveChanges">
      <div class="space-y-5">
        <div class="flex flex-col space-y-1 max-w-lg">
          <label for="name" class="text-sm font-semibold">Name</label>
          <input type="text" id="name" class="h-10 p-4" v-model="username" />
          <Alert :message="usernameError" alert-type="danger" v-if="usernameError" />
        </div>
        <div class="flex flex-col space-y-1 max-w-lg">
          <label for="email" class="text-sm font-semibold">Email Address</label>
          <input type="text" id="email" class="h-10 p-4" v-model="email" />
          <Alert :message="emailError" alert-type="danger" v-if="emailError" />
        </div>
        <div class="flex flex-col space-y-1 max-w-lg">
          <label for="bio" class="text-sm font-semibold" maxlength="200">Bio</label>
          <textarea
            id="bio"
            rows="2"
            class="p-4 placeholder-gray-500 placeholder-opacity-70"
            placeholder="Write a short bio to introduce yourself"
            v-model="bio"
          ></textarea>
          <Alert :message="bioError" alert-type="danger" v-if="bioError" />
        </div>
      </div>
      <hr class="border-white opacity-20" />
      <div class="max-w-lg flex justify-between">
        <button>Discard Changes</button>
        <button
          type="submit"
          class="bg-purple-700 rounded-full py-2 px-12 hover:bg-purple-600 transition-all duration-200"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { getProfile } from '@/apollo/user.gql';
import { useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent } from 'vue';
import { useField, useForm } from 'vee-validate';
import Alert from '@/components/Alert.vue';
import * as yup from 'yup';

export interface Profile {
  getProfile: {
    username: string;
    email: string;
    description: string;
  };
}

export default defineComponent({
  name: 'Account',
  components: {
    Alert
  },
  setup() {
    const { result, loading, error } = useQuery<Profile>(getProfile);
    const myProfile = useResult(result, null, data => data.getProfile);
    console.log(myProfile.value);

    const schema = yup.object({
      username: yup
        .string()
        .required()
        .min(8),
      email: yup
        .string()
        .required()
        .email(),
      bio: yup.string().max(200)
    });

    const { handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        email: myProfile.value?.email,
        username: myProfile.value?.username,
        bio: myProfile.value?.description
      }
    });

    const { value: username, errorMessage: usernameError } = useField<string>('username');
    const { value: email, errorMessage: emailError } = useField<string>('email');
    const { value: bio, errorMessage: bioError } = useField<string>('bio');

    const saveChanges = handleSubmit(values => {
      alert(JSON.stringify(values, null, 2));
    });

    return {
      myProfile,
      loading,
      error,
      username,
      usernameError,
      email,
      emailError,
      bio,
      bioError,
      saveChanges
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
