<template>
  <section>Page Section</section>
</template>

<script lang="ts" setup>
const appStore = useAppStore();
useHead({
  title: "Evermos Store - Find your products",
});
onMounted(async () => {
  try {
    const requestBody: InfRequestPaginationClient = {
      type: "product",
      category: "smartphones",
      request: {
        perPage: 20,
        page: 1,
        pageStart: 0,
        sortBy: "title",
        order: "asc",
      },
    };
    const request = await $fetch("/api/product/category-find", {
      method: "POST",
      body: requestBody,
    });
    const requestDetails = await $fetch("/api/product/detail/167", {
      method: "GET",
    });
  } catch (error) {
    console.log(error);
  }
});
</script>
