<template>
  <div class="flex text-white h-full">
    <section class="flex flex-col border-r-2 border-opacity-20 md:w-84">
      <div class="flex flex-col items-start py-6">
        <h2 class="font-semibold border-b-2 border-purple-800 mb-6 mx-4 md:mx-6">Conversations</h2>
        <ul v-if="!loading" class="w-full">
          <li
            v-for="conversation in conversations"
            :key="conversation"
            :data-user-id="conversation.id"
            @click="setConversationId"
            class="
              flex
              h-16
              px-4
              md:px-6
              items-center
              text-gray-400
              transition
              duration-100
              hover:bg-purple-1000
              hover:text-white
              opacity-75
              hover:opacity-100
              cursor-pointer
            "
          >
            <img
              src="/images/avatar1.png"
              class="
                pointer-events-none
                rounded-full
                border border-purple-100 border-opacity-20
                mr-2
              "
              style="width: 50px"
            />
            <div class="pointer-events-none ml-2 md:flex hidden flex-col">
              <h3 class="font-semibold text-sm text-white">{{ conversation.username }}</h3>
              <span class="text-xs text-gray-400">today</span>
            </div>
          </li>
          <div
            v-if="!conversations || !conversations.length"
            class="md:px-6 px-4 opacity-75 font-normal"
          >
            No conversations.
          </div>
          <button
            class="
              md:mx-6
              mx-4
              mt-6
              px-3
              py-1
              mx-2
              rounded
              bg-transparent
              border border-purple-400
              text-purple-400
              hover:border-purple-300
              hover:text-purple-300
              transition
              duration-200
            "
          >
            New message
          </button>
        </ul>
        <div class="mx-4 md:mx-6" v-else>
          <Loader />
        </div>
      </div>
    </section>
    <section class="flex flex-col items-start mt-6 w-full">
      <h2 class="font-semibold border-purple-800 mb-4 ml-6">Messages</h2>
      <div
        v-if="selectedConversationToUserId"
        ref="displayedConversationDOM"
        class="overflow-y-scroll w-full flex flex-col h-full"
      >
        <div
          class="my-1.5 py-1.5 px-6 w-full flex items-start hover:bg-purple-1000"
          v-for="message of displayedConversation"
          :key="message.id"
        >
          <img
            src="/images/avatar1.png"
            class="pointer-events-none rounded-full mr-4"
            style="width: 40px"
          />
          <div class="flex flex-col items-start">
            <div class="flex items-center">
              <router-link
                :to="`/user/${message.fromUser.id}`"
                class="mr-2 text-sm text-gray-100 hover:underline"
                >{{ message.fromUser.username }}</router-link
              >
              <span class="text-xs text-gray-300">{{ formattedDate(message.createdAt) }}</span>
            </div>
            <div>{{ message.content }}</div>
          </div>
        </div>
      </div>
      <Form
        v-if="selectedConversationToUserId"
        class="w-full flex items-center px-6 my-2 py-1"
        :validation-schema="schema"
        @submit="handleSendMessage"
      >
        <Field
          class="rounded-full w-full mr-2 px-4 py-2 bg-purple-1100 text-white"
          name="content"
          type="text"
          placeholder="Start a new message"
        />
        <button type="submit">
          <img src="/images/icons/send.svg" width="26" />
        </button>
      </Form>
      <div
        class="flex flex-col items-center justify-center w-full h-full"
        v-if="!selectedConversationToUserId"
      >
        <h3 class="text-xl">You don't have a conversation selected</h3>
        <p class="mt-1">Choose one from your existing conversations, or start a new one.</p>
        <button
          class="
            mt-4
            font-bold
            uppercase
            rounded
            bg-orange-600
            text-sm
            py-2
            px-6
            hover:bg-orange-700
            transition-all
            ease-in
            duration-200
          "
        >
          New message
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useMutation, useQuery, useResult, useSubscription } from '@vue/apollo-composable';
import { Field, Form } from 'vee-validate';
import * as yup from 'yup';
import {
  getConversation,
  getConversations,
  sendMessageMutation,
  newMessageSubscription
} from '@/apollo/message.gql';
import dayjs from 'dayjs';
import Loader from '@/components/Loader.vue';
import MessageModel from '@/models/message.model';

interface MessageForm {
  content: string;
}

interface SendMessageVariables {
  data: {
    content: string;
    toUser: {
      id: number;
    };
  };
}

export default defineComponent({
  name: 'Messages',
  inject: ['newMessageReceived'],
  data() {
    return {
      selectedConversationToUserId: 0
    };
  },
  components: {
    Loader,
    Form,
    Field
  },
  setup() {
    const displayedConversationDOM = ref();

    const { result: conversationsResult, loading, error, refetch: refetchConversations } = useQuery(
      getConversations
    );
    const conversations = useResult(conversationsResult, null, data => data.getConversations);

    const { result: conversationResult } = useQuery(getConversation, {
      toUser: { id: 0 }
    });

    const displayedConversation = useResult(conversationResult, null, data => data.getConversation);

    const { mutate: sendMessage } = useMutation<Partial<MessageModel>, SendMessageVariables>(
      sendMessageMutation
    );

    const schema = yup.object({
      content: yup
        .string()
        .required()
        .min(0)
        .max(2000)
    });

    const { result: newMessageSubResult } = useSubscription(newMessageSubscription);

    return {
      newMessageSubResult,
      schema,
      conversations,
      loading,
      displayedConversation,
      error,
      sendMessage,
      displayedConversationDOM,
      refetchConversations
    };
  },
  watch: {
    newMessageSubResult(value: MessageModel) {
      this.refetchConversations();
      console.log('triggered', value);
    },
    selectedConversationToUserId(value) {
      this.setActiveConversation(value);
      this.queryConversation(this.selectedConversationToUserId);
      this.$forceUpdate();
      if (this.displayedConversationDOM) {
        setTimeout(
          () =>
            this.displayedConversationDOM.scroll({
              top: this.displayedConversationDOM.scrollHeight,
              behavior: 'smooth'
            }),
          1
        );
      }
    }
  },
  methods: {
    queryConversation(toUserId: number) {
      const { result: conversationResult } = useQuery(getConversation, {
        toUser: { id: toUserId }
      });

      this.displayedConversation = useResult(
        conversationResult,
        null,
        data => data.getConversation
      );
    },
    setActiveConversation(userId: number) {
      const lastActiveConversation = document.querySelector('.active-conversation') as
        | HTMLLIElement
        | undefined;
      if (lastActiveConversation) {
        lastActiveConversation.classList.toggle('active-conversation');
      }

      const newActiveConversation = document.querySelector(`[data-user-id="${userId}"]`) as
        | HTMLLIElement
        | undefined;
      if (newActiveConversation) {
        newActiveConversation.classList.toggle('active-conversation');
      }
    },
    handleSendMessage(values: MessageForm, { resetForm }: any) {
      this.sendMessage({
        data: {
          content: values.content,
          toUser: {
            id: this.selectedConversationToUserId
          }
        }
      }).then(() => {
        resetForm();
      });
    },
    setConversationId(event: { target: HTMLUListElement }) {
      const toUserId = +(event.target.dataset.userId as string);
      this.selectedConversationToUserId = toUserId;
    },
    formattedDate(date: string) {
      return dayjs(date).format('MMMM D, YYYY h:mm A');
    }
  }
});
</script>

<style lang="postcss" scoped>
.active-conversation {
  @apply bg-purple-1100 opacity-100;
}
</style>
