import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Header from '../components/layouts/default/Header.vue';
import Footer from '../components/layouts/default/Footer.vue';

import Home from '../views/Home.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';

import Search from '../views/Search.vue';
import UserProfile from '../views/UserProfile.vue';

import BackOffice from '../views/back-office/index.vue';
import BackOfficeProfiles from '../views/back-office/profile/index.vue';
import BackOfficeProfileView from '../views/back-office/profile/View.vue';
import BackOfficeAppointement from '../views/back-office/appointement/index.vue';
import BackOfficeTransaction from '../views/back-office/transaction/index.vue';

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
      footer: Footer,
    },
  },
  {
    path: '/user-show/:userId',
    name: 'UserShow',
    props: true,
    components: {
      default: UserProfile,
      header: Header,
      footer: Footer
    }
  },
  {
    path: '/back-office',
    name:"BackOffice",
    components :{
      header: Header,
      default: BackOffice,
      footer: Footer
    },
    children: [{
      path: 'profiles',
      name: "Profiles",
      component: BackOfficeProfiles,
    },{
      path: 'profile/:userId',
      name: "Profile",
      props: true,
      component: BackOfficeProfileView 
    }, {
      path: 'appointements',
      name: "Appointement",
      component: BackOfficeAppointement
    },
    {
      path: 'transactions',
      name: "Transactions",
      component: BackOfficeTransaction
    },
    // {
    //   path: 'transaction/:id',
    //   name: "Transaction",
    //   component: BackOfficeTransactionView 
    // },
  ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
