<template>
  <div
    name="popup"
    class="text-white z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center"
  >
    <div
      class="flex items-center justify-center absolute h-full w-full bg-gray-200 opacity-10"
      @click="onPopupClose()"
    />
    <div
      class="px-4 bg-darkpurple-400 z-50 h-screen fixed top-0 left-0 overflow-y-auto lg:shadow-lg lg:w-popup lg:h-auto lg:rounded lg:relative"
    >
      <div :class="['flex justify-end items-center h-16 text-left bg-darkpurple-400', titleClass]">
        <button
          name="closePopup"
          class="hover:bg-white hover:bg-opacity-10 rounded-full p-1 transition duration-200 cursor-pointer z-50 text-primary focus:outline-none"
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
