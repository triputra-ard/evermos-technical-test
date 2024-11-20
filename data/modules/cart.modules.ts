import { useToast } from "vue-toast-notification";

const state = () => ({
  data: "hello world",
  cartData: [],
});
const getters = {
  getCartLength: (state) => {
    return state.cartData.length;
  },
  getCartList: (state) => {
    return state.cartData;
  },
  totalPrice: (state) => {
    const total = state.cartData.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return Math.round(total * 100) / 100; // Rounds to two decimal places
  },
};

const actions = {
  addToCart(product: object) {
    const $toast = useToast();
    const existingItem = this.cartData.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
      const total = existingItem.price * existingItem.quantity;
      existingItem.total = Math.round(total * 100) / 100;
      $toast.success("Added to cart", {
        position: "bottom-right",
      });
    } else {
      this.cartData.push({
        ...product,
        quantity: 1,
        total: product.price, // Initialize total
      });
      $toast.success("Added to cart", {
        position: "bottom-right",
      });
    }
  },
  removeFromCart(productId: number) {
    const $toast = useToast();
    this.cartData = this.cartData.filter((item) => item.id !== productId);
    $toast.warning("Removed from cart", {
      position: "bottom-right",
    });
  },
  updateQuantity(productId: number, quantity: number) {
    const item = this.cartData.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        const total = item.price * item.quantity; // Update total when quantity changes
        item.total = Math.round(total * 100) / 100;
      }
    }
  },
  clearCart() {
    this.cartData = [];
  },
};

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
