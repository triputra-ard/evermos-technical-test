<template>
  <h5 :class="classValidator">
    <slot></slot>
  </h5>
</template>

<script lang="ts">
import { cM } from "~/utils/classMerge";

export default defineComponent({
  props: {
    class: String,
  },
  computed: {
    classValidator(): string {
      return cM("card-title", this.class);
    },
  },
});
</script>

<style></style>
e
