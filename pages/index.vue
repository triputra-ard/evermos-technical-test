<template>
  <section class="p-1 p-lg-5 fixed-navbar-container">
    <column class="mt-5" cols="12" lg="5">
      <h1 class="fw-jakarta-extrabold mb-4">Get Best Product</h1>
      <p class="fw-jakarta-regular">
        Explore our best product for your daily life, get discount and free
        shipping everyday, see them all here.
      </p>
    </column>
    <product />
  </section>
</template>

<script lang="ts" setup>
useHead({
  title: "Evermos Store - Find your products",
});
onMounted(async () => {
  // try {
  //   const requestBody: InfRequestPaginationClient = {
  //     type: "product",
  //     category: "smartphones",
  //     request: {
  //       perPage: 20,
  //       page: 1,
  //       pageStart: 0,
  //       sortBy: "title",
  //       order: "asc",
  //     },
  //   };
  //   const request = await $fetch("/api/product/category-find", {
  //     method: "POST",
  //     body: requestBody,
  //   });
  //   const requestDetails = await $fetch("/api/product/detail/167", {
  //     method: "GET",
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
});
</script>
