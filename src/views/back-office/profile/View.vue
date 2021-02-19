<template>
  <Loader v-if="loading" />
  <div v-else-if="error">Oops, an error occured: {{ error }}</div>
  <div v-else-if="user">
    <p class="text-3xl">{{ user.id }}</p>
    <p class="text-3xl">{{ user.email }}</p>
    <p class="text-3xl">{{ user.username }}</p>
    <p class="text-3xl">{{ user.ratings }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import { getUser } from '@/apollo/user.gql.ts';

export default defineComponent({
  name: 'BackOfficeProfile',
  props: {
    profile: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { result, loading, error } = useQuery(getUser, { data: { id: parseInt(props.id) } });
    const user = useResult(result, null, data => data.getUser);
    return { user, loading, error };
  }
});
</script>
