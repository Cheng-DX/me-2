<script setup lang="ts">
import blogs from './blogs'

const { t } = useI18n()
</script>

<template>
  <ContentList :contents="blogs" :name="t('header.blog')" />
</template>
