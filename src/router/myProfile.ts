import { RouteRecordRaw } from 'vue-router';
import MyProfile from '@/views/user-profile/MyProfile.vue';
import Settings from '@/views/user-profile/Settings.vue';

import Header from '@/components/layouts/default/Header.vue';
import Footer from '@/components/layouts/default/Footer.vue';

export const myProfileRoutes: RouteRecordRaw = {
  path: '/profile',
  name: 'MyProfile',
  components: {
    default: MyProfile,
    header: Header,
    footer: Footer
  },
  children: [
    {
      path: 'settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: 'settings',
      name: 'Settings',
      component: Settings
    }
  ]
};
