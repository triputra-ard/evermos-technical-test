<template>
  <div :class="classValidator">
    <label class="form-label" :aria-labelledby="ariaLabelledby">{{
      label
    }}</label>
    <slot></slot>
    <icon class="icon-group" :icon="icon"></icon>
  </div>
</template>
<script lang="ts">
import { cM } from "~/utils/classMerge";

export default defineComponent({
  props: {
    label: String,
    ariaLabelledby: String,
    class: String,
    icon: String,
  },
  computed: {
    classValidator(): string {
      return cM("form-wrapper", this.class);
    },
  },
});
</script>
