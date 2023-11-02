import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { readFile, writeFileSync, existsSync, mkdirSync } from 'fs'
import { createRandomPicker } from './lib/random.js'
import { generate } from './lib/generator.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const loadCorpus = async () => {
  return new Promise((resolveFunc, rejectFunc) => {
    readFile(resolve(__dirname, './corpus/data.json'), 'utf-8', (err, data) => {
      if (err) {
        resolveFunc({
          status: false,
          data: err
        })
      } else {
        resolveFunc({
          status: true,
          data: JSON.parse(data)
        })
      }
    })
  })
}

const saveCorpus = (title, data) => {
  // 输出目录path
  const outputDir = resolve(__dirname, './output')
  // 输出文件path
  const outputFile = resolve(outputDir, `${title}.txt`)
  // 输出目录不存在就创建个
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir)
  }
  // 写入文件
  writeFileSync(outputFile, data)
}

// 加载词法库
loadCorpus().then(({ status, data }) => {
  if (!status) return console.log('err:', data) 
  // 随机获取title方法
  const randomTitleFunc = createRandomPicker(data.title)
  // 获取到的随机title
  const title = randomTitleFunc()
  // 生成的文章列表
  const article = generate(title, { corpus: data })
  // 格式化文章
  const articleStr = `${title}\n\n    ${article.join('\n    ')}`
  // 保存文章
  saveCorpus('废话文章1', articleStr)
})