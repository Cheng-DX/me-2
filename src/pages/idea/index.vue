<script setup lang="ts">
import ideas from './ideas'

const { t } = useI18n()
</script>

<template>
  <ContentList :contents="ideas" :name="t('header.idea')" />
</template>
