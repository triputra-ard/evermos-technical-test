<template>
  <header class="navbar main-navbar">
    <nav class="navigation-wrapper">
      <nuxt-link href="/" class="navbar-brand">
        <img
          src="/icons/evermos_icon.png"
          alt="Evermos logo with color green and black"
          class="brand-logo"
        />
        <h3 class="fw-jakarta-semibold mt-1 ms-4 mt-lg-0 ms-lg-2">
          E-Marketplace
        </h3>
      </nuxt-link>
      <button
        class="btn navbar-toggler border-0"
        role="button"
        @click="navbarToggle"
      >
        <icon class="h2" :icon="toggleIcon"></icon>
      </button>
      <ol class="navbar-list">
        <li>
          <nuxt-link to="/" class="nav-link"> Shop </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/category" class="nav-link"> Category </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about" class="nav-link"> About </nuxt-link>
        </li>
      </ol>
      <ol class="navbar-action">
        <li>
          <a href="javascript:void(0)" class="nav-link">
            <icon class="h5" icon="mdi-shopping-outline"></icon>
            <span class="ms-2">0</span>
          </a>
        </li>
      </ol>
    </nav>
  </header>
</template>
<script lang="ts">
export default defineComponent({
  data: () => ({
    toggleIcon: "mdi-menu",
  }),
  methods: {
    handleScroll() {
      if (process.client) {
        window.addEventListener("scroll", () => {
          let elements = document.querySelector(".main-navbar");

          if (scrollY > 50) {
            elements.setAttribute("data-scroll", "on-scroll");
          } else if (scrollY < 50) {
            elements.setAttribute("data-scroll", "");
          }
        });
      }
    },
    onResize() {
      const windowSize = { x: window.innerWidth, y: window.innerHeight };
      // console.log(windowSize);
    },
    navbarToggle() {
      const navbar = document.querySelector(".main-navbar");
      navbar.classList.toggle("show");
      if (navbar.classList.contains("show")) {
        this.toggleIcon = "mdi-close";
      } else {
        this.toggleIcon = "mdi-menu";
      }
    },
  },
  mounted() {
    this.handleScroll();
    if (process.client) {
      window.addEventListener("resize", this.onResize());
    }
  },
});
</script>

<style lang="scss" src="./NavigationBar.scss"></style>
