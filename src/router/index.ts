import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Header from '../components/layouts/default/Header.vue';
import Footer from '../components/layouts/default/Footer.vue';

import Home from '../views/Home.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';

import Search from '../views/Search.vue';
import UserProfile from '../views/UserProfile.vue';
import { myProfileRoutes } from './myProfile';
import { backOfficeRoutes } from './backOffice';

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
  },
  myProfileRoutes,
  ...backOfficeRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
