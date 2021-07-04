<template>
  <section class="h-screen w-screen">
    <div
      class="flex items-center justify-center h-full w-full fixed opacity-10"
      style="z-index: -1"
    >
      <img src="/images/e-furrax.svg" width="600" />
    </div>
    <router-link to="/" class="absolute m-6 text-white flex items-center"
      ><img src="/images/e-furrax.svg" width="38" /><span class="ml-3 text-xl"
        >E-FURRAX</span
      ></router-link
    >
    <div class="h-full w-full flex justify-center items-center">
      <div class="w-80 md:w-96 flex flex-col items-center space-y-8">
        <h1 class="text-3xl font-semibold text-white">New password</h1>
        <Form class="form-grid" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
          <p class="text-sm text-lightBlue-100 text-center mb-2">
            Did you lost or someone figured out your password ? Just enter your new one here.
          </p>
          <div class="input-grid" :class="errors.password && 'border-error'">
            <div class="icons">
              <svg width="12px" height="17px" viewBox="0 0 12 17">
                <path
                  d="M172.875 85.667c-.27-.038-.485-.237-.485-.51v-1.576c0-2.407-1.855-4.507-4.262-4.579a4.397 4.397 0 00-4.531 4.395v1.758c0 .275-.22.474-.49.511A1.279 1.279 0 00162 86.933v7.16c0 .707.573 1.28 1.279 1.28h9.442c.706 0 1.279-.573 1.279-1.28v-7.16c0-.644-.5-1.177-1.125-1.266zm-7.168-2.315a2.274 2.274 0 012.397-2.271c1.23.063 2.152 1.168 2.152 2.4v1.616c0 .308-.25.557-.556.557h-3.436a.557.557 0 01-.557-.557v-1.745z"
                  transform="translate(-786 -415) translate(96 136) translate(528) translate(0 200)"
                  fill="currentColor"
                  stroke="none"
                  stroke-width="1"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>
            <Field
              class="border m-2 input-fillable"
              aria-label="Enter new password"
              type="password"
              placeholder="Enter new password"
              autocomplete="new-password"
              name="password"
            />
            <ErrorMessage name="password" v-slot="{ message }" as="div">
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                class="error-icon"
                v-tooltip.right-end="message"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M15.882 12.702L8.754.432a.874.874 0 00-1.508 0L.118 12.703A.865.865 0 00.872 14h14.256c.67 0 1.09-.721.754-1.298zm-7.92-8.255c.49-.023.9.39.855.871L8.444 9.29a.432.432 0 01-.432.39.44.44 0 01-.439-.39l-.37-3.947a.814.814 0 01.758-.896zm.037 7.361a.817.817 0 01-.82-.814c0-.45.367-.814.82-.814.452 0 .82.364.82.814 0 .45-.368.814-.82.814z"
                ></path>
              </svg>
            </ErrorMessage>
          </div>
          <div class="input-grid" :class="errors.confirmPassword && 'border-error'">
            <div class="icons">
              <svg width="12px" height="17px" viewBox="0 0 12 17">
                <path
                  d="M172.875 85.667c-.27-.038-.485-.237-.485-.51v-1.576c0-2.407-1.855-4.507-4.262-4.579a4.397 4.397 0 00-4.531 4.395v1.758c0 .275-.22.474-.49.511A1.279 1.279 0 00162 86.933v7.16c0 .707.573 1.28 1.279 1.28h9.442c.706 0 1.279-.573 1.279-1.28v-7.16c0-.644-.5-1.177-1.125-1.266zm-7.168-2.315a2.274 2.274 0 012.397-2.271c1.23.063 2.152 1.168 2.152 2.4v1.616c0 .308-.25.557-.556.557h-3.436a.557.557 0 01-.557-.557v-1.745z"
                  transform="translate(-786 -415) translate(96 136) translate(528) translate(0 200)"
                  fill="currentColor"
                  stroke="none"
                  stroke-width="1"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </div>
            <Field
              class="border m-2 input-fillable"
              aria-label="Confirm new password"
              type="password"
              placeholder="Confirm new password"
              autocomplete="new-password"
              name="confirmPassword"
            />
            <ErrorMessage name="confirmPassword" v-slot="{ message }" as="div">
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                class="error-icon"
                v-tooltip.right-end="message"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M15.882 12.702L8.754.432a.874.874 0 00-1.508 0L.118 12.703A.865.865 0 00.872 14h14.256c.67 0 1.09-.721.754-1.298zm-7.92-8.255c.49-.023.9.39.855.871L8.444 9.29a.432.432 0 01-.432.39.44.44 0 01-.439-.39l-.37-3.947a.814.814 0 01.758-.896zm.037 7.361a.817.817 0 01-.82-.814c0-.45.367-.814.82-.814.452 0 .82.364.82.814 0 .45-.368.814-.82.814z"
                ></path>
              </svg>
            </ErrorMessage>
          </div>
          <button
            type="submit"
            class="border-none outline-none font-bold text-white uppercase rounded bg-orange-500 text-sm leading-8 py-1 hover:bg-orange-700 transition-all ease-in duration-200 disabled:opacity-70"
          >
            CREATE NEW PASSWORD
          </button>
        </Form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { object, string, ref as yupRef } from 'yup';
import { useMutation } from '@vue/apollo-composable';
import { changePassword } from '@/apollo/user.gql';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

interface NewPasswordForm {
  password: string;
  confirmPassword: string;
}

interface ChangePasswordMutationVariables {
  token: string;
  newPassword: string;
}

export default defineComponent({
  components: { Form, Field, ErrorMessage },
  setup() {
    const { mutate } = useMutation<{ changePassword: boolean }, ChangePasswordMutationVariables>(
      changePassword
    );
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const schema = object({
      password: string()
        .required()
        .min(8),
      confirmPassword: string()
        .required()
        .oneOf([yupRef('password')], 'Passwords do not match')
    });
    const onSubmit = (values: NewPasswordForm) => {
      const token = route.params.token as string;
      mutate({ newPassword: values.password, token }).then(() => {
        toast.success('New password successfully set ! You can now try to login');
        router.push('/sign-in');
      });
    };

    return {
      schema,
      onSubmit
    };
  }
});
</script>

<style lang="postcss" scoped>
.error-icon {
  color: rgb(224, 18, 115);
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translate(0px, -50%);
}

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

.border-error {
  border: 1px solid rgb(224, 18, 115);
}
</style>
