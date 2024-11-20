<template>
  <nav>
    <ul :class="paginationClasses">
      <!-- Previous Button -->
      <li
        :class="getPageItemClass(false, isPrevDisabled)"
        @click="goToPage(modelValue - 1)"
      >
        <a class="page-link">
          <template v-if="prevIcon">
            <icon class="h4" :icon="prevIcon"></icon>
          </template>
          <template v-else> Previous </template>
        </a>
      </li>

      <!-- Page Numbers -->
      <li
        v-for="page in pages"
        :key="page"
        :class="getPageItemClass(page === modelValue, page === '...')"
        @click="goToPage(page)"
      >
        <a class="page-link">{{ page }}</a>
      </li>

      <!-- Next Button -->
      <li
        :class="getPageItemClass(false, isNextDisabled)"
        @click="goToPage(modelValue + 1)"
      >
        <a class="page-link">
          <template v-if="prevIcon">
            <icon class="h4" :icon="nextIcon"></icon>
          </template>
          <template v-else> Next </template></a
        >
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { cM } from "~/utils/classMerge";

export default defineComponent({
  name: "Pagination",
  props: {
    totalPage: {
      type: Number,
      required: true,
    },
    totalVisible: {
      type: Number,
      default: 5, // Maximum visible pages
    },
    size: {
      type: String,
      default: "md",
      validator: (val) => ["sm", "md", "lg"].includes(val),
    },
    onPageChange: {
      type: Function,
      required: true,
    },
    modelValue: Number,
    prevIcon: String,
    nextIcon: String,
  },
  computed: {
    paginationClasses(): string {
      return cM("pagination modern-pagination d-flex justify-content-center", {
        "pagination-sm": this.size === "sm",
        "pagination-lg": this.size === "lg",
      });
    },
    pages(): number {
      const { totalPage, totalVisible, modelValue } = this;
      const half = Math.floor(totalVisible / 2);
      let start = Math.max(1, modelValue - half);
      let end = Math.min(totalPage, modelValue + half);

      // Adjust for edge cases
      if (modelValue <= half) {
        end = Math.min(totalVisible, totalPage);
      } else if (modelValue + half > totalPage) {
        start = Math.max(1, totalPage - totalVisible + 1);
      }

      const visiblePages = [];
      if (start > 1) visiblePages.push(1, "...");
      for (let i = start; i <= end; i++) visiblePages.push(i);
      if (end < totalPage) visiblePages.push("...", totalPage);

      return visiblePages;
    },
    isPrevDisabled() {
      return this.modelValue <= 1 || this.modelValue > this.totalPage;
    },
    isNextDisabled() {
      return this.modelValue >= this.totalPage || this.modelValue < 1;
    },
  },
  methods: {
    isActive(page: number) {
      return page === this.modelValue;
    },
    goToPage(page: number) {
      if (typeof page === "number" && page !== this.modelValue) {
        this.$emit("update:modelValue", page);
        this.onPageChange(page);
      }
    },
    getPageItemClass(isActive: boolean, isDisabled: boolean) {
      return cM("page-item", {
        active: isActive,
        disabled: isDisabled,
      });
    },
  },
});
</script>
<style lang="scss">
.modern-pagination {
  .page-item {
    cursor: pointer;

    &:not(.active) {
      .page-link {
        background-color: transparent;
        font-weight: $medium-font;
        color: var(--evermos-green-dark);
      }
    }
    &.active {
      .page-link {
        color: var(--evermos-green-dark);
        background-color: var(--evermos-green);
      }
    }
    &.disabled {
      pointer-events: none;
      cursor: not-allowed;
      .page-link {
        color: var(--gray-40) important;
      }
    }
    .page-link {
      cursor: pointer;
      margin-left: 0.2rem;
      margin-right: 0.2rem;
      border-radius: $radius-1;
      border: unset !important;
    }
  }
}
</style>
