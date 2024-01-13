import { diff_match_patch, type Diff } from 'diff-match-patch'
import type { Ref } from 'vue'
import CodeMirror from 'codemirror'

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

function createCM(fromEl: Ref<HTMLTextAreaElement>, from: Ref<string>, toEl: Ref<HTMLTextAreaElement>, to: Ref<string>) {
  onMounted(() => {
    const cm1 = CodeMirror.fromTextArea(fromEl.value, {
      theme: 'vars',
      mode: 'javascript',
    })
    const cm2 = CodeMirror.fromTextArea(toEl.value, {
      theme: 'vars',
      mode: 'javascript',
    })
    watchEffect(async () => {
      const l = from.value
      const r = to.value

      await nextTick()

      cm1.startOperation()
      cm2.startOperation()

      // clean up marks
      cm1.getAllMarks().forEach(i => i.clear())
      cm2.getAllMarks().forEach(i => i.clear())
      for (let i = 0; i < cm1.lineCount() + 2; i++)
        cm1.removeLineClass(i, 'background', 'diff-removed')
      for (let i = 0; i < cm2.lineCount() + 2; i++)
        cm2.removeLineClass(i, 'background', 'diff-added')

      if (props.diff && from.value) {
        const changes = await calculateDiffWithWorker(l, r)

        const addedLines = new Set()
        const removedLines = new Set()

        let indexL = 0
        let indexR = 0
        changes.forEach(([type, change]) => {
          if (type === 1) {
            const start = cm2.posFromIndex(indexR)
            indexR += change.length
            const end = cm2.posFromIndex(indexR)
            cm2.markText(start, end, { className: 'diff-added-inline' })
            for (let i = start.line; i <= end.line; i++) addedLines.add(i)
          }
          else if (type === -1) {
            const start = cm1.posFromIndex(indexL)
            indexL += change.length
            const end = cm1.posFromIndex(indexL)
            cm1.markText(start, end, { className: 'diff-removed-inline' })
            for (let i = start.line; i <= end.line; i++) removedLines.add(i)
          }
          else {
            indexL += change.length
            indexR += change.length
          }
        })

        Array.from(removedLines).forEach(i =>
          cm1.addLineClass(i, 'background', 'diff-removed'),
        )
        Array.from(addedLines).forEach(i =>
          cm2.addLineClass(i, 'background', 'diff-added'),
        )
      }

      cm1.endOperation()
      cm2.endOperation()
    })
  })
}