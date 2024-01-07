<script setup lang="ts">
type Content = {
  title: string
  readTime: number
  path: string
  date?: string | number
  author?: string
}
const props = defineProps<{
  contents: Content[]
  name: string
}>()
</script>

<template>
  <div pt-10 max-w-65ch m-auto relative>
    <span text-8em color-transparent absolute right-3rem top--2rem font-bold text-stroke-2 text-stroke-hex-aaa op10>{{
      props.name }}</span>
    <div v-for="content, idx in props.contents" :key="content.path">
      <div class="slide-enter" :style="{
        '--enter-stage': idx,
        '--enter-step': '60ms',
      }">
        <component :is="content.path.includes('://') ? 'a' : 'RouterLink'" v-bind="content.path.includes('://') ? {
          href: content.path,
          target: '_blank',
          rel: 'noopener noreferrer',
        } : {
          to: content.path,
        }
          " class="item block font-normal mb-6 mt-2 no-underline">
          <li class="no-underline" flex="~ col md:row gap-2 md:items-center">
            <div class="title text-lg leading-1.2em" flex="~ gap-2 wrap">
              <span align-middle>{{ content.title }}</span>
            </div>

            <div flex="~ gap-2 items-center">
              <span text-sm op50 ws-nowrap v-if="content.date">{{ content.date }}</span>
              <span text-sm op50 ws-nowrap>{{ content.readTime }}min</span>
            </div>
          </li>
        </component>
      </div>
    </div>
  </div>
</template>