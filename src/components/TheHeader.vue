<script setup lang="ts">
import { availableLocales, loadLanguageAsync } from '~/modules/i18n'

const { t, locale } = useI18n()

async function toggleLocales() {
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}
const links = ref([
  { address: 'header.blog', to: '/blog' },
  { address: 'header.idea', to: '/idea' },
  { address: 'header.demos', to: '/demos' },
])
</script>

<template>
  <div flex="~ justify-between">
    <a icon-btn rel="noreferrer" href="/" title="Home">
      <div i-carbon-home></div>
    </a>
    <nav flex="~ items-center gap-4" justify-end print:op0 mb-8>
      <RouterLink v-for="link in links" text-gray-5 hover:text-gray-9 dark="text-gray hover:text-gray-2" transition-300
        :to="link.to" :key="link.address">
        {{ t(link.address) }}
      </RouterLink>

      <a icon-btn :title="t('button.toggle_langs')" @click="toggleLocales()">
        <div i-carbon-language />
      </a>

      <button icon-btn @click="toggleDark()">
        <div i="carbon-sun dark:carbon-moon" />
      </button>

      <a icon-btn rel="noreferrer" href="https://github.com/Cheng-DX" target="_blank" title="GitHub">
        <div i-carbon-logo-github />
      </a>
    </nav>
  </div>
</template>
