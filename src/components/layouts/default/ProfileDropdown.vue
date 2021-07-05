<template>
  <div class="relative inline-block text-left" v-click-outside="handleClickOutside">
    <div>
      <img
        v-if="user?.profileImage"
        :src="user.profileImage"
        alt="profile picture"
        class="object-cover inline-flex rounded-full h-10 w-10 cursor-pointer hover:opacity-80 transition duration-100"
        @click="handleDropdown"
      />
      <img
        v-if="!user?.profileImage"
        alt="placeholder profile picture"
        src="/images/photo-placeholder.jpg"
        class="inline-flex rounded-full h-10 w-10 object-cover cursor-pointer hover:opacity-80 transition duration-100"
        @click="handleDropdown"
      />
      <input
        type="file"
        id="uploadFile"
        class="hidden"
        ref="fileInput"
        accept="image/*"
        @change="onUploadFile"
      />
    </div>
    <transition name="fade">
      <div
        class="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-sm shadow-xl bg-purple-1100 focus:outline-none divide-y divide-gray-600 divide-opacity-30 border border-opacity-10"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
        v-if="open"
      >
        <div class="flex flex-col space-y-4 items-center justify-center m-4">
          <div class="relative">
            <div class="absolute" v-if="loading">
              <Loader />
            </div>
            <img
              v-if="user?.profileImage"
              :src="user?.profileImage"
              alt="profile picture"
              class="object-cover inline-flex rounded-full h-20 w-20 cursor-pointer hover:opacity-80 transition duration-100"
              @click="openInputFile"
            />
            <img
              v-if="!user?.profileImage"
              alt="placeholder profile picture"
              src="/images/photo-placeholder.jpg"
              class="inline-flex rounded-full h-20 w-20 object-cover cursor-pointer hover:opacity-80 transition duration-100"
              @click="openInputFile"
            />
          </div>
          <router-link :to="'/user/' + user.id">
            <span
              class="text-white hover:underline text-lg text-center font-medium w-44 truncate"
              >{{ user.username }}</span
            >
          </router-link>
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
                class="text-white px-4 py-2 text-sm hover:bg-purple-950 transition-colors duration-100 flex flex-row items-center space-x-2"
                role="menuitem"
                v-if="
                  !route.meta.authorizedOnly ||
                    (route.meta.authorizedOnly &&
                      (user.role === 'MODERATOR' || user.role === 'ADMIN'))
                "
                tabindex="-1"
              >
                <img
                  :src="`/images/${route.meta.icon}`"
                  class="opacity-100"
                  style="width: 24px; max-width: inherit"
                />
                <span>{{ route.name }}</span>
              </a>
            </router-link>
          </nav>
        </div>
        <div class="py-1" role="none">
          <div class="m-2 flex justify-center">
            <button
              v-if="user"
              class="px-3 py-1 rounded bg-transparent border border-purple-400 text-purple-400 hover:border-purple-300 hover:text-purple-300 transition duration-300"
              @click="handleLogout"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { updateProfilePicMutation } from '@/apollo/user.gql';
import { useToast } from 'vue-toastification';
import { useAuth } from '@/composables/auth';
import { useRouter } from 'vue-router';
import clickOutside from '@/library/click-outside';
import Loader from '@/components/Loader.vue';

interface UpdateProfilePicVariables {
  picture: File;
}

interface UpdateProfileMutationResponse {
  updateProfilePic: string;
}

export default defineComponent({
  name: 'ProfileDropdown',
  components: {
    Loader
  },
  data() {
    return {
      open: false,
      myProfileRoutes: [
        {
          path: '/back-office',
          name: 'Back Office',
          meta: { icon: 'icons/dashboard.svg', authorizedOnly: true }
        },
        {
          path: '/messages',
          name: 'Messages',
          meta: { icon: 'icons/email.svg' }
        },
        {
          path: '/appointments',
          name: 'Appointments',
          meta: { icon: 'icons/event.svg' }
        },
        {
          path: '/settings',
          name: 'Settings',
          meta: { icon: 'settings.svg' }
        }
      ]
    };
  },
  methods: {
    handleDropdown() {
      this.open = !this.open;
    },
    handleClickOutside() {
      if (this.open) {
        this.open = !this.open;
      }
    }
  },
  directives: {
    clickOutside
  },
  setup() {
    const fileInput = ref<HTMLInputElement>();
    const { mutate: updateProfilePic, loading } = useMutation<
      UpdateProfileMutationResponse,
      UpdateProfilePicVariables
    >(updateProfilePicMutation);
    const toast = useToast();
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
      logout().then(() => {
        console.log('dropdown', user?.value);
        router.push({ name: 'Home' });
      });
    };

    const openInputFile = () => {
      fileInput.value?.click();
    };

    const onUploadFile = (e: Event) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files) {
        return;
      }
      updateProfilePic({ picture: files[0] })
        .then(({ data }) => {
          if (user?.value && data) {
            user.value = { ...user?.value, profileImage: data.updateProfilePic };
          }
          toast.success('Image updated !');
        })
        .catch(() => toast.error('There was an error while uploading your image'));
    };

    return {
      fileInput,
      openInputFile,
      onUploadFile,
      user,
      handleLogout,
      loading
    };
  }
});
</script>

<style lang="postcss" scoped>
.fade-enter-active {
  @apply transition ease-out duration-100;
}
.fade-leave-active {
  @apply transition ease-in duration-75;
}
.fade-enter-from {
  @apply transform opacity-0 scale-95;
}
.fade-enter-to {
  @apply transform opacity-100 scale-100;
}
.fade-leave-from {
  @apply transform opacity-100 scale-100;
}
.fade-leave-to {
  @apply transform opacity-0 scale-95;
}
</style>
