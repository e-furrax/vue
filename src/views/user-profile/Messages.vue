<template>
  <div class="flex text-white h-full border-b border-opacity-10">
    <section class="flex flex-col border-r border-opacity-10 md:w-84">
      <div class="flex flex-col items-start py-6 bg-purple-1200 h-full">
        <h2 class="font-semibold border-b-2 border-purple-800 mb-6 mx-4 md:mx-6">Conversations</h2>
        <ul v-if="!loading" class="w-full">
          <li
            v-for="conversation in conversations"
            :key="conversation"
            :data-conversation-id="conversation.conversationId"
            :data-to-user-id="
              conversation.fromUser.id === user.id
                ? conversation.toUser.id
                : conversation.fromUser.id
            "
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
              <h3 class="font-semibold flex items-center text-sm text-white">
                <span>{{
                  conversation.fromUser.id === user.id
                    ? conversation.toUser.username
                    : conversation.fromUser.username
                }}</span>
                <span class="mx-2 w-0.5 h-0.5 bg-gray-400 rounded-full"></span>
                <span class="text-xs text-gray-400 font-normal">{{
                  dayjs().to(dayjs(conversation.createdAt))
                }}</span>
              </h3>
              <div class="text-xs flex items-center text-gray-400">
                <span class="mr-1">{{ conversation.fromUser.username }}:</span>
                <span class="mr-1">{{ conversation.content.substr(0, 17) }}...</span>
              </div>
            </div>
          </li>
          <div
            v-if="!conversations || !conversations.length"
            class="md:px-6 px-4 opacity-75 font-normal"
          >
            No conversations.
          </div>
          <button
            @click="newMessageModalOpened = true"
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
        v-if="selectedConversationId || selectedToUserId"
        ref="displayedConversationDOM"
        class="overflow-y-scroll w-full flex flex-col h-full"
      >
        <div
          class="my-1.5 py-1.5 px-6 w-full flex items-start hover:bg-purple-1200"
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
              <span class="text-xs text-gray-300">{{ dayjs().to(dayjs(message.createdAt)) }}</span>
            </div>
            <div class="break-all">{{ message.content }}</div>
          </div>
        </div>
      </div>
      <Form
        v-if="selectedConversationId || selectedToUserId"
        class="w-full flex items-center px-6 my-2 py-1"
        :validation-schema="schema"
        @submit="handleSendMessage"
      >
        <Field
          class="rounded-full w-full mr-2 px-4 py-2 border border-opacity-10 bg-purple-1200 text-white"
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
        v-if="!selectedConversationId && !selectedToUserId"
      >
        <h3 class="text-xl">You don't have a conversation selected</h3>
        <p class="mt-1">Choose one from your existing conversations, or start a new one.</p>
        <button
          @click="newMessageModalOpened = true"
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
    <div
      v-show="newMessageModalOpened"
      class="absolute w-full flex items-center justify-center h-full top-0 left-0"
    >
      <div
        @click="newMessageModalOpened = false"
        class="absolute w-full h-full bg-gray-800 opacity-50"
      ></div>
      <div class="z-20">
        <div class="bg-purple-1200 p-4 flex flex-col w-192 rounded items-start">
          <div class="flex items-start w-full justify-between">
            <h2 class="font-semibold border-b-2 border-purple-800 mb-6">New message</h2>
            <img
              @click="newMessageModalOpened = false"
              class="cursor-pointer hover:bg-purple-925 rounded-full"
              src="/images/icons/close.svg"
              width="20"
            />
          </div>
          <NewMessageSearch class="w-full" @user-selected="handleUserSelected" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useAuth } from '@/composables/auth';
import {
  useMutation,
  useQuery,
  useResult,
  useSubscription,
  provideApolloClient
} from '@vue/apollo-composable';
import { postgresClient } from '@/apollo/client';
import { Field, Form } from 'vee-validate';
import * as yup from 'yup';
import {
  getConversation,
  getConversations,
  sendMessageMutation,
  newMessageSubscription
} from '@/apollo/message.gql';
import Loader from '@/components/Loader.vue';
import NewMessageSearch from '@/components/NewMessageSearch.vue';
import MessageModel from '@/models/message.model';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

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
  data() {
    return {
      selectedConversationId: 0,
      selectedToUserId: 0,
      newMessageModalOpened: false,
      creatingNewConversation: false
    };
  },
  components: {
    Loader,
    Form,
    Field,
    NewMessageSearch
  },
  setup() {
    const displayedConversationDOM = ref();

    const { user } = useAuth();

    const { result: conversationsResult, loading, error, refetch: refetchConversations } = useQuery(
      getConversations
    );
    const conversations = useResult(conversationsResult, null, data => data.getConversations);

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
    const displayedConversation = ref([]) as Ref<MessageModel[]>;

    const useQueryConversation = (conversationId: number) => {
      const { onResult } = provideApolloClient(postgresClient)(() =>
        useQuery(getConversation, { conversationId }, { fetchPolicy: 'no-cache' })
      );
      return onResult;
    };

    return {
      dayjs,
      newMessageSubResult,
      schema,
      conversations,
      user,
      loading,
      displayedConversation,
      error,
      sendMessage,
      displayedConversationDOM,
      useQueryConversation,
      refetchConversations
    };
  },
  watch: {
    async newMessageSubResult(value: { newMessage: MessageModel }) {
      await this.refetchConversations();
      this.setActiveConversation(this.selectedConversationId);
      if (this.selectedConversationId === value.newMessage.conversationId) {
        this.displayedConversation.push(value.newMessage);
        this.scrollToBottomOfDisplayedConversation();
      }

      if (this.creatingNewConversation) {
        this.selectedConversationId = value.newMessage.conversationId;
        this.creatingNewConversation = false;
      }
    },
    selectedToUserId(value) {
      this.selectedToUserId = value;
    },
    selectedConversationId(value) {
      this.setActiveConversation(value);
      const onResult = this.useQueryConversation(this.selectedConversationId);
      onResult(({ data }) => {
        this.displayedConversation = JSON.parse(JSON.stringify(data.getConversation));
        this.scrollToBottomOfDisplayedConversation();
      });
    }
  },
  methods: {
    handleUserSelected(userSelectedId: string) {
      this.selectedToUserId = +userSelectedId;

      let conversationFound: MessageModel | undefined;
      if (this.conversations) {
        conversationFound = this.conversations.find(
          (conversation: MessageModel) => conversation.toUser.id == this.selectedToUserId
        );

        if (conversationFound) {
          const conversationDOM = document.querySelector(
            `[data-to-user-id="${this.selectedToUserId}"]`
          ) as HTMLLIElement | undefined;

          if (conversationDOM) {
            conversationDOM.click();
          }
        }
      }

      if (!conversationFound || !this.conversations) {
        this.creatingNewConversation = true;
        this.displayedConversation = [];
        const newActiveConversation = document.querySelector(
          `[data-conversation-id="${this.selectedConversationId}"]`
        ) as HTMLLIElement | undefined;
        if (newActiveConversation) {
          newActiveConversation.classList.toggle('active-conversation');
        }
      }

      this.newMessageModalOpened = false;
    },
    scrollToBottomOfDisplayedConversation() {
      if (this.displayedConversationDOM) {
        setTimeout(
          () =>
            this.displayedConversationDOM.scroll({
              top: this.displayedConversationDOM.scrollHeight,
              behavior: 'smooth'
            }),
          100
        );
      }
    },
    setActiveConversation(conversationId: number) {
      const lastActiveConversation = document.querySelector('.active-conversation') as
        | HTMLLIElement
        | undefined;
      if (lastActiveConversation) {
        lastActiveConversation.classList.toggle('active-conversation');
      }

      const newActiveConversation = document.querySelector(
        `[data-conversation-id="${conversationId}"]`
      ) as HTMLLIElement | undefined;
      if (newActiveConversation) {
        newActiveConversation.classList.toggle('active-conversation');
      }
    },
    handleSendMessage(values: MessageForm, { resetForm }: any) {
      this.sendMessage({
        data: {
          content: values.content,
          toUser: {
            id: this.selectedToUserId
          }
        }
      }).then(() => {
        resetForm();
      });
    },
    setConversationId(event: { target: HTMLUListElement }) {
      const conversationId = +(event.target.dataset.conversationId as string);
      const toUserId = +(event.target.dataset.toUserId as string);
      this.selectedConversationId = conversationId;
      this.selectedToUserId = toUserId;
    }
  }
});
</script>

<style lang="postcss" scoped>
.active-conversation {
  @apply bg-purple-1100 opacity-100;
}
</style>
