import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Header from '@/components/layouts/default/Header.vue';
import Footer from '@/components/layouts/default/Footer.vue';
import Home from '@/views/Home.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import Messages from '@/views/user-profile/Messages.vue';
import HistoryTransactions from '@/views/user-profile/HistoryTransactions.vue';
import Settings from '@/views/user-profile/Settings.vue';
import Search from '@/views/Search.vue';
import UserProfile from '@/views/UserProfile.vue';
import { backOfficeRoutes } from './backOffice';
import { useAuth } from '@/composables/auth';
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, ...myProfileRoutes, ...backOfficeRoutes]
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
