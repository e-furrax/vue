<template>
  <div class="space-y-12 my-16">
    <h1 class="font-bold text-2xl">Account Settings</h1>
    <hr class="border-white opacity-20" />
    <h2 class="font-semibold text-xl">Personal Informations</h2>
    <form class="space-y-16" @submit.prevent="saveChanges" v-if="myProfile">
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
import { getProfile, updateProfileMutation } from '@/apollo/user.gql';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent } from 'vue';
import { useField, useForm } from 'vee-validate';
import Alert from '@/components/Alert.vue';
import * as yup from 'yup';
import UserModel from '@/models/user.model';
import { useToast } from 'vue-toastification';

export interface Profile {
  getProfile: {
    username: string;
    email: string;
    description: string;
  };
}

interface ProfileForm {
  email?: string;
  username?: string;
  bio?: string;
}

interface UpdateProfileVariables {
  data: {
    username: string;
    email: string;
    description?: string;
  };
}

export default defineComponent({
  name: 'Account',
  components: {
    Alert
  },
  setup() {
    const { result, loading, error } = useQuery<Profile>(getProfile);
    const { value: myProfile } = useResult(result);

    const { mutate: updateProfile } = useMutation<Partial<UserModel>, UpdateProfileVariables>(
      updateProfileMutation
    );

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

    const { handleSubmit } = useForm<ProfileForm>({
      validationSchema: schema,
      initialValues: {
        email: myProfile?.email,
        username: myProfile?.username,
        bio: myProfile?.description
      }
    });

    const toast = useToast();

    const { value: username, errorMessage: usernameError } = useField<string>('username');
    const { value: email, errorMessage: emailError } = useField<string>('email');
    const { value: bio, errorMessage: bioError } = useField<string>('bio');

    const saveChanges = handleSubmit(values => {
      if (values.username && values.email) {
        updateProfile({
          data: {
            username: values.username,
            email: values.email,
            description: values.bio
          }
        }).then(() => {
          toast.success('Account informations updated');
        });
      }
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
      saveChanges,
      result
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
