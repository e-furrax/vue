<template>
  <h1 class="text-2xl font-bold text-white">General Information (2/2)</h1>
  <section>
    <div class="space-y-8">
      <div class="space-y-3">
        <label class="text-purple-100 text-lg font-semibold mb-3">Availability</label>
        <Availability @availability-change="handleAvailabilityChange" />
      </div>
      <hr />
      <div class="space-y-3">
        <label for="description" class="text-purple-100 text-lg font-semibold">Description</label>
        <Field
          name="description"
          id="description"
          as="textarea"
          maxLength="1000"
          class="h-32 text-white bg-trueGray-700 p-2 w-full resize-none rounded-sm"
          placeholder="Write a short description to introduce yourself"
        />
      </div>

      <div class="space-y-3" v-if="languages">
        <label for="languages" class="text-purple-100 text-lg font-semibold">Languages</label>
        <Field name="languages" v-slot="{ field }" id="languages">
          <Multiselect
            v-bind="field"
            v-model="value"
            placeholder="Search or add a language"
            label="name"
            track-by="id"
            :options="languages"
            :multiple="true"
            :allow-empty="false"
          ></Multiselect>
        </Field>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Availability from '@/components/become-furrax/Availability.vue';
import { Field } from 'vee-validate';
import Multiselect from 'vue-multiselect';
import { useQuery, useResult } from '@vue/apollo-composable';
import { getLanguages } from '@/apollo/language.gql';

export default defineComponent({
  emits: ['availabilities-change'],
  components: { Availability, Field, Multiselect },
  setup(_, { emit }) {
    const value = ref(null);

    const { result: languagesResult } = useQuery(getLanguages);
    const languages = useResult(languagesResult, null, data => data.getLanguages);

    const handleAvailabilityChange = (event: any) => {
      emit('availabilities-change', event);
    };

    return {
      handleAvailabilityChange,
      value,
      languages
    };
  }
});
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="postcss" scoped></style>
