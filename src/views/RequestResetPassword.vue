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
      <template v-if="!emailSent">
        <div class="w-80 md:w-96 flex flex-col items-center space-y-8">
          <h1 class="text-3xl font-semibold text-white">Reset Password</h1>
          <Form
            class="form-grid"
            @submit="onSubmit"
            :validation-schema="schema"
            v-slot="{ errors }"
          >
            <p class="text-sm text-lightBlue-100 text-center mb-2">
              Did you lost or someone figured out your password ? Just enter your email below if you
              want to change it.
            </p>
            <div class="input-grid" :class="errors.email && 'border-error'">
              <div class="icons">
                <svg width="16px" height="16px" viewBox="0 0 511.626 511.626" fill="currentColor">
                  <path
                    d="M49.106 178.729c6.472 4.567 25.981 18.131 58.528 40.685 32.548 22.554 57.482 39.92 74.803 52.099 1.903 1.335 5.946 4.237 12.131 8.71 6.186 4.476 11.326 8.093 15.416 10.852 4.093 2.758 9.041 5.852 14.849 9.277 5.806 3.422 11.279 5.996 16.418 7.7 5.14 1.718 9.898 2.569 14.275 2.569h.575c4.377 0 9.137-.852 14.277-2.569 5.137-1.704 10.615-4.281 16.416-7.7 5.804-3.429 10.752-6.52 14.845-9.277 4.093-2.759 9.229-6.376 15.417-10.852 6.184-4.477 10.232-7.375 12.135-8.71 17.508-12.179 62.051-43.11 133.615-92.79 13.894-9.703 25.502-21.411 34.827-35.116 9.332-13.699 13.993-28.07 13.993-43.105 0-12.564-4.523-23.319-13.565-32.264-9.041-8.947-19.749-13.418-32.117-13.418H45.679c-14.655 0-25.933 4.948-33.832 14.844C3.949 79.562 0 91.934 0 106.779c0 11.991 5.236 24.985 15.703 38.974 10.466 13.99 21.604 24.983 33.403 32.976z"
                  ></path>
                  <path
                    d="M483.072 209.275c-62.424 42.251-109.824 75.087-142.177 98.501-10.849 7.991-19.65 14.229-26.409 18.699-6.759 4.473-15.748 9.041-26.98 13.702-11.228 4.668-21.692 6.995-31.401 6.995h-.578c-9.707 0-20.177-2.327-31.405-6.995-11.228-4.661-20.223-9.229-26.98-13.702-6.755-4.47-15.559-10.708-26.407-18.699-25.697-18.842-72.995-51.68-141.896-98.501C17.987 202.047 8.375 193.762 0 184.437v226.685c0 12.57 4.471 23.319 13.418 32.265 8.945 8.949 19.701 13.422 32.264 13.422h420.266c12.56 0 23.315-4.473 32.261-13.422 8.949-8.949 13.418-19.694 13.418-32.265V184.437c-8.186 9.132-17.7 17.417-28.555 24.838z"
                  ></path>
                </svg>
              </div>
              <Field
                class="border m-2 input-fillable"
                aria-label="Email address"
                type="email"
                placeholder="Email address"
                autocomplete="email"
                name="email"
              />
              <ErrorMessage name="email" v-slot="{ message }" as="div">
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
              Send Email
            </button>
          </Form>
          <div class="absolute bottom-12 flex flex-col items-center">
            <p class="text-white leading-8">
              <router-link
                class="text-orange-300 hover:opacity-50 ease-in duration-200 transition cursor-pointer"
                to="/sign-in"
                >Return to log in</router-link
              >
            </p>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="w-80 md:w-96 flex flex-col items-center space-y-6">
          <svg width="48px" height="43px" viewBox="0 0 48 43" class="text-indigo-800">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path
                d="M22.177.542l-20.7 13.915A3.35 3.35 0 000 17.233v22.49A3.273 3.273 0 003.27 43h41.46A3.273 3.273 0 0048 39.723V17.238a3.35 3.35 0 00-1.483-2.781L25.727.54a3.183 3.183 0 00-3.55.002zm.042 30.198L3.773 17.912a.769.769 0 01.007-1.264l19.29-13.11a1.578 1.578 0 011.775-.002L44.218 16.65c.445.302.45.955.009 1.264L25.864 30.736a3.183 3.183 0 01-3.645.004z"
                fill="currentColor"
                transform="translate(-790 -256) translate(642 256) translate(148)"
              ></path>
              <path
                d="M22.11 22.928v-5.792c0-.67-.543-1.214-1.212-1.214H17.54c-1.075 0-1.615-1.304-.854-2.068L22.69 9.77a1.853 1.853 0 012.626 0l6 4.085c.762.764.224 2.068-.853 2.068h-3.289a1.21 1.21 0 00-1.208 1.214v5.792c0 1.169-.808 2.118-1.977 2.118-1.166 0-1.879-.95-1.879-2.118z"
                fill="#2FC3A5"
                transform="translate(-790 -256) translate(642 256) translate(148)"
              ></path>
            </g>
          </svg>
          <h1 class="text-white text-2xl font-semibold">Email sent</h1>
          <p class="text-sm text-lightBlue-100 text-center">
            Check your email for this account! We've sent instructions for how to change your
            password.
          </p>
          <router-link
            to="/sign-in"
            class="border-none outline-none font-bold text-white uppercase text-center rounded bg-orange-500 text-sm leading-8 py-1 w-full hover:bg-orange-700 transition-all ease-in duration-200 disabled:opacity-70"
          >
            OKAY, GOT IT
          </router-link>
        </div>
      </template>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { object, string } from 'yup';
import { useMutation } from '@vue/apollo-composable';
import { resetPassword } from '@/apollo/user.gql';

interface ResetPasswordForm {
  email: string;
}

export default defineComponent({
  components: { Form, Field, ErrorMessage },
  setup() {
    const emailSent = ref(false);
    const { mutate } = useMutation<{ resetPassword: boolean }, { email: string }>(resetPassword);
    const schema = object({
      email: string()
        .required()
        .email()
    });
    const onSubmit = (values: ResetPasswordForm) => {
      mutate({ email: values.email });
      emailSent.value = true;
    };

    return {
      schema,
      onSubmit,
      emailSent
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
</style>
