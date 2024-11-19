const state = () => ({
  data: "hello world",
  productList: [],
  productLoading: true,
});
const getters = {
  getProductList: (state) => {
    return state.productList;
  },
};

const actions = {};

export const productData = defineStore("product-store", {
  state,
  getters,
  actions,
});
