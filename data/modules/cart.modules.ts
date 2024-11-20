const state = () => ({
  data: "hello world",
  cartData: [],
});
const getters = {};

const actions = {};

const persist = {
  pick: ["cartData"],
  storage: piniaPluginPersistedstate.localStorage(),
};
export const cartData = defineStore("cart-store", {
  state,
  getters,
  actions,
  persist,
});
