<template>
  <div class="body">
    <router-view name="header" class="navbar" />
    <router-view />
    <router-view name="footer" class="footer" />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useSubscription } from '@vue/apollo-composable';
import { useToast } from 'vue-toastification';
import { useAuth } from './composables/auth';
import { newMessageSubscription } from '@/apollo/message.gql';
import ChatNotification from '@/components/ChatNotification.vue';

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const { user } = useAuth();
    const route = useRoute();

    if (user) {
      const toast = useToast();
      const { result: newMessageSubResult } = useSubscription(newMessageSubscription);

      watch(newMessageSubResult, data => {
        if (
          route.name !== 'Messages' &&
          user.value &&
          data.newMessage.toUser.id === user.value.id
        ) {
          toast(
            {
              component: ChatNotification,
              props: { message: data.newMessage }
            },
            {
              toastClassName: 'my-custom-toast-class',
              timeout: 5000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: false,
              icon: false,
              rtl: false
            }
          );
        }
      });
    }
  }
});
</script>

<style lang="postcss">
html,
body {
  width: 100%;
  height: 100%;
}

.Vue-Toastification__toast--default.my-custom-toast-class {
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  background-color: rgba(44, 39, 79, 0.5);
  border: 1px solid #382f66;
  padding: 12px 14px;
}

.footer {
  margin-top: auto;
}

.body {
  height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
}
</style>
