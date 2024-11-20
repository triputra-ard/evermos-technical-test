<template>
  <ul :class="classValidator" role="tablist">
    <slot></slot>
  </ul>
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
      return cM("nav nav-pills custom-tab", this.class);
    },
  },
  methods: {
    addClickListeners() {
      const tabElements = this.$el.querySelectorAll("li");
      tabElements.forEach((tab) => {
        tab.addEventListener("click", () => {
          this.$emit("update:modelValue", tab.getAttribute("value"));
        });
      });
    },
    updateActiveTab(value) {
      const tabElements = this.$el.querySelectorAll("li");
      tabElements.forEach((tab) => {
        const button = tab.querySelector("button");
        button.classList.toggle("active", tab.getAttribute("value") === value);
      });
    },
  },
  mounted() {
    this.addClickListeners();
    this.updateActiveTab(this.modelValue);
  },
});
</script>
