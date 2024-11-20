<template>
  <div class="d-flex flex-wrap flex-row gap-0">
    <template v-for="n in starLength">
      <icon :icon="n <= rating ? 'mdi-star' : 'mdi-star-outline'"></icon>
    </template>
    <i
      v-for="n in maxStars"
      :key="n"
      :class="['mdi', , readonly ? 'readonly' : 'clickable']"
    ></i>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "StarReview",
  props: {
    value: {
      type: Number,
      default: 0, // default rating
    },
    starLength: {
      type: Number,
      default: 5, // total number of stars
    },
  },
  computed: {
    rating() {
      return this.value;
    },
  },
});
</script>

<style lang="scss" scoped>
.mdi {
  color: #ffb400;
  cursor: pointer;
}
</style>
