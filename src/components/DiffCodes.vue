<script setup lang="ts">
const left = ref(`export default [
  {
    "title": "Write type-safe function judgement in TypeScript",
    "path": "/blog/about-ts",
    "readTime": 1
  },
  {
    "title": "The Vue Reactivity, Lecture on BinFE 2020",
    "author": "Antfu",
    "date": "2020-10-10",
    "path": "/blog/long",
    "readTime": 8
  }
]`)
const right = ref(`export default [
  {
    "title": "Diff Match Patch",
    "path": "/blog/diff-match-patch",
    "readTime": 1
  },
  {
    "title": "Write type-safe function judgement in TypeScript",
    "path": "/blog/type-safe-is-function",
    "readTime": 1
  }
]`)

const diff = useDiff(left, right)
</script>

<template>
  <textarea v-model="left" />
  <textarea v-model="right" />
  <pre v-html="diff"></pre>
</template>

<style scoped></style>
