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
    };
    const request = await $fetch("/api/product/list", {
      method: "POST",
      body: requestBody,
    });
  } catch (error) {
    console.log(error);
  }
});
</script>
