const state = () => ({
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
  getCategoryNames(search: string): any {
    const category = this.categoryList.find((c) => c.slug === search);
    return category;
  },
};

const persist = {
  pick: ["categoryList"],
  storage: piniaPluginPersistedstate.localStorage(),
};
export const categoryData = defineStore("category-store", {
  state,
  getters,
  actions,
  persist,
});
