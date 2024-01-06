<script setup lang="ts">
const links = ref([
  { text: 'Blog', to: '/blog' },
  { text: 'Idea', to: '/idea' },
  { text: 'Demos', to: '/demos' },
])
</script>

<template>
  <nav flex="~ items-center gap-4" justify-end print:op0>
    <RouterLink v-for="link in links" text-gray-5 hover:text-gray-9 dark="text-gray hover:text-gray-2" transition-300
      :to="link.to" :key="link.text">
      {{ link.text }}
    </RouterLink>

    <button icon-btn @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon" />
    </button>

    <a icon-btn rel="noreferrer" href="https://github.com/Cheng-DX" target="_blank" title="GitHub">
      <div i-carbon-logo-github />
    </a>
  </nav>
</template>
