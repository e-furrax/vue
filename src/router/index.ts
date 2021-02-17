import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Header from '../components/layouts/Header.vue';
import Footer from '../components/layouts/Footer.vue';

import Home from '../views/Home.vue';
import UserProfile from '../views/UserProfile.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';

import BackOffice from '../views/BackOffice.vue';
import BackOfficeProfiles from '../views/Profiles.vue';
import BackOfficeMeet from '../views/Meet.vue';

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
    components :{
      header: Header,
      default: BackOffice,
      footer: Footer
    },
    children: [{
      path: '/profiles',
      component: BackOfficeProfiles 
    }, {
      path: '/furries-meet',
      component: BackOfficeMeet 
    }]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
