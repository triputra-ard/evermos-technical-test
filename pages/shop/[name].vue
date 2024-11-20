<template>
  <section class="p-1 p-lg-5 fixed-navbar-container">
    <h2 class="fw-jakarta-bold text-center">Browse by Category</h2>
    <product />
  </section>
</template>

<script lang="ts" setup>
const route = useRoute();
useHead({
  title: `Evermos Store - Category ${route.params.name}`,
});
</script>
<style lang="scss"></style>
