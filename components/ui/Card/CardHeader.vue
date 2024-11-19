<template>
  <div :class="classValidator">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { cM } from "~/utils/classMerge";

export default defineComponent({
  props: {
    class: String,
  },
  computed: {
    classValidator():string {
      return cM("card-header", this.class);
    },
  },
});
</script>

<style></style>
e
