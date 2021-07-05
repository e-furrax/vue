import { RouteRecordRaw } from 'vue-router';

import BackOffice from '@/views/back-office/index.vue';
import BackOfficeProfiles from '@/views/back-office/profile/index.vue';
import BackOfficeProfileId from '@/views/back-office/profile/id.vue';
import BackOfficeAppointement from '@/views/back-office/appointement/index.vue';
import BackOfficeMessage from '@/views/back-office/message/index.vue';
import { ROLES } from '@/models/user.model';

import Header from '@/components/layouts/default/Header.vue';
import Footer from '@/components/layouts/default/Footer.vue';

export const backOfficeOverviewRoutes: RouteRecordRaw = {
  path: '/back-office',
  name: 'BackOffice',
  meta: { authorized: { roles: [ROLES.ADMIN, ROLES.MODERATOR], redirect: 'NotFound' } },
  redirect: '/back-office/profiles',
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
      path: 'comments',
      name: 'Comments',
      component: BackOfficeMessage
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
];
export const backOfficeRoutes: RouteRecordRaw[] = [
  ...backOfficeDetailsRoute,
  backOfficeOverviewRoutes
];
