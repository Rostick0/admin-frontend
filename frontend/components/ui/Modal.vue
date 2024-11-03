<template>
  <div
    v-if="isOpen || isOpenAlways"
    class="modal"
    @click.self="close"
    :class="props.position"
    z-index="1"
  >
    <!-- @keydown.esc="close" -->
    <div class="modal__content" :style="style">
      <slot></slot>
      <!-- <svg
        @click="close"
        class="modal-close"
        :class="`modal-close__${props.position}`"
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25 2L2 25M2 2L25 25"
          stroke="#D2D2D2"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg> -->
    </div>
    <!-- <div class="back" v-if="isOpen" @click="close"></div> -->
  </div>
</template>
<script setup>
import useModal from "~~/composables/useModal";
const props = defineProps({
  name: String,
  style: [String, Object, Array, String],
  position: { type: String, default: "center" },
  customClass: { type: String, default: null },
  isOpenAlways: Boolean,
});
const { isOpen, close } = useModal({ name: props.name });

watch(
  () => isOpen.value,
  () => {
    try {
      if (process.client) {
        if (isOpen.value) {
          document.body.style = "overflow:hidden;";
        } else {
          document.body.style = "";
        }
      }
    } catch (e) {
      console.error(e);
    }
  },
  {
    immediate: true,
  }
);
</script>
<style scoped lang="scss">
.modal {
  background-color: rgba(var(--color-dark), 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;

  &__content {
  }
}
// .back {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: black;
//   opacity: 0.1;
//   z-index: 100;
// }

// .backdoor {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 3;
// }

// .content {
//   position: fixed;
//   // background: white;
//   z-index: 101;
//   // height: 100%;
//   height: auto;
// }

// .top-right {
//   top: 0;
//   right: 0;
// }

// .top-left {
//   top: 0;
//   left: 0;
// }

// .center {
//   z-index: 1000;
//   // background-color: white;
//   padding: 20px;
//   border-radius: 6px;
//   // position: absolute;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   top: 50%;
//   left: 50%;
//   min-width: 300px;
//   min-height: 200px;
//   transform: translate(-50%, -50%);
// }

// .modal-close {
//   &__center {
//     cursor: pointer;
//     position: absolute;
//     top: 60px;
//     right: 60px;

//     @media (max-width: 580px) {
//       right: 100px;
//     }

//     @media (max-width: 475px) {
//       right: 125px;
//     }

//     @media (max-width: 375px) {
//       right: 150px;
//     }
//   }
// }
</style>
