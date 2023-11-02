import { createRandomPicker } from './lib/random.js'
import { generate } from './lib/generator.js'
import { loadCorpus, saveCorpus } from './lib/corpus.js'
import { parseOptions } from './lib/option.js'
import { interact } from './lib/interact.js'

(async function () {
  // 用户输入
  const answers = await interact([
    { title: '请输入标题', value: '前端' },
    { title: '文章最小字数', value: 1000 },
    { title: '文章最大字数', value: 2000 }
  ])
  const [optionTitle, optionMin, optionMax] = answers
  // 加载词法库
  const { status, data } = await loadCorpus()
  if (!status) return console.log('err:', data) 
  // 随机获取title方法
  const randomTitleFunc = createRandomPicker(data.title)
  // 获取到的随机title
  const defaultTitle = randomTitleFunc()
  // 获取命令行的参数
  // const argvOptions = parseOptions()
  // 文章title
  const title = optionTitle || defaultTitle
  // 生成的文章列表
  const article = generate(`${title}`, { corpus: data, min: optionMin || 1000, max: optionMax || 2000 })
  // 格式化文章
  const articleStr = `${title}\n\n    ${article.join('\n    ')}`
  // 保存文章
  const saveFileUrl = saveCorpus(`${title}-${new Date().getTime()}`, articleStr)
  console.log(`保存文章成功，目录在 ${saveFileUrl}`)
})()

// 加载词法库
// loadCorpus().then(({ status, data }) => {
  // if (!status) return console.log('err:', data) 
  // // 随机获取title方法
  // const randomTitleFunc = createRandomPicker(data.title)
  // // 获取到的随机title
  // const defaultTitle = randomTitleFunc()
  // // 获取命令行的参数
  // const argvOptions = parseOptions()
  // // 文章title
  // const title = argvOptions.title || defaultTitle
  // // 生成的文章列表
  // const article = generate(`${title}`, { corpus: data, min: argvOptions.min || 1000, max: argvOptions.max || 2000 })
  // // 格式化文章
  // const articleStr = `${title}\n\n    ${article.join('\n    ')}`
  // // 保存文章
  // const saveFileUrl = saveCorpus(`${title}-${new Date().getTime()}`, articleStr)
  // console.log(`保存文章成功，目录在 ${saveFileUrl}`)
// })