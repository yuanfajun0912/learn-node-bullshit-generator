import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { readFile, writeFileSync, existsSync, mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

// 异步加载语料库文件
export async function loadCorpus () {
  return new Promise((resolveFunc, rejectFunc) => {
    readFile(resolve(__dirname, '../corpus/data.json'), 'utf-8', (err, data) => {
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

// 同步写入生成好的文章
export function saveCorpus (title, data) {
  // 输出目录path
  const outputDir = resolve(__dirname, '../output')
  // 输出文件path
  const outputFile = resolve(outputDir, `${title}.txt`)
  // 输出目录不存在就创建个
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir)
  }
  // 写入文件
  writeFileSync(outputFile, data)
  return outputFile
}