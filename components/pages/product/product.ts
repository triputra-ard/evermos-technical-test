export default defineComponent({
  setup() {
    const nuxtApp = useNuxtApp();
    const productStore = productData();
    const categoryStore = categoryData();
    return {
      productStore,
      categoryStore,
      nuxtApp,
    };
  },
  data: () => ({
    page: {
      hasParams: false,
      params: null,
    },
    itemPayload: {
      total: 0,
      perPage: 20,
      page: 1,
      pageStart: 0,
      sortBy: "title",
      order: "desc",
      search: "",
      category: "all",
    },
  }),
  computed: {
    requestPayload() {
      const payload: InfRequestPaginationClient = {
        type: "product",
        request: {
          perPage: this.itemPayload.perPage,
          page: this.itemPayload.page,
          pageStart: this.itemPayload.pageStart,
          sortBy: "title",
          order: this.itemPayload.order,
        },
      };
      if (this.itemPayload.search.length > 0) {
        Object.assign(payload.request, {
          search: this.itemPayload.search,
        });
      }

      //if page has parameters name
      if (this.page.hasParams) {
        Object.assign(payload, {
          category: this.page.params,
        });
      }
      return payload;
    },
  },
  methods: {
    async initializeProduct() {
      try {
        const request = await $fetch("/api/product/list", {
          method: "POST",
          body: this.requestPayload,
        });

        this.productStore.productList = request.data;
        this.itemPayload.total = request?.pagination.total;
        this.itemPayload.pageStart = request?.pagination.pageStart;
        this.itemPayload.page = request?.pagination.page;
        this.itemPayload.order = request?.pagination.order;
        setTimeout(() => {
          this.productStore.productLoading = false;
        }, 500);
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          this.productStore.productLoading = false;
        }, 500);
      }
    },
    async initializeProductByCategory() {
      try {
        const request = await $fetch("/api/product/category-find", {
          method: "POST",
          body: this.requestPayload,
        });

        this.productStore.productList = request.data;
        this.itemPayload.total = request?.pagination.total;
        this.itemPayload.pageStart = request?.pagination.pageStart;
        this.itemPayload.page = request?.pagination.page;
        this.itemPayload.order = request?.pagination.order;
        setTimeout(() => {
          this.productStore.productLoading = false;
        }, 500);
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          this.productStore.productLoading = false;
        }, 500);
      }
    },
    async getCategory() {
      try {
        const requestCategory = await $fetch("/api/category/list", {
          method: "POST",
          body: {
            type: "category",
          },
        });
        const categoryDefine = [
          {
            slug: "all",
            name: "All Categories",
            url: null,
          },
        ];
        categoryDefine.push(...requestCategory.data);
        this.categoryStore.categoryList = categoryDefine;
      } catch (error) {}
    },
    updatePage(page: number) {
      this.requestPayload.request.page = page;
    },
    handleChangePage() {
      // Simulate pagination
      for (
        let currentPage = 0;
        currentPage <= this.itemPayload.total;
        currentPage++
      ) {
        // Calculate the range of items to display on the current page
        const startIndex = (currentPage - 1) * this.itemPayload.perPage;
        const endIndex = Math.min(
          startIndex + this.itemPayload.perPage,
          this.itemPayload.total
        );

        // Display items on the current page
        if (currentPage == this.itemPayload.page) {
          this.itemPayload.pageStart = startIndex;
        }
      }
      this.productStore.productLoading = true;
      this.initializeProduct();
    },
    handleSearch(key: string) {
      if (key.length > 2) {
        this.productStore.productLoading = true;
        this.itemPayload.pageStart = 0;
        this.itemPayload.page = 1;
        this.initializeProduct();
      } else if (key.length < 2) {
        this.productStore.productLoading = true;
        this.itemPayload.pageStart = 0;
        this.itemPayload.page = 1;
        this.initializeProduct();
      }
    },
    handleFilter() {
      this.productStore.productLoading = true;
      this.itemPayload.pageStart = 0;
      this.itemPayload.page = 1;
      this.initializeProduct();
    },
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
  created() {
    if (this.$route.params.name) {
      this.page.hasParams = true;
      this.page.params = this.$route.params.name;
      this.itemPayload.category = this.$route.params.name;
    }
  },
  mounted() {
    this.getCategory();
    if (this.page.hasParams) {
      this.initializeProductByCategory();
    } else {
      this.initializeProduct();
    }
  },
});
