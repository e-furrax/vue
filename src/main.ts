import { createApp, h, provide } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './index.css';
import './assets/css/main.css';
import clickOutside from './library/click-outside';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';

// Create the apollo client
const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${localStorage.getItem('furrax_token')}` as string
  }
});

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
  .mount('#app');
