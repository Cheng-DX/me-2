import { diff_match_patch, type Diff } from 'diff-match-patch'
import type { Ref } from 'vue'

const dmp = new diff_match_patch()
export function generateDiff(left: string, right: string) {
  const changes = dmp.diff_main(left, right)
  dmp.diff_cleanupSemantic(changes)
  return changes
}

export function renderDiff(changes: Diff[]) {
  return changes.map(([type, text]) => {
    const color = type === 1 ? 'green' : type === -1 ? 'red' : 'grey'
    const hasDeleted = type === -1
    return `<span style="color: ${color}; text-decoration: ${hasDeleted ? 'line-through' : 'none'}">${text}</span>`
  }).join('')
  // return dmp.diff_prettyHtml(changes)
}

export function useDiff(left: Ref<string>, right: Ref<string>) {
  const changes = computed(() => {
    return generateDiff(left.value, right.value)
  })

  return computed(() => renderDiff(changes.value))
}
