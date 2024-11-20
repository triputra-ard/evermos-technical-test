<template>
  <div class="p-2 detail">
    <template v-if="!productStore.productLoadingSingle">
      <column cols="12">
        <div class="d-flex flex-row flex-wrap">
          <column class="p-2" cols="12" lg="5">
            <div class="product-shown-image">
              <div class="large-image">
                <img
                  :src="image.active.src"
                  alt="Product image in large format"
                />
              </div>
              <div class="small-list-images">
                <template
                  v-for="(images, indexImages) in productStore.getProductSingle
                    .images"
                >
                  <img
                    @click="setActiveImage(images, indexImages)"
                    :class="image.active.id === indexImages ? 'active' : ''"
                    :src="images"
                    :alt="`Product image small in index:${indexImages}`"
                  />
                </template>
              </div>
            </div>
          </column>
          <column class="p-2" cols="12" lg="7">
            <div class="product-information">
              <p class="mb-1 fw-jakarta-semibold">
                {{
                  categoryStore.getCategoryNames(
                    productStore.getProductSingle.category
                  ).name
                }}
              </p>
              <h2 class="fw-jakarta-extra-bold">
                {{ productStore.getProductSingle.title }}
              </h2>
              <p class="mb-1 fw-jakarta-light">
                {{ productStore.getProductSingle.brand }}
              </p>
            </div>
            <div class="product-information">
              <tab-pills v-model="tab">
                <tab-pills-item
                  target="product-description"
                  title="Description"
                ></tab-pills-item>
                <tab-pills-item
                  target="product-specification"
                  title="Specification"
                ></tab-pills-item>
                <tab-pills-item
                  target="product-review"
                  title="Reviews"
                ></tab-pills-item>
              </tab-pills>
              <tab-content class="mt-3" v-model="tab">
                <tab-content-item value="product-description">
                  <p class="p-2">
                    {{ productStore.getProductSingle.description }}
                  </p>
                </tab-content-item>
                <tab-content-item value="product-specification">
                  <table class="table no-border">
                    <tbody>
                      <tr class="">
                        <td class="fw-jakarta-bold">Brand</td>
                        <td>:</td>
                        <td>
                          {{ productStore.getProductSingle.brand }}
                        </td>
                      </tr>
                      <tr>
                        <td class="fw-jakarta-bold">Weight</td>
                        <td>:</td>
                        <td>
                          {{ productStore.getProductSingle.weight }}
                        </td>
                      </tr>
                      <tr>
                        <td class="fw-jakarta-bold">Dimension</td>
                        <td>:</td>
                        <td>
                          {{ productStore.getProductSingle.dimensions.depth }} x
                          {{ productStore.getProductSingle.dimensions.height }}
                          x
                          {{ productStore.getProductSingle.dimensions.width }}
                        </td>
                      </tr>
                      <tr>
                        <td class="fw-jakarta-bold">Product Warranty</td>
                        <td>:</td>
                        <td>
                          {{
                            productStore.getProductSingle.warrantyInformation
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td class="fw-jakarta-bold">Delivery Information</td>
                        <td>:</td>
                        <td>
                          {{
                            productStore.getProductSingle.shippingInformation
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td class="fw-jakarta-bold">Return Policy</td>
                        <td>:</td>
                        <td>
                          {{ productStore.getProductSingle.returnPolicy }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </tab-content-item>
                <tab-content-item class="review-wrapper" value="product-review">
                  <template
                    v-if="productStore.getProductSingle.reviews.length > 0"
                    v-for="review in productStore.getProductSingle.reviews"
                  >
                    <div class="product-reviews">
                      <star :value="review.rating" :max-stars="5"></star>
                      <div class="d-flex flex-wrap flex-row">
                        <icon
                          class="review-avatar"
                          icon="mdi-account-circle"
                        ></icon>
                        <span class="review-name">{{
                          review.reviewerName
                        }}</span>
                      </div>
                      <p>{{ review.comment }}</p>
                    </div>
                  </template>
                  <template v-else>
                    <div class="text-center">No reviews yet.</div>
                  </template>
                </tab-content-item>
              </tab-content>
            </div>
            <div
              class="product-information d-flex flex-row flex-wrap justify-content-between"
            >
              <div class="d-flex flex-wrap flex-column">
                <span class="fw-jakarta-bold">Available stock</span>
                <span>{{ productStore.getProductSingle.stock }}</span>
              </div>
              <h2 class="fw-jakarta-semibold">
                $ {{ productStore.getProductSingle.price }}
              </h2>
            </div>
            <div class="d-flex flex-row flex-wrap cta-wrapper">
              <column class="d-grid grid-2 p-2" cols="12" lg="6">
                <button
                  role="button"
                  aria-labelledby="Button buy now"
                  class="btn btn-outline-evermos no-hover rounded-4"
                  @click="handleBuyNow"
                >
                  Buy Now
                </button></column
              >
              <column class="d-grid grid-2 p-2" cols="12" lg="6">
                <button
                  role="button"
                  aria-labelledby="Button add to cart"
                  class="btn btn-evermos rounded-4"
                  @click="cartStore.addToCart(productStore.getProductSingle)"
                >
                  Add to cart
                </button></column
              >
            </div>
          </column>
        </div></column
      >
      <column class="mt-5" cols="12">
        <h3 class="fw-jakarta-bold">Browse more from this category</h3>
        <div class="d-flex flex-row flex-wrap">
          <template v-for="item in productStore.getProductList">
            <column class="p-2" cols="12" xs="6" sm="6" md="6" lg="3">
              <card
                class="bg-transparent border-1 product-card"
                @click="showDetail(item.id)"
              >
                <card-content>
                  <img
                    class="product-image"
                    :src="item.thumbnail"
                    :alt="`Product ${item.title} image`"
                  />
                  <div class="product-info">
                    <h5 class="fw-jakarta-bold mb-1">{{ item.title }}</h5>
                    <p class="mb-1">{{ item.brand }}</p>
                    <h6 class="fw-jakarta-semibold">$ {{ item.price }}</h6>
                  </div>
                </card-content>
              </card>
            </column>
          </template>
        </div>
      </column>
    </template>
    <template v-else>
      <loading-wrapper>
        <loading></loading>
      </loading-wrapper>
    </template>
  </div>
</template>
<script lang="ts" src="./detail.ts"></script>
<style lang="sass" src="./detail.scss"></style>
