<template>
  <section class="h-screen w-screen background">
    <router-link to="/" class="absolute m-6 text-white flex items-center"
      ><img src="/images/e-furrax.svg" width="38" /><span class="ml-3 text-xl"
        >E-FURRAX</span
      ></router-link
    >
    <div class="h-full w-full flex justify-center items-center">
      <div class="w-96 flex flex-col items-center">
        <FirstStep v-if="step === 1" />
        <SecondStep v-if="step === 2" />
        <ThirdStep v-if="step === 3" />
        <div class="absolute bottom-12 flex flex-col items-center">
          <p class="text-white leading-8">
            Already have an account?
            <router-link class="text-purple-300 hover:underline cursor-pointer" to="/sign-in"
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
import ThirdStep from '@/components/sign-up/ThirdStep.vue';

export default defineComponent({
  name: 'SignUp',
  components: {
    FirstStep,
    SecondStep,
    ThirdStep
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
