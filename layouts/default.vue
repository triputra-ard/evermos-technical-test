<template>
  <div class="page-wrapper relative h-[100vh]">
    <header
      class="fixed bg-blue-700 w-[100%] flex flex-wrap justify-between text-white p-[1rem]"
    >
      <span>Header</span>
      <span>Content</span>
    </header>
    <main class="pt-[5rem]">
      <slot></slot>
    </main>
  </div>
</template>
