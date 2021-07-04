import Account from '@/views/user-profile/Account.vue';
import Security from '@/views/user-profile/Security.vue';
import Header from '@/components/layouts/default/Header.vue';
import Footer from '@/components/layouts/default/Footer.vue';
import Messages from '@/views/user-profile/Messages.vue';
import Appointments from '@/views/user-profile/Appointments.vue';
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
    meta: {
      additionalInformations: 'Change Password',
      icon: 'policy.svg'
    }
  }
];

export const myProfileRoutes: Array<RouteRecordRaw> = [
  {
    path: '/messages',
    name: 'Messages',
    meta: { requiresAuth: true },
    components: {
      default: Messages,
      header: Header,
      footer: Footer
    }
  },
  {
    path: '/appointments',
    name: 'Appointments',
    meta: { requiresAuth: true },
    components: {
      default: Appointments,
      header: Header,
      footer: Footer
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    meta: { requiresAuth: true },
    components: {
      default: Settings,
      header: Header,
      footer: Footer
    },
    redirect: '/settings/account',
    children: settingsRoutes
  }
];
