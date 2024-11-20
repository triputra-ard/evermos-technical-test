const state = () => ({
  data: "hello world",
  categoryList: [],
});
const getters = {
  getCategoryList: (state) => {
    return state.categoryList;
  },
};

const actions = {
  async fetchCategoryList() {
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
      this.categoryList = categoryDefine;
    } catch (error) {}
  },
};

export const categoryData = defineStore("category-store", {
  state,
  getters,
  actions,
});
