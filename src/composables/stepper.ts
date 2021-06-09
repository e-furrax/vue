import { readonly, ref } from 'vue';

const stepRef = ref(1);
const step = readonly(stepRef);

export const useStep = () => {
  const setStep = (stepToSet: number) => {
    stepRef.value = stepToSet;
  };

  return {
    setStep,
    step
  };
};
