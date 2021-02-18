import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import Header from '../components/layouts/Header.vue';
import Footer from '../components/layouts/Footer.vue';
import Test from '../views/Test.vue';

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
    path: '/test',
    component: Test
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
