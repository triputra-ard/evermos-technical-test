<template>
  <div class="mt-5">
    <div class="d-flex flex-wrap flex-row mb-5">
      <column class="p-2" cols="12" lg="5">
        <form-wrapper
          class="input"
          icon="mdi-magnify"
          label="Search"
          aria-labelledby="Search input"
        >
          <input
            v-model="itemPayload.search"
            type="text"
            class="form-control"
            placeholder="Search product"
            aria-placeholder="Search for product"
            @update:model-value="handleSearch"
          />
        </form-wrapper>
      </column>
      <column class="p-2" cols="12" lg="3">
        <form-wrapper
          icon="mdi-chevron-down"
          label="Category"
          aria-labelledby="Order by category"
        >
          <form-select
            v-model="itemPayload.category"
            :items="categoryStore.getCategoryList"
            item-value="slug"
            item-title="name"
            aria-placeholder="Select the category"
            @update:model-value="handleCategory"
          ></form-select
        ></form-wrapper>
      </column>
      <column class="p-2 ms-lg-auto" cols="12" lg="2">
        <form-wrapper
          icon="mdi-chevron-down"
          label="Sort"
          aria-labelledby="Sort product"
          ><form-select
            v-model="itemPayload.order"
            :items="[
              {
                value: 'desc',
                name: 'Desc',
              },
              {
                value: 'asc',
                name: 'Asc',
              },
            ]"
            aria-placeholder="Order the list"
            @update:model-value="handleSort"
          ></form-select>
        </form-wrapper>
      </column>
    </div>
    <template v-if="!productStore.productLoading">
      <div class="d-flex flex-row flex-wrap">
        <template
          v-if="productStore.getProductList.length > 0"
          v-for="item in productStore.getProductList"
        >
          <column class="p-2" cols="12" xs="6" sm="6" md="6" lg="3">
            <card
              title="Click/Tap to view detail"
              class="bg-transparent border-0 product-card"
            >
              <card-content @click="showDetail(item.id)">
                <img
                  class="product-image"
                  :src="item.thumbnail"
                  :alt="`Product ${item.title} image`"
                />
                <div class="product-info">
                  <h5 class="fw-jakarta-bold mb-1">{{ item.title }}</h5>
                  <p class="mb-1 d-flex flex-wrap justify-content-between">
                    {{ item.brand }}
                    <span class="fw-jakarta-bold"
                      ><icon class="text-warning" icon="mdi-star"></icon
                      >{{ item.rating }}
                      <span class="fw-jakarta-regular"
                        >({{ item.reviews.length }})</span
                      ></span
                    >
                  </p>
                  <h6 class="fw-jakarta-semibold">$ {{ item.price }}</h6>
                </div>
              </card-content>
              <card-footer class="d-grid grid-2 bg-transparent border-0">
                <button
                  role="button"
                  class="btn btn-outline-evermos"
                  @click="cartStore.addToCart(item)"
                >
                  Add to cart
                </button>
              </card-footer>
            </card>
          </column>
        </template>
        <template v-else>
          <column cols="12">
            <p class="text-center">No products found</p></column
          >
        </template>
      </div> </template
    ><template v-else>
      <loading-wrapper><loading /></loading-wrapper>
    </template>
    <div class="d-flex flex-wrap flex-row justify-content-lg-center">
      <column cols="12" lg="6">
        <pagination
          prev-icon="mdi-chevron-left"
          next-icon="mdi-chevron-right"
          :total-page="itemPayload.total"
          v-model="itemPayload.page"
          :total-visible="$device.isDesktop ? 8 : 5"
          @update:model-value="handleChangePage"
        ></pagination
      ></column>
    </div>
  </div>
</template>
<script lang="ts" src="./product.ts"></script>
