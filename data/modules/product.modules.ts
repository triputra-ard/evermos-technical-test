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

const actions = {
  fetchProductList(payload: object) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const requestServer = await $fetch("/api/product/list", {
          method: "POST",
          body: payload,
        });
        this.productList = requestServer.data;
        setTimeout(() => {
          this.productLoading = false;
        }, 500);
        //resolve return only pagination for pages
        resolve(requestServer.pagination);
      } catch (error) {
        reject(error);
      }
    });
  },
  fetchProductByCategory(payload: object) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const requestServer = await $fetch("/api/product/category-find", {
          method: "POST",
          body: payload,
        });
        this.productList = requestServer.data;
        setTimeout(() => {
          this.productLoading = false;
        }, 500);
        //resolve return only pagination for pages
        resolve(requestServer.pagination);
      } catch (error) {
        reject(error);
      }
    });
  },
};

export const productData = defineStore("product-store", {
  state,
  getters,
  actions,
});
