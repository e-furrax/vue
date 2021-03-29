import { createApp, h, provide } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './index.css';
import './assets/css/main.css';
import clickOutside from './library/click-outside';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { apolloClient } from './apollo/client';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render() {
    return h(App);
  }
})
  .directive('click-outside', clickOutside)
  .use(store)
  .use(router)
  .use(Toast)
  .mount('#app');
