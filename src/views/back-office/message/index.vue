,<template>
  <div class="flex flex-col">
    <section class="flex flex-col sm:flex-row justify-center items-center">
      <StatsCard
        class="w-full lg:w-96"
        :items="computedReceivedComments"
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
    <section class="mt-6 flex flex-col items-start">
      <h1 class="text-lg text-white">All comments</h1>
      <Comment
        v-for="comment in computedReceivedComments"
        :key="comment.id"
        :comment="comment"
        class="mt-2 text-left bg-darkpurple-400"
        @rating-removed="handleRatingRemoved"
      ></Comment>
    </section>
  </div>
</template>

<script lang="ts">
import { useAuth } from '@/composables/auth';
import { useQuery, useResult } from '@vue/apollo-composable';
import { defineComponent } from 'vue';
import { getRatings } from '@/apollo/rating.gql';
import Comment from '@/components/Comment.vue';
import RatingModel from '@/models/rating.model';
import StatsCard from '@/components/back-office/StatsCard.vue';

export default defineComponent({
  name: 'Message',
  components: { Comment, StatsCard },
  provide() {
    return {
      authorized: this.authorized
    };
  },
  setup() {
    const { user } = useAuth();
    const { result, refetch: refetchComments } = useQuery(getRatings);
    const comments = useResult(result, null, data => data.getRatings);

    return {
      user,
      comments,
      refetchComments
    };
  },
  computed: {
    computedReceivedComments(): RatingModel[] {
      if (this.comments) {
        const orderedComments = JSON.parse(JSON.stringify(this.comments));
        orderedComments.sort((r1: RatingModel, r2: RatingModel) => {
          return new Date(r2.createdAt).getTime() - new Date(r1.createdAt).getTime();
        });
        return orderedComments;
      }
      return [];
    },
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
