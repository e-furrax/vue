<template>
  <section class="h-screen w-screen">
    <div class="flex items-center justify-center h-full w-full fixed opacity-10">
      <img style="z-index: -1" src="/images/e-furrax.svg" width="600" />
    </div>
    <router-link to="/" class="absolute m-6 text-white flex items-center"
      ><img src="/images/e-furrax.svg" width="38" /><span class="ml-3 text-xl"
        >E-FURRAX</span
      ></router-link
    >
    <div class="h-full w-full flex justify-center items-center">
      <div class="w-96 flex flex-col items-center">
        <FirstStep v-if="step === 1" />
        <SecondStep v-if="step === 2" />
        <div class="absolute bottom-12 flex flex-col items-center">
          <p class="text-white leading-8">
            Already have an account?
            <router-link
              class="text-purple-300 hover:opacity-50 ease-in duration-200 transition cursor-pointer"
              to="/sign-in"
              >Sign In</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStep } from '@/composables/stepper';
import FirstStep from '@/components/sign-up/FirstStep.vue';
import SecondStep from '@/components/sign-up/SecondStep.vue';

export default defineComponent({
  name: 'SignUp',
  components: {
    FirstStep,
    SecondStep
  },
  setup() {
    const { step } = useStep();
    return {
      step
    };
  }
});
</script>

<style lang="postcss" scoped>
.background {
  background-color: rgba(20, 14, 49, 0.92);
}
</style>
