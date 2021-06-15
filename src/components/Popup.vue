<template>
  <div
    name="popup"
    class="fixed w-full h-full top-0 left-0 lg:flex lg:items-center lg:justify-center"
  >
    <div
      class="flex items-center justify-center hidden lg:block lg:absolute h-full w-full bg-black opacity-50 inset-0"
      @click="onPopupClose()"
    />
    <div
      class="bg-white z-50 h-screen fixed top-0 left-0 overflow-y-auto lg:shadow-lg lg:w-popup lg:h-auto lg:rounded lg:relative"
    >
      <div :class="['flex justify-end items-center px-6 h-16 text-left', titleClass]">
        <button
          name="closePopup"
          class="cursor-pointer z-50 text-primary focus:outline-none"
          @click="onPopupClose()"
        >
          <svg
            class="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            ></path>
          </svg>
        </button>
      </div>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleClass: {
      type: String,
      default: 'bg-white'
    }
  },
  methods: {
    onPopupClose() {
      this.$emit('onPopupClose');
    }
  }
};
</script>
<style lang="postcss" scoped>
.modalContainer {
  width: 911px;
}
</style>
