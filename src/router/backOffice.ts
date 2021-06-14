import { RouteRecordRaw } from 'vue-router';

import BackOffice from '@/views/back-office/index.vue';
import BackOfficeProfiles from '@/views/back-office/profile/index.vue';
import BackOfficeProfileId from '@/views/back-office/profile/id.vue';
import BackOfficeAppointement from '@/views/back-office/appointement/index.vue';
import BackOfficeTransaction from '@/views/back-office/transaction/index.vue';

import Header from '@/components/layouts/default/Header.vue';
import Footer from '@/components/layouts/default/Footer.vue';

export const backOfficeOverviewRoutes: RouteRecordRaw = {
  path: '/back-office',
  name: 'BackOffice',
  components: {
    header: Header,
    default: BackOffice,
    footer: Footer
  },
  children: [
    {
      path: 'profiles',
      name: 'Profiles',
      component: BackOfficeProfiles
    },
    {
      path: 'appointments',
      name: 'Appointements',
      component: BackOfficeAppointement
    },
    {
      path: 'transactions',
      name: 'Transactions',
      component: BackOfficeTransaction
    }
  ]
};

const backOfficeDetailsRoute: RouteRecordRaw[] = [
  {
    path: '/back-office/profile/:userId',
    name: 'Profile',
    props: true,
    component: BackOfficeProfileId
  }
  // {
  // path: 'transaction/:id',
  // name: 'Transaction',
  // component: BackOfficeTransactionView
  // }
];
export const backOfficeRoutes: RouteRecordRaw[] = [
  ...backOfficeDetailsRoute,
  backOfficeOverviewRoutes
];
