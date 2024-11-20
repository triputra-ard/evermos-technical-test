<template>
  <li class="nav-item" role="presentation" :value="target">
    <button
      :class="classValidator"
      data-bs-toggle="pill"
      :data-bs-target="`#${target}`"
      type="button"
      role="tab"
      :aria-controls="target"
      aria-selected="true"
      :disabled="disabled"
    >
      {{ title }}
    </button>
  </li>
</template>
<script lang="ts">
export default defineComponent({
  setup() {},
  props: {
    class: String,
    target: String,
    title: String,
    disabled: Boolean,
  },
  computed: {
    classValidator(): string {
      return cM("nav-link", this.class);
    },
  },
  mounted() {},
});
</script>
