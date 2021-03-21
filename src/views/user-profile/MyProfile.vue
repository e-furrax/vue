<template>
  <div class="min-h-screen-minus-header flex flex-row max-w-full">
    <Sidebar />
    <section class="flex flex-col rounded-l-3xl w-full bg-purple-950">
      <router-view></router-view>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from '@/components/layouts/profile/Sidebar.vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import { getProfile } from '@/apollo/user.gql';

export default defineComponent({
  name: 'MyProfile',
  components: { Sidebar },
  setup() {
    const { result, loading, error } = useQuery(getProfile);
    const myProfile = useResult(result, null, data => data.getProfile);
    console.log(myProfile.value);

    return {
      myProfile,
      loading,
      error
    };
  }
});
</script>

<style lang="scss" scoped>
.min-h-screen-minus-header {
  min-height: calc(100vh - 3.5rem);
}
</style>
