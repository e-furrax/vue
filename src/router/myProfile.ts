import { RouteRecordRaw } from 'vue-router';
import MyProfile from '@/views/user-profile/MyProfile.vue';
import Settings from '@/views/user-profile/Settings.vue';
import HistoryTransactions from '@/views/user-profile/HistoryTransactions.vue';
import Account from '@/views/user-profile/Account.vue';
import Security from '@/views/user-profile/Security.vue';
import Connections from '@/views/user-profile/Connections.vue';
import Messages from '@/views/user-profile/Messages.vue';

import Header from '@/components/layouts/default/Header.vue';

export const myProfileRoutes: RouteRecordRaw = {
  path: '/profile',
  name: 'MyProfile',
  meta: { requiresAuth: true },
  redirect: '/profile/settings',
  components: {
    default: MyProfile,
    header: Header
  },
  children: [
    {
      path: 'messages',
      name: 'Messages',
      component: Messages,
      meta: { icon: 'icons/email.svg' }
    },
    {
      path: 'history',
      name: 'History Transactions',
      component: HistoryTransactions,
      meta: { icon: 'receipt_long.svg' }
    },
    {
      path: 'settings',
      name: 'Settings',
      component: Settings,
      redirect: '/profile/settings/account',
      meta: { icon: 'settings.svg' },
      children: [
        {
          path: 'account',
          name: 'Account',
          component: Account,
          meta: {
            additionalInformations: 'Personal informations, Email',
            icon: 'manage_accounts.svg'
          }
        },
        {
          path: 'security',
          name: 'Security',
          component: Security,
          meta: { additionalInformations: 'Change Password', icon: 'policy.svg' }
        },
        {
          path: 'connections',
          name: 'Connections',
          component: Connections,
          meta: {
            additionalInformations: 'Connect your accounts to unlock special integrations.',
            icon: 'settings_input_component.svg'
          }
        }
      ]
    }
  ]
};
