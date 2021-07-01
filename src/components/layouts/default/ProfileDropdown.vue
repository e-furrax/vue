<template>
  <div class="relative inline-block text-left">
    <div>
      <img
        v-if="profile?.profileImage"
        :src="profile.profileImage"
        alt="profile picture"
        class="object-cover inline-flex rounded-full h-11 w-11 cursor-pointer hover:opacity-80 transition duration-100"
        @click="handleDropdown"
      />
      <span
        v-else
        alt="placeholder profile picture"
        class="inline-flex rounded-full h-11 w-11 cursor-pointer hover:opacity-80 transition duration-100 bg-gray-500"
        @click="handleDropdown"
      ></span>
      <input
        type="file"
        id="uploadFile"
        class="hidden"
        ref="fileInput"
        accept="image/*"
        @change="onUploadFile"
      />
    </div>

    <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
    <div
      class="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-purple-1100 focus:outline-none divide-y divide-orange-600 divide-opacity-50"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
      v-if="open"
    >
      <div class="flex flex-col space-y-4 items-center justify-center m-4">
        <img
          v-if="profile?.profileImage"
          :src="profile.profileImage"
          alt="profile picture"
          class="object-cover inline-flex rounded-full h-11 w-11 cursor-pointer hover:opacity-80 transition duration-100"
          @click="openInputFile"
        />
        <span
          v-else
          alt="placeholder profile picture"
          class="inline-flex rounded-full h-20 w-20 cursor-pointer hover:opacity-80 transition duration-100 bg-gray-500"
          @click="openInputFile"
        ></span>
        <span class="text-white text-lg font-medium w-44 truncate"
          >Jeannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnne</span
        >
      </div>
      <div class="py-1" role="none">
        <nav>
          <router-link
            :to="route.path"
            v-slot="{ href, isActive }"
            v-for="route in myProfileRoutes"
            :key="route.path"
          >
            <a
              :href="href"
              :class="isActive && 'bg-purple-950'"
              class="text-white block px-4 py-2 text-sm hover:bg-purple-950 transition-colors duration-100"
              role="menuitem"
              tabindex="-1"
              >{{ route.name }}</a
            >
          </router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { getProfileSidebar, updateProfilePicMutation } from '@/apollo/user.gql';
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
  name: 'ProfileDropdown',
  data() {
    return {
      open: false,
      myProfileRoutes: [
        {
          path: '/messages',
          name: 'Messages'
        },
        {
          path: '/history',
          name: 'History Transactions'
        },
        {
          path: '/settings',
          name: 'Settings'
        }
      ]
    };
  },
  computed: {
    routes() {
      return this.$router.options.routes.find(route => route.name === 'Settings')?.children;
    }
  },
  methods: {
    handleDropdown() {
      this.open = !this.open;
    }
  },
  mounted() {
    console.log(this.$router);
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

<style scoped></style>
