import { describe, expect, it } from 'vitest'
import { generateDiff, renderDiff } from './diff'

describe('diff', () => {
  it('should works', () => {
    const left = `export default [
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
]`
    const right = `export default [
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
]`
    const changes = generateDiff(left, right)
    // const r = renderDiff(changes)
    expect(changes).toMatchInlineSnapshot(`
      [
        [
          0,
          "export default [
        {
          "title": "",
        ],
        [
          -1,
          "Write type-safe function judgement in TypeScript",
        ],
        [
          1,
          "Diff Match Patch",
        ],
        [
          0,
          "",
          "path": "/blog/",
        ],
        [
          -1,
          "about-ts",
        ],
        [
          1,
          "diff-match-patch",
        ],
        [
          0,
          "",
          "readTime": 1
        },
        {
          "title": "",
        ],
        [
          -1,
          "The Vue Reactivity, Lecture on BinFE 2020",
          "author": "Antfu",
          "date": "2020-10-10",
        ],
        [
          1,
          "Write type-safe function judgement in TypeScript",
        ],
        [
          0,
          "",
          "path": "/blog/",
        ],
        [
          -1,
          "l",
        ],
        [
          1,
          "type-safe-is-functi",
        ],
        [
          0,
          "on",
        ],
        [
          -1,
          "g",
        ],
        [
          0,
          "",
          "readTime": ",
        ],
        [
          -1,
          "8",
        ],
        [
          1,
          "1",
        ],
        [
          0,
          "
        }
      ]",
        ],
      ]
    `)
  })
})