<template>
  <i
    :class="classValidator"
    v-bind="$attrs"
    :style="computedStyle"
    role="img"
    aria-hidden="true"
  ></i>
</template>

<script lang="ts">
import { cM } from "~/utils/classMerge";

export default defineComponent({
  name: "Icon",
  props: {
    icon: {
      type: String,
      required: true, // For example, 'mdi mdi-account' or 'bi bi-alarm'
    },
    color: {
      type: String,
      default: null, // Custom color
    },
    size: {
      type: String,
      default: null, // Custom size, e.g., '24px'
    },
  },
  computed: {
    classValidator(): string {
      return cM(`mdi ${this.icon}`, this.class);
    },
    computedStyle() {
      const style = {};
      if (this.color) style.color = this.color;
      if (this.size) style.fontSize = this.size;
      return style;
    },
  },
});
</script>

<style scoped>
/* Optional default styling */
</style>
