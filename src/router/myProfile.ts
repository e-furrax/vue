import { RouteRecordRaw } from 'vue-router';
import MyProfile from '@/views/user-profile/MyProfile.vue';
import Settings from '@/views/user-profile/Settings.vue';
import HistoryTransactions from '@/views/user-profile/HistoryTransactions.vue';
import Account from '@/views/user-profile/Account.vue';
import Security from '@/views/user-profile/Security.vue';

import Header from '@/components/layouts/default/Header.vue';
import Footer from '@/components/layouts/default/Footer.vue';

export const myProfileRoutes: RouteRecordRaw = {
  path: '/profile',
  name: 'MyProfile',
  redirect: '/profile/settings',
  components: {
    default: MyProfile,
    header: Header,
    footer: Footer
  },
  children: [
    {
      path: 'settings',
      name: 'Settings',
      component: Settings,
      redirect: '/profile/settings/account',
      children: [
        {
          path: 'account',
          name: 'Account',
          component: Account,
          meta: { additionalInformations: 'Personal informations, Email', icon: 'ICON' }
        },
        {
          path: 'security',
          name: 'Security',
          component: Security,
          meta: { additionalInformations: 'Change Password', icon: 'ICON' }
        }
      ]
    },
    {
      path: 'history',
      name: 'History Transactions',
      component: HistoryTransactions
    }
  ]
};
