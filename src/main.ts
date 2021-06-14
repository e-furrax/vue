import { createApp, h, provide } from 'vue';
import './registerServiceWorker';
import App from './App.vue';
import router from './router';
import clickOutside from './library/click-outside';
import { ApolloClients } from '@vue/apollo-composable';
import { postgresClient, mongoClient } from './apollo/client';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './index.css';
import './assets/css/main.css';

createApp({
  setup() {
    provide(ApolloClients, {
      default: postgresClient,
      postgres: postgresClient,
      mongo: mongoClient
    });
  },
  render() {
    return h(App);
  }
})
  .directive('click-outside', clickOutside)
  .use(router)
  .use(Toast)
  .mount('#app');
