<template>
  <div class="mt-5 d-flex flex-row flex-wrap justify-content-center">
    <template v-for="item in categoryStore.getCategoryList">
      <column class="p-2 d-grid gap-2" cols="6" lg="2">
        <button
          role="button"
          class="btn btn-outline-evermos"
          @click="handleCategory(item.slug)"
        >
          {{ item.name }}
        </button>
      </column>
    </template>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  setup() {
    const categoryStore = categoryData();
    const productStore = productData();
    return {
      categoryStore,
      productStore,
    };
  },

  methods: {
    handleCategory(categoryValue: string) {
      this.productStore.productLoading = true;
      if (categoryValue == "all") {
        this.$router.push({
          path: "/",
        });
      } else {
        this.$router.push({
          name: "shop-name",
          params: {
            name: categoryValue,
          },
        });
      }
    },
  },
  mounted() {
    this.categoryStore.fetchCategoryList();
  },
});
</script>
