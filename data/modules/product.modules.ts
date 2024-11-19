const state = () => ({
  data: "hello world",
  productList: [],
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
