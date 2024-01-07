<script setup lang="ts">
import demos from './demos'

const { t } = useI18n()
</script>

<template>
  <ContentList :contents="demos" :name="t('header.demos')" />
</template>
