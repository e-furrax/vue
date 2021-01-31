import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './index.css';
import './assets/css/main.css';
import clickOutside from './library/click-outside';

createApp(App)
  .directive('click-outside', clickOutside)
  .use(store)
  .use(router)
  .mount('#app');
