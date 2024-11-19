<template>
  <div class="mt-5">
    <div class="d-flex flex-row flex-wrap">
      <template v-for="item in productStore.getProductList">
        <column class="p-2" cols="12" xs="6" sm="6" md="6" lg="3">
          <card class="bg-transparent border-0">
            <card-content class="d-flex flex-column">
              <img
                class="bg-white rounded"
                :src="item.images[0]"
                :alt="`Product ${item.title} image`"
              />
              <h5 class="fw-jakarta-bold">{{ item.title }}</h5>
              <p>$ {{ item.price }}</p>
            </card-content>
          </card>
        </column>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  setup() {
    const nuxtApp = useNuxtApp();
    const productStore = productData();
    return {
      productStore,
      nuxtApp,
    };
  },
  data: () => ({
    request: {
      type: "product",
      request: {
        perPage: 20,
        page: 1,
        pageStart: 0,
        sortBy: "title",
        order: "asc",
      },
    } as InfRequestPaginationClient,
  }),
  methods: {
    async initializeData() {
      try {
        const { data, pending, error, refresh } = await useFetch(
          "/api/product/list",
          {
            method: "POST",
            body: this.request,
            getCachedData: (key) => {
              // Check if the data is already cached in the Nuxt payload
              if (this.nuxtApp.isHydrating && this.nuxtApp.payload.data[key]) {
                return this.nuxtApp.payload.data[key];
              }

              // Check if the data is already cached in the static data
              if (this.nuxtApp.static.data[key]) {
                return this.nuxtApp.static.data[key];
              }

              return null;
            },
          }
        );
        if (!data.value) {
          // The data was not cached, so fetch it from the server
          await refresh();
        } else {
          // The data was cached, so use it
          console.log("load cached data from server");
        }

        this.productStore.productList = data.value.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.initializeData();
  },
});
</script>
