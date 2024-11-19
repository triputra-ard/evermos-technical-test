const state = () => ({
  data: "hello world",
  categoryList: [],
});
const getters = {
  getCategoryList: (state) => {
    return state.categoryList;
  },
};

const actions = {};

export const categoryData = defineStore("category-store", {
  state,
  getters,
  actions,
});
