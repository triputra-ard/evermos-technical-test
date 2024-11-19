<template>
  <div
    v-if="showOverlay"
    :class="overlayClasses"
    @click.self="dismissible && $emit('close')"
  >
    <div class="overlay-content">
      <slot />
    </div>
  </div>
</template>

<script>
import { cM } from "~/utils/classMerge";

export default {
  props: {
    showOverlay: {
      type: Boolean,
      required: true,
    },
    contained: {
      type: Boolean,
      default: false,
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    overlayClasses() {
      return cM("custom-overlay", {
        "custom-overlay-contained": this.contained,
        "custom-overlay-fullscreen": !this.contained,
      });
    },
  },
};
</script>

<style scoped>
.custom-overlay {
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Ensure it's above other content */
}

.custom-overlay-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.custom-overlay-contained {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.overlay-content {
  padding: 20px;
}
</style>
