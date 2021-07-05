<template>
  <h1 class="text-2xl font-bold text-white">General Information (2/2)</h1>
  <section>
    <Form>
      <div class="space-y-8">
        <div class="space-y-3">
          <label class="text-purple-100 text-lg font-semibold">Availability</label>
          <Availability @availability-change="handleAvailabilityChange" />
        </div>
        <hr />
        <div class="space-y-3">
          <label for="bio" class="text-purple-100 text-lg font-semibold">Description</label>
          <Field
            name="bio"
            id="bio"
            as="textarea"
            maxLength="1000"
            class="h-32 text-white bg-trueGray-700 p-2 w-full resize-none rounded-sm"
            placeholder="Write a short bio to introduce yourself"
          />
        </div>
      </div>
    </Form>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Availability from '@/components/become-furrax/Availability.vue';
import { Form, Field } from 'vee-validate';

export default defineComponent({
  components: { Availability, Form, Field },
  setup() {
    const availibility = ref([]);

    const handleAvailabilityChange = (event: any) => {
      availibility.value = event;
    };

    return {
      handleAvailabilityChange
    };
  }
});
</script>

<style lang="postcss" scoped></style>
