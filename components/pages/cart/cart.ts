export default defineComponent({
  setup() {
    const cartStore = cartData();
    return {
      cartStore,
    };
  },
  methods: {
    handleCheckout() {
      this.$toast.error("Checkout unavailable", {
        position: "bottom",
      });
    },
  },
});
