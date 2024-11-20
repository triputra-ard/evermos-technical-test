<template>
  <div :class="classValidator">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { cM } from "~/utils/classMerge";

export default defineComponent({
  props: {
    cols: [String, Number],
    offset: [String, Number],
    order: [String, Number],
    alignSelf: String,
    class: String,
    xs: [String, Number],
    sm: [String, Number],
    md: [String, Number],
    lg: [String, Number],
    xl: [String, Number],
    xxl: [String, Number],
  },
  computed: {
    classValidator(): string {
      return cM({
        [`col-${this.cols}`]: this.cols,
        [`offset-${this.offset}`]: this.offset,
        [`order-${this.order}`]: this.order,
        [`align-self-${this.alignSelf}`]: this.alignSelf,
        [`col-xs-${this.xs}`]: this.xs,
        [`col-sm-${this.sm}`]: this.sm,
        [`col-md-${this.md}`]: this.md,
        [`col-lg-${this.lg}`]: this.lg,
        [`col-xl-${this.xl}`]: this.xl,
        [`col-xxl-${this.xxl}`]: this.xxl,
        [this.class]: this.class,
      });
    },
  },
});
</script>

<style></style>
e
