import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Header from '../components/layouts/Header.vue';
import Footer from '../components/layouts/Footer.vue';

import Home from '../views/Home.vue';
import UserProfile from '../views/UserProfile.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';

import BackOffice from '../views/back-office/index.vue';
import BackOfficeProfiles from '../views/back-office/profile/index.vue';
import BackOfficeProfileView from '../views/back-office/profile/View.vue';
import BackOfficeMeet from '../views/back-office/Meet.vue';
import BackOfficeTransaction from '../views/back-office/Transaction.vue';

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
      path: 'profile/:id',
      name: "Profile",
      props: true,
      component: BackOfficeProfileView 
    }, {
      path: 'furries-meet',
      name: "Meet",
      component: BackOfficeMeet 
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
