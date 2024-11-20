<template>
  <div
    :value="value"
    :class="classValidator"
    role="tabpanel"
    :aria-labelledby="`pills-${value}`"
    tabindex="0"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  setup() {},
  props: {
    class: String,
    value: String,
  },
  computed: {
    classValidator(): string {
      return cM("tab-pane fade", this.class);
    },
  },
  mounted() {},
});
</script>
