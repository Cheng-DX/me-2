<script setup lang='ts'>
const { frontmatter } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
})

const { t, locale } = useI18n()
const allLangs: string[] = frontmatter.supports || ['en', 'zh-CN']
const router = useRouter()
const route = useRoute()
const content = ref<HTMLDivElement>()

function createLink(lang: string) {
  const { path } = route
  return path.replace(/\/[\w\-]+$/, `/${lang}`)
}

onMounted(() => {
  const navigate = () => {
    if (location.hash) {
      const el = document.querySelector(decodeURIComponent(location.hash))
      if (el) {
        const rect = el.getBoundingClientRect()
        const y = window.scrollY + rect.top - 40
        window.scrollTo({
          top: y,
          behavior: 'smooth',
        })
        return true
      }
    }
  }

  const handleAnchors = (
    event: MouseEvent & { target: HTMLElement },
  ) => {
    const link = event.target.closest('a')

    if (
      !event.defaultPrevented
      && link
      && event.button === 0
      && link.target !== '_blank'
      && link.rel !== 'external'
      && !link.download
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
    ) {
      const url = new URL(link.href)
      if (url.origin !== window.location.origin)
        return

      event.preventDefault()
      const { pathname, hash } = url
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, '', hash)
        navigate()
      }
      else {
        router.push({ path: pathname, hash })
      }
    }
  }

  useEventListener(window, 'hashchange', navigate)
  useEventListener(content.value!, 'click', handleAnchors, { passive: false })

  setTimeout(() => {
    if (!navigate())
      setTimeout(navigate, 1000)
  }, 1)
})
</script>

<template>
  <div v-if="frontmatter.display ?? frontmatter.title" class="prose m-auto mb-8" :class="[frontmatter.wrapperClass]">
    <h1 class="mb-0 slide-enter-50">
      {{ frontmatter.display ?? frontmatter.title }}
    </h1>
    <p v-if="frontmatter.place" class="mt--4!">
      <span op50>at </span>
      <a v-if="frontmatter.placeLink" :href="frontmatter.placeLink" target="_blank">
        {{ frontmatter.place }}
      </a>
      <span v-else font-bold>
        {{ frontmatter.place }}
      </span>
    </p>
    <p v-if="frontmatter.subtitle" class="opacity-50 !-mt-6 italic slide-enter">
      {{ frontmatter.subtitle }}
    </p>
    <p v-if="frontmatter.i18n && frontmatter.lang !== locale">
      <span>
        {{ t('marks.has-more-langs') }}
      </span>
      <span v-for="lang in allLangs" :key="lang" ml-1>
        <span v-if="lang !== frontmatter.lang" opacity-50 flex-inline items-center gap-1>
          <a :href="createLink(lang)">{{ lang }}</a>
          <div i-carbon-link inline-block />
          <span v-if="lang !== allLangs[allLangs.length - 1]">,</span>
        </span>
      </span>
    </p>
  </div>
  <article ref="content" :class="[frontmatter.tocAlwaysOn ? 'toc-always-on' : '', frontmatter.class]">
    <slot />
  </article>
  <div v-if="route.path !== '/'" class="prose m-auto mt-8 mb-8 slide-enter animate-delay-500 print:hidden">
    <template v-if="frontmatter.duration">
      <span font-mono op50>> </span>
      <span op50>comment on </span>
    </template>
    <br>
    <span font-mono op50>> </span>
    <RouterLink :to="route.path.split('/').slice(0, -1).join('/') || '/'" class="font-mono op50 hover:op75"
      v-text="'cd ..'" />
  </div>
</template>
