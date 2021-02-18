<template>
  <table class="table-auto">
    <thead>
      <tr class="">
        <th class="w-1/7">ID</th>
        <th class="w-1/3">NAME</th>
        <th class="w-1/3">EMAIL</th>
        <th class="w-1/3">ROLES</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="border border-solid bg-white h-10"
        v-for="profile in profiles"
        :key="`${profile.username}-${profile.id}`"
      >
        <td>{{ format(profile.id) }}</td>
        <td>{{ format(profile.username) }}</td>
        <td>{{ profile.email }}</td>
        <td>{{ format(profile.roles.join(', ')) }}</td>
        <td>
          <img src="/images/trash.svg" alt="delete icon" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UserModel } from '@/models/user.model.ts';

export default defineComponent({
  name: 'ProfileList',
  props: {
    profiles: {
      type: Array as UserModel[],
      required: true
    }
  },
  methods: {
    format(value: string, maxSize = 7) {
      return value.length > maxSize ? `${value.substring(0, maxSize)}...` : value;
    }
  }
});
</script>
