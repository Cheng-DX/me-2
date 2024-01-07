import fs from 'node:fs'
import path from 'node:path'
import frontMatter from 'front-matter'
import fg from 'fast-glob'

function generate(pattern, outFile) {
  const blogs = fg.globSync(pattern).filter(blog => !blog.includes('index.md'))
  const contents = blogs.map(blog => {
    const content = fs.readFileSync(blog, 'utf-8')
    const readTime = Math.ceil(content.split(' ').length / 200)
    const { attributes } = frontMatter(content)
    return {
      ...attributes,
      path: blog.replace('src/pages', '').replace('.md', ''),
      readTime,
    }
  })
  const fileContent = `export default ${JSON.stringify(contents, null, 2)}`
  fs.writeFileSync(path.resolve(outFile), fileContent)
}

const list = [
  {
    pattern: 'src/pages/blog/*.md',
    outFile: 'src/pages/blog/blogs.ts',
  },
  {
    pattern: 'src/pages/idea/*.md',
    outFile: 'src/pages/idea/ideas.ts',
  },
  {
    pattern: 'src/pages/demos/*.md',
    outFile: 'src/pages/demos/demos.ts',
  }
]

list.forEach(({ pattern, outFile }) => generate(pattern, outFile))