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
      <div class="w-80 md:w-96 flex flex-col items-center space-y-6">
        <h1 class="text-3xl font-semibold text-white">Sign In</h1>
        <p v-if="errorLogin && errorLogin.message !== 'BANNED'" class="text-pink-600 text-sm">
          We didn't recognized you. Make sure that your email and password are correct below.
        </p>
        <p v-if="errorLogin && errorLogin.message === 'BANNED'" class="text-pink-600 text-sm">
          This account has been banned.<br />
          You can contact an administrator if you think this is an error.
        </p>
        <Form
          class="form-grid"
          @submit="onSubmit"
          :validation-schema="schema"
          v-slot="{ meta, errors }"
        >
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
              aria-label="Password"
              type="password"
              placeholder="Password"
              autocomplete="current-password"
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
          <button
            ref="submitLogin"
            class="border-none outline-none font-bold text-white uppercase rounded bg-purple-700 text-sm leading-8 bg-opacity-50 py-1 hover:bg-purple-800 transition-all ease-in duration-200"
            @click="checkIfFormValid(meta.valid)"
          >
            Sign In
          </button>
        </Form>
        <div class="absolute bottom-12 flex flex-col items-center">
          <p
            class="text-purple-300 hover:opacity-50 ease-in duration-200 transition leading-8 cursor-pointer"
          >
            <router-link to="/request-reset-password">
              Forgot your password?
            </router-link>
          </p>
          <p class="text-white leading-8">
            Don't have an E-Furrax account?
            <router-link
              class="text-purple-300 cursor-pointer hover:opacity-50 ease-in duration-200 transition"
              to="/sign-up"
              >Sign Up</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { useMutation } from '@vue/apollo-composable';
import { defineComponent } from 'vue';
import { useAuth } from '../composables/auth';
import { loginMutation } from '@/apollo/user.gql';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { object, string } from 'yup';
import { LoginMutationResponse, LoginPayload } from '@/models/user.model';

export default defineComponent({
  components: {
    Form,
    Field,
    ErrorMessage
  },
  setup() {
    const { setUser } = useAuth();
    const { mutate: login, error: errorLogin } = useMutation<LoginMutationResponse>(loginMutation);
    const schema = object({
      email: string()
        .required()
        .email(),
      password: string().required()
    });

    return {
      setUser,
      login,
      errorLogin,
      schema
    };
  },
  methods: {
    onSubmit(values: LoginPayload) {
      this.login(values)
        .then(({ data }) => {
          if (data) {
            this.setUser(data.login);
            this.$router.push({ name: 'Home' });
          }
        })
        .catch(() => {
          this.shakeSubmitButton();
        });
    },
    checkIfFormValid(valid: boolean) {
      if (!valid) {
        this.shakeSubmitButton();
      }
    },
    shakeSubmitButton() {
      const submitEl = this.$refs.submitLogin as HTMLElement;
      submitEl.classList.add('animate-shake-x');
      setTimeout(() => {
        submitEl.classList.remove('animate-shake-x');
      }, 1000);
    }
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
