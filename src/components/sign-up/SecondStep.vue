<template>
  <h1 class="text-3xl font-semibold mb-6 text-white">Email Verification</h1>
  <p class="text-white">Fill in the boxes below with the code that was sent to</p>
  <span class="text-white">xxxx@xxx.com</span>
  <Form class="flex flex-col justify-center" @submit="onSubmit" :validation-schema="schema">
    <div class="inline-flex">
      <Field :name="'code-' + n" v-for="n in 5" :key="n" v-slot="{ field }">
        <input type="number" v-bind="field" class="w-8 mx-1 h-14 text-center" maxlength="1" />
      </Field>
    </div>

    <div class="flex justify-evenly">
      <button
        class="border-none outline-none font-bold text-white uppercase rounded bg-purple-800 text-sm leading-8 py-1 hover:bg-purple-700 transition-all ease-in duration-200 w-1/4"
      >
        Resend
      </button>
      <button
        class="border-none outline-none font-bold text-white uppercase rounded bg-purple-800 text-sm leading-8 py-1 hover:bg-purple-700 transition-all ease-in duration-200 w-1/4"
      >
        Verify
      </button>
    </div>
  </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Field, Form } from 'vee-validate';
import { object, string, number } from 'yup';

export default defineComponent({
  name: 'SignUpFirstStep',
  components: {
    Field,
    Form
  },
  setup() {
    const schema = object({
      'code-1': number().required(),
      'code-2': number().required(),
      'code-3': number().required(),
      'code-4': number().required(),
      'code-5': number().required()
    });
    return {
      schema
    };
  }
});
</script>

<style lang="postcss" scoped>
.form-grid {
  display: grid;
  grid-template-columns: 100%;
  row-gap: 20px;
  width: 100%;
}

.input-grid {
  display: grid;
  grid-template-areas: 'input';
  grid-template-columns: 1fr;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  border-radius: 3px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(136, 22, 22);
  min-width: 180px;
  padding: 8px 40px;
  box-sizing: border-box;
  transition: background-color 0.2s ease-in 0s, border 0.2s ease-in 0s, opacity 0.2s ease-in 0s;
  opacity: 1;
}

.input-fillable {
  grid-area: input / input / input / input;
  text-align: center;
  background: none;
  border: none;
  outline: none;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
  margin: 0px;
  width: 100%;
  padding: 0px;
  color: rgb(26, 18, 63);
  font-weight: 500;
}

.input-fillable::placeholder {
  font-style: italic;
}

.icons {
  color: rgb(136, 138, 180);
  @apply absolute left-3 top-1/2 w-8 text-center transform translate-x-0 -translate-y-2/4;
}
</style>
