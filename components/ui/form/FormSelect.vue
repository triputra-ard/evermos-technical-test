<template>
  <select
    v-model="selected"
    class="form-control"
    :aria-placeholder="ariaPlaceholder"
    @update:model-value="handleUpdateValue"
  >
    <template v-for="item in items">
      <option :value="item[itemValue]">{{ item[itemTitle] }}</option>
    </template>
  </select>
</template>

<script lang="ts">
export default defineComponent({
  data: () => ({
    selected: null,
  }),
  props: {
    modelValue: String | Number,
    ariaPlaceholder: String,
    items: Array,
    itemValue: { type: String, default: "value" },
    itemTitle: { type: String, default: "name" },
  },
  methods: {
    handleUpdateValue(value: string | number) {
      this.$emit("update:modelValue", value);
    },
  },
  mounted() {
    this.selected = this.modelValue;
  },
});
</script>
