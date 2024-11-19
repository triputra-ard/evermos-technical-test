<template>
  <p :class="classValidator">
    <slot></slot>
  </p>
</template>

<script lang="ts">
import { cM } from "~/utils/classMerge";

export default defineComponent({
  props: {
    class: String,
  },
  computed: {
    classValidator(): string {
      return cM("card-text", this.class);
    },
  },
});
</script>

<style></style>
e
