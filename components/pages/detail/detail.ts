export default defineComponent({
  setup() {
    const cartStore = cartData();
    const productStore = productData();
    const categoryStore = categoryData();
    return {
      cartStore,
      productStore,
      categoryStore,
    };
  },
  data: () => ({
    tab: "product-description",
    image: {
      active: {
        src: "",
        id: 0,
      },
    },
  }),
  computed: {
    requestPayload() {
      const payload: InfRequestPaginationClient = {
        type: "product",
        category: this.productStore.getProductSingle.category,
        request: {
          perPage: 0,
          page: 0,
          pageStart: 0,
          order: "desc",
        },
      };

      return payload;
    },
  },
  methods: {
    async fetchProductInformation(productId: string | number) {
      try {
        await this.productStore.fetchProductSingle(productId);
        this.image.active.src = await this.productStore.getProductSingle
          .images[0];
        this.image.active.id = 0;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchProductByCategory() {
      const response = await this.productStore.fetchProductByCategory(
        this.requestPayload
      );
    },
    showDetail(id: number | string) {
      this.productStore.productLoadingSingle = true;
      this.$router.push({
        name: "detail-id",
        params: {
          id: id,
        },
      });
    },
    handleBuyNow() {
      this.$toast.error("Checkout unavailable", {
        position: "bottom",
      });
    },
    //Miscellaneous functions
    setActiveImage(activeImage: string, indexImages: number) {
      this.image.active.src = activeImage;
      this.image.active.id = indexImages;
    },
    startImageLoop(imagesData: array[], imagesIndex: number) {
      let activeIndex = imagesIndex;

      const activeImage = () => {
        const activeImage = imagesData[activeIndex];
        activeIndex = (activeIndex + 1) % imagesData.length;
        this.image.active.src = imagesData[activeIndex];
        this.image.active.id = activeIndex;
      };
      setInterval(activeImage, 6000); // Change this value to adjust the interval for image change
    },
  },
  async mounted() {
    await this.fetchProductInformation(this.$route.params.id);
    await this.fetchProductByCategory();
    await this.startImageLoop(this.productStore.getProductSingle.images, 0);
  },
});
