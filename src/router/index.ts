import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Header from '@/components/layouts/default/Header.vue';
import Footer from '@/components/layouts/default/Footer.vue';
import Home from '@/views/Home.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import Search from '@/views/Search.vue';
import UserProfile from '@/views/UserProfile.vue';
import Privacy from '@/views/Privacy.vue';
import Terms from '@/views/Terms.vue';
import RequestResetPassword from '@/views/ResetPassword.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import BecomeFurrax from '@/views/BecomeFurrax.vue';
import NotFound from '@/views/NotFound.vue';
import { ROLES } from '@/models/user.model';

import { backOfficeRoutes } from './backOffice';
import { useAuth } from '@/composables/auth';
import { useAuthorization } from '@/composables/authorization';
import { watch } from 'vue-demi';
import { myProfileRoutes } from './myProfile';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      header: Header,
      footer: Footer
    }
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/request-reset-password',
    name: 'RequestResetPassword',
    component: RequestResetPassword
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/search',
    name: 'Search',
    components: {
      default: Search,
      header: Header,
      footer: Footer
    }
  },
  {
    path: '/user/:userId',
    name: 'UserProfile',
    props: true,
    components: {
      default: UserProfile,
      header: Header,
      footer: Footer
    }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    components: {
      default: Privacy,
      header: Header,
      footer: Footer
    }
  },
  {
    path: '/terms',
    name: 'Terms',
    components: {
      default: Terms,
      header: Header,
      footer: Footer
    }
  },
  {
    path: '/become-furrax',
    name: 'BecomeFurrax',
    meta: { authorized: { roles: [ROLES.USER], redirect: 'Account' } },
    components: {
      default: BecomeFurrax,
      header: Header,
      footer: Footer
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...routes,
    ...myProfileRoutes,
    ...backOfficeRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      components: {
        default: NotFound,
        header: Header,
        footer: Footer
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const { user, authenticating } = useAuth();
  watch([user], () => {
    if (authenticating.value === false && to.meta.requiresAuth && user?.value) {
      next();
    }
  });
  // Not logged into a guarded route?
  if (to.meta.requiresAuth && !user?.value && authenticating.value === false) {
    next({ name: 'SignIn' });
  }
  if (to.meta.authorized) {
    const { isAuthorized } = useAuthorization(to.meta.authorized.roles);
    if (!isAuthorized()) {
      next({ name: to.meta.authorized.redirect || (from.name as string) });
    }
    next();
  }
  // // Logged in for an auth route
  else if ((to.name === 'SignIn' || to.name === 'SignUp') && user?.value) {
    next({ name: 'Home' });
  }
  // // Carry On...
  else {
    next();
  }
});

export default router;
