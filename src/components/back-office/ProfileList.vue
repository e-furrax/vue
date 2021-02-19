<template>
  <table class="table-auto">
    <thead>
      <tr class="">
        <th class="w-1/6">ID</th>
        <th class="w-1/3">USERNAME</th>
        <th class="w-1/3">EMAIL</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="border border-solid bg-white h-10"
        v-for="user in users"
        :key="`${user.username}-${user.id}`"
      >
        <td>{{ format(user.id) }}</td>
        <td>{{ format(user.username) }}</td>
        <td>{{ user.email }}</td>
        <td class="flex flex-row justify-end m-4">
          <div
            @click.prevent="$router.push(`/back-office/profile/${user.id}`)"
            class="mr-2 cursor-pointer"
          >
            <img src="/images/eyes.svg" alt="read icon" />
          </div>
          <div @click.prevent="" class="ml-4 mr-4 cursor-pointer">
            <img src="/images/trash.svg" alt="delete icon" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProfileList',
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  methods: {
    format(value: string, maxSize = 7) {
      return value.length > maxSize ? `${value.substring(0, maxSize)}...` : value;
    }
  },
  data: () => ({})
});
</script>
