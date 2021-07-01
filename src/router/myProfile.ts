import Account from '@/views/user-profile/Account.vue';
import Security from '@/views/user-profile/Security.vue';
import Connections from '@/views/user-profile/Connections.vue';
import Header from '@/components/layouts/default/Header.vue';
import Footer from '@/components/layouts/default/Footer.vue';
import Messages from '@/views/user-profile/Messages.vue';
import HistoryTransactions from '@/views/user-profile/HistoryTransactions.vue';
import Settings from '@/views/user-profile/Settings.vue';
import { RouteRecordRaw } from 'vue-router';

export const settingsRoutes: Array<RouteRecordRaw> = [
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
];

export const myProfileRoutes: Array<RouteRecordRaw> = [
  {
    path: '/messages',
    name: 'Messages',
    components: {
      default: Messages,
      header: Header,
      footer: Footer
    }
  },
  {
    path: '/history',
    name: 'History Transactions',
    components: {
      default: HistoryTransactions,
      header: Header,
      footer: Footer
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    components: {
      default: Settings,
      header: Header,
      footer: Footer
    },
    redirect: '/settings/account',
    children: settingsRoutes
  }
];
