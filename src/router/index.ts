import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Header from '../components/layouts/Header.vue';
import Footer from '../components/layouts/Footer.vue';

import Home from '../views/Home.vue';
import UserProfile from '../views/UserProfile.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';

import BackOffice from '../views/BackOffice.vue';
import BackOfficeHeader from '../components/layouts/back-office/Header.vue';

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
    path: '/back-office',
    name: 'BackOffice',
    components: {
      // header: BackOfficeHeader,
      default: BackOffice
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
