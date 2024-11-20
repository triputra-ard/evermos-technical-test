<template>
  <column class="mt-3" cols="12">
    <div class="d-flex flex-row flex-wrap">
      <column class="p-1" cols="12" lg="8">
        <card>
          <card-content class="p-2">
            <div class="d-flex flex-column flex-wrap gap-2">
              <template
                v-if="cartStore.getCartList.length > 0"
                v-for="item in cartStore.getCartList"
              >
                <column class="cart-item" cols="12">
                  <img
                    class="cart-image"
                    :src="item.thumbnail"
                    :alt="`Product thumbnail on cart ${item.title}`"
                  />
                  <div class="cart-info">
                    <h5 class="fw-jakarta-regular">{{ item.title }}</h5>
                    <p class="cart-price">
                      ${{ item.price }}
                      <span class="stock-status">{{
                        item.availabilityStatus
                      }}</span>
                    </p>
                  </div>
                  <div class="cart-total">
                    <h4 class="fw-jakarta-semibold text-end">
                      ${{ item.total }}
                    </h4>
                    <div class="cart-quantity">
                      <button
                        role="button"
                        class="btn"
                        @click="
                          cartStore.updateQuantity(item.id, item.quantity - 1)
                        "
                      >
                        <icon icon="mdi-minus"></icon>
                      </button>
                      <span>{{ item.quantity }}</span>
                      <button
                        role="button"
                        class="btn"
                        @click="
                          cartStore.updateQuantity(item.id, item.quantity + 1)
                        "
                      >
                        <icon icon="mdi-plus"></icon>
                      </button>
                    </div>
                    <button
                      role="button"
                      class="btn text-black-50 mt-2"
                      @click="cartStore.removeFromCart(item.id)"
                    >
                      <icon class="me-1" icon="mdi-delete"></icon> Delete
                    </button>
                  </div>
                </column> </template
              ><template v-else>
                <column cols="12"> Your cart is empty </column>
              </template>
            </div>
          </card-content>
        </card></column
      >
      <column class="p-1" cols="12" lg="4">
        <card>
          <card-content class="p-3 d-flex flex-column">
            <h2>Shopping total</h2>
            <div
              class="d-flex flex-row justify-content-between gap-2 mb-2 pb-4 border-bottom border-secondary-subtle"
            >
              <span>Total price</span>
              <span class="fw-jakarta-bold">${{ cartStore.totalPrice }}</span>
            </div>
            <div class="d-grid gap-2">
              <button
                role="button"
                class="btn btn-evermos"
                @click="handleCheckout"
              >
                Checkout
              </button>
            </div>
          </card-content>
        </card></column
      >
    </div>
  </column>
</template>
<script lang="ts" src="./cart.ts"></script>
<style lang="scss" src="./cart.scss"></style>
