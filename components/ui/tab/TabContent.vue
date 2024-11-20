<template>
  <div :class="classValidator" aria-labelledby="Tab content">
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  setup() {},
  props: {
    class: String,
    modelValue: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {
    classValidator(): string {
      return cM("tab-content", this.class);
    },
  },
  watch: {
    modelValue(value) {
      this.updateActiveTabContent(value);
    },
  },
  methods: {
    updateActiveTabContent(value) {
      const tabElements = this.$el.querySelectorAll(".tab-pane");
      tabElements.forEach((tab) => {
        tab.classList.toggle("show", tab.getAttribute("value") === value);
        tab.classList.toggle("active", tab.getAttribute("value") === value);
      });
    },
  },
  mounted() {
    this.updateActiveTabContent(this.modelValue);
  },
});
</script>
