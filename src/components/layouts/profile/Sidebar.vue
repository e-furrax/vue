<template>
  <div class="flex flex-col lg:w-80 sm:w-24 bg-purple-1100">
    <div class="flex flex-row items-center my-6 ml-6" v-if="profile">
      <img
        v-if="profile?.profileImage"
        :src="profile.profileImage"
        alt="profile picture"
        class="object-cover inline-flex rounded-full h-16 w-16 cursor-pointer hover:opacity-80 transition duration-100"
        @click="openInputFile"
      />
      <span
        v-else
        alt="placeholder profile picture"
        class="inline-flex rounded-full h-16 w-16 cursor-pointer hover:opacity-80 transition duration-100 bg-gray-500"
        @click="openInputFile"
      ></span>
      <input
        type="file"
        id="uploadFile"
        class="hidden"
        ref="fileInput"
        accept="image/*"
        @change="onUploadFile"
      />
      <span class="text-white mx-4 hidden lg:block">{{ profile.username }}</span>
    </div>
    <span class="text-blueGray-custom ml-6 text-sm font-semibold mt-2">Menu</span>
    <ul class="flex flex-col py-4">
      <div v-for="route in myProfileRoutes.children" :key="route.path">
        <router-link
          :to="`/profile/${route.path}`"
          v-slot="{ href, route, navigate, isActive }"
          custom
        >
          <li
            :class="[isActive && 'router-link-active']"
            class="hover:bg-purple-950 transition-colors duration-100"
          >
            <a
              :href="href"
              @click="navigate"
              class="flex flex-row items-center h-16 text-blueGray-custom ml-6"
            >
              <span
                class="inline-flex items-center justify-center bg-purple-500 rounded-xl h-10 w-10 text-xs text-white lg:mr-4"
                ><i>ICON</i></span
              >
              <span class="text-sm font-semibold hidden lg:block">{{ route.name }}</span>
            </a>
          </li>
        </router-link>
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { myProfileRoutes } from '@/router/myProfile';
import { getProfileSidebar, updateProfilePicMutation } from '@/apollo/user.gql';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { useToast } from 'vue-toastification';

interface ProfileSidebarResponse {
  getProfile: {
    id: string;
    profileImage: string;
    username: string;
  };
}

interface UpdateProfilePicVariables {
  picture: File;
}

export default defineComponent({
  name: 'Sidebar',
  data() {
    return {
      myProfileRoutes
    };
  },
  setup() {
    const fileInput = ref<HTMLInputElement>();
    const { mutate: updateProfilePic } = useMutation<boolean, UpdateProfilePicVariables>(
      updateProfilePicMutation
    );
    const { result } = useQuery<ProfileSidebarResponse>(getProfileSidebar);
    const { value: profile } = useResult(result);
    const toast = useToast();

    const openInputFile = () => {
      fileInput.value?.click();
    };

    const onUploadFile = (e: Event) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files) {
        return;
      }
      updateProfilePic({ picture: files[0] })
        .then(() => toast.success('Image updated !'))
        .catch(() => toast.error('There was an error while uploading your image'));
    };

    return {
      fileInput,
      openInputFile,
      onUploadFile,
      profile
    };
  }
});
</script>

<style lang="postcss" scoped>
.router-link-active {
  @apply border-l-2 border-purple-400 bg-purple-950;
}
</style>
