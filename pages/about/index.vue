<template>
  <section class="p-1 p-lg-5 fixed-navbar-container">
    <card>
      <card-content
        class="d-flex flex-wrap flex-row justify-content-center align-items-center"
      >
        <div class="d-flex flex-column">
          <h5 class="text-center">
            made with <icon class="text-primary" icon="mdi-heart"></icon>
          </h5>
          <a class="text-center" href="https://triputra-ard.vercel.app"
            >Visit owner of site</a
          >
        </div>
      </card-content>
    </card>
  </section>
</template>
<script lang="ts" setup>
useHead({
  title: "Evermos Store - About",
});
</script>
