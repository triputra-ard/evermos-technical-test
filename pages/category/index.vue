<template>
  <section class="p-1 p-lg-5 fixed-navbar-container">
    <h2 class="fw-jakarta-bold text-center">Shop by Category</h2>
    <div class="d-flex flex-row flex-wrap justify-content-lg-center">
      <column cols="12" lg="4">
        <p class="fw-jakarta-regular text-center">
          Discover products by category, from essentials to unique
          finds—shopping made simple!
        </p></column
      >
    </div>
    <Category />
  </section>
</template>
<script lang="ts" setup>
useHead({
  title: "Evermos Store - Shop by Category",
});
</script>
