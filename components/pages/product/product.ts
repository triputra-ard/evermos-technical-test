export default defineComponent({
  setup() {
    const productStore = productData();
    const categoryStore = categoryData();
    const cartStore = cartData();
    return {
      productStore,
      categoryStore,
      cartStore,
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
        const response = await this.productStore.fetchProductList(
          this.requestPayload
        );
        this.itemPayload.total = response.total;
        this.itemPayload.pageStart = response.pageStart;
        this.itemPayload.page = response.page;
        this.itemPayload.order = response.order;
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          this.productStore.productLoading = false;
        }, 500);
      }
    },
    async initializeProductByCategory() {
      try {
        const response = await this.productStore.fetchProductByCategory(
          this.requestPayload
        );
        this.itemPayload.total = response.total;
        this.itemPayload.pageStart = response.pageStart;
        this.itemPayload.page = response.page;
        this.itemPayload.order = response.order;
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          this.productStore.productLoading = false;
        }, 500);
      }
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
      if (this.page.hasParams) {
        this.initializeProductByCategory();
      } else {
        this.initializeProduct();
      }
    },
    handleSearch(key: string) {
      if (key.length > 2) {
        this.productStore.productLoading = true;
        this.itemPayload.pageStart = 0;
        this.itemPayload.page = 1;
        if (this.page.hasParams) {
          this.initializeProductByCategory();
        } else {
          this.initializeProduct();
        }
      } else if (key.length < 2) {
        this.productStore.productLoading = true;
        this.itemPayload.pageStart = 0;
        this.itemPayload.page = 1;
        if (this.page.hasParams) {
          this.initializeProductByCategory();
        } else {
          this.initializeProduct();
        }
      }
    },
    handleSort() {
      this.productStore.productLoading = true;
      this.itemPayload.pageStart = 0;
      this.itemPayload.page = 1;
      if (this.page.hasParams) {
        this.initializeProductByCategory();
      } else {
        this.initializeProduct();
      }
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
    showDetail(id: number | string) {
      this.$router.push({
        name: "detail-id",
        params: {
          id: id,
        },
      });
    },
  },
  created() {
    if (this.$route.params.name) {
      this.page.hasParams = true;
      this.page.params = this.$route.params.name;
      this.itemPayload.category = this.$route.params.name;
    } else {
      this.page.hasParams = false;
      this.page.params = null;
    }
  },
  mounted() {
    this.categoryStore.fetchCategoryList();
    if (this.page.hasParams) {
      this.initializeProductByCategory();
    } else {
      this.initializeProduct();
    }
  },
});
