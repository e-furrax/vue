<template>
  <div class="flex flex-col items-start">
    <h2 class="font-semibold border-b-2 border-purple-800 mb-6">Personal Informations</h2>
    <form class="w-full md:w-96" @submit.prevent="saveChanges">
      <div class="">
        <div class="flex flex-col py-2 w-full">
          <label for="name" class="text-sm font-semibold">Name</label>
          <input type="text" id="name" class="h-10 p-4" v-model="username" />
          <Alert :message="usernameError" alert-type="danger" v-if="usernameError" />
        </div>
        <div class="flex flex-col py-2 w-full">
          <label for="email" class="text-sm font-semibold">Email Address</label>
          <input type="text" id="email" class="h-10 p-4" v-model="email" />
          <Alert :message="emailError" alert-type="danger" v-if="emailError" />
        </div>
        <div class="flex flex-col py-2 w-full">
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
      <div class="w-full flex flex-col items-start">
        <button
          class="w-full mt-2 border-none outline-none font-bold text-white uppercase rounded bg-purple-800 text-sm leading-8 py-1 hover:bg-purple-700 transition-all ease-in duration-200"
        >
          Save Changes
        </button>
        <button class="mt-2" type="button">Discard Changes</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { getProfileQuery, updateProfileMutation } from '@/apollo/user.gql';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent, watch } from 'vue';
import { useField, useForm } from 'vee-validate';
import Alert from '@/components/Alert.vue';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import {
  ProfileQuery,
  UpdateProfileMutationResponse,
  ProfileForm,
  UpdateProfileVariables
} from '@/models/profile.model';

export default defineComponent({
  name: 'Account',
  components: {
    Alert
  },
  setup() {
    const { result, loading, error } = useQuery<ProfileQuery>(getProfileQuery);
    const { value: myProfile } = useResult(result);

    const { mutate: updateProfile, loading: saveChangesLoading } = useMutation<
      UpdateProfileMutationResponse,
      UpdateProfileVariables
    >(updateProfileMutation, {
      update: (cache, { data }) => {
        const profileInCache = cache.readQuery<ProfileQuery>({ query: getProfileQuery });
        const newProfile = {
          getProfile: {
            ...profileInCache?.getProfile,
            ...data?.updateProfile
          }
        };
        cache.writeQuery({ query: getProfileQuery, data: newProfile });
      }
    });

    const schema = yup.object({
      username: yup
        .string()
        .required()
        .min(2),
      email: yup
        .string()
        .required()
        .email(),
      bio: yup.string().max(200)
    });

    const { handleSubmit, setFieldValue } = useForm<ProfileForm>({
      validationSchema: schema,
      initialValues: {
        username: myProfile?.username,
        email: myProfile?.email,
        bio: myProfile?.description
      }
    });

    watch(result, () => {
      setFieldValue('email', result.value.getProfile.email);
      setFieldValue('username', result.value.getProfile.username);
      setFieldValue('bio', result.value.getProfile.description);
    });

    const toast = useToast();

    const { value: username, errorMessage: usernameError } = useField<string>('username');
    const { value: email, errorMessage: emailError } = useField<string>('email');
    const { value: bio, errorMessage: bioError } = useField<string>('bio');

    const saveChanges = handleSubmit(values => {
      if (values.username && values.email && values.bio) {
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
      result,
      saveChangesLoading
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
