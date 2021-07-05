<template>
  <pagination
    :size="comments.length"
    :element-by-page="elementByPage"
    @change-page="handleChangePage"
  >
    <div class="flex flex-col">
      <section class="flex flex-col sm:flex-row justify-center items-center">
        <StatsCard
          class="w-full lg:w-96"
          :items="comments"
          label="TOTAL COMMENTS"
          icon="/images/icons/comments.svg"
        />
        <StatsCard
          class="w-full lg:w-96 mt-2 sm:ml-6 sm:mt-0"
          :items="commentsLast24h"
          label="COMMENTS LAST 24H"
          icon="/images/icons/comments.svg"
        />
      </section>
      <Loader v-if="loading" />
      <section v-else-if="comments" class="mt-6 flex flex-col items-start">
        <h1 class="text-lg text-white">All comments</h1>
        <Comment
          v-for="comment in computedComments"
          :key="comment.id"
          :comment="comment"
          class="mt-2 text-left bg-darkpurple-400"
          @rating-removed="handleRatingRemoved"
        ></Comment>
      </section>
    </div>
  </pagination>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useAuth } from '@/composables/auth';
import { useQuery, useResult, useQueryLoading } from '@vue/apollo-composable';
import { getRatings } from '@/apollo/rating.gql';
import Comment from '@/components/Comment.vue';
import RatingModel from '@/models/rating.model';
import StatsCard from '@/components/back-office/StatsCard.vue';
import Loader from '@/components/Loader.vue';
import Pagination from '@/components/Pagination.vue';

export default defineComponent({
  name: 'Message',
  components: { Comment, StatsCard, Pagination, Loader },
  provide() {
    return {
      authorized: this.authorized
    };
  },
  setup() {
    const { user } = useAuth();
    const { result, refetch: refetchComments } = useQuery(getRatings);
    const comments = useResult(result, [], data => data.getRatings);
    const loading = useQueryLoading();

    const currentPage = ref(0);
    const elementByPage = ref(12);
    const handleChangePage = (n: number) => {
      currentPage.value = n;
    };

    const computedComments = computed(() => {
      const start = currentPage.value * elementByPage.value;
      const end = start + elementByPage.value;
      const orderedComments = comments.value.slice();
      orderedComments.sort((r1: RatingModel, r2: RatingModel) => {
        return new Date(r2.createdAt).getTime() - new Date(r1.createdAt).getTime();
      });
      return orderedComments.slice(start, end);
    });

    return {
      user,
      comments,
      computedComments,
      refetchComments,
      loading,

      currentPage,
      elementByPage,
      handleChangePage
    };
  },
  computed: {
    commentsLast24h(): RatingModel[] {
      if (this.comments) {
        const limitDate = new Date();
        limitDate.setHours(limitDate.getHours() - 24);
        return this.comments.filter((comment: RatingModel) => {
          return new Date(comment.createdAt) >= limitDate;
        });
      }
      return [];
    }
  },
  methods: {
    authorized(roles: string[]) {
      return this.user && roles.includes((this.user as any).role);
    },
    handleRatingRemoved() {
      this.refetchComments();
    }
  }
});
</script>
<style scoped>
.border-purple-custom {
  border-color: #382f66;
}
</style>
