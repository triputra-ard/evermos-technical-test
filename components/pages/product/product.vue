<template>
  <div class="mt-5">
    <div class="d-flex flex-wrap flex-row mb-5">
      <column class="p-2" cols="12" lg="5">
        <div class="form-wrapper input">
          <label class="form-label" aria-labelledby="Search input"
            >Search</label
          >
          <input
            v-model="itemPayload.search"
            type="text"
            class="form-control"
            placeholder="Search product"
            aria-placeholder="Search for product"
            @update:model-value="handleSearch"
          />
          <icon class="icon-group" icon="mdi-magnify"></icon>
        </div>
      </column>
      <column class="p-2" cols="12" lg="3">
        <div class="form-wrapper">
          <label class="form-label" aria-labelledby="Order by category"
            >Category</label
          >
          <form-select
            v-model="itemPayload.category"
            :items="categoryStore.getCategoryList"
            item-value="slug"
            item-title="name"
            aria-placeholder="Select the category"
            @update:model-value="handleCategory"
          ></form-select>
          <icon class="icon-group" icon="mdi-chevron-down"></icon>
        </div>
      </column>
      <column class="p-2 ms-lg-auto" cols="12" lg="2">
        <div class="form-wrapper">
          <label class="form-label" aria-labelledby="Sort product">Sort</label>
          <form-select
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

          <icon class="icon-group" icon="mdi-chevron-down"></icon>
        </div>
      </column>
    </div>
    <template v-if="!productStore.productLoading">
      <div class="d-flex flex-row flex-wrap">
        <template v-for="item in productStore.getProductList">
          <column class="p-2" cols="12" xs="6" sm="6" md="6" lg="3">
            <card class="bg-transparent border-0 product-card">
              <card-content>
                <img
                  class="product-image"
                  :src="item.images[0]"
                  :alt="`Product ${item.title} image`"
                />
                <div class="product-info">
                  <h5 class="fw-jakarta-bold">{{ item.title }}</h5>
                  <p>$ {{ item.price }}</p>
                </div>
              </card-content>
            </card>
          </column>
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
          :total-visible="8"
          @update:model-value="handleChangePage"
        ></pagination
      ></column>
    </div>
  </div>
</template>
<script lang="ts" src="./product.ts"></script>
<style lang="scss" src="./product.scss"></style>
