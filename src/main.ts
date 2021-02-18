import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './index.css';
import './assets/css/main.css';
import clickOutside from './library/click-outside';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3020/graphql'
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache
});

createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .directive('click-outside', clickOutside)
  .use(store)
  .use(router)
  .mount('#app');
