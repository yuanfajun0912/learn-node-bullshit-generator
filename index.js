import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { readFile, writeFileSync, existsSync, mkdirSync } from 'fs'
import { createRandomPicker } from './lib/random.js'
import { generate } from './lib/generator.js'
import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage';

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
  return outputFile
}

const parseOptions = () => {
  // let options = {}
  // const argv = process.argv
  // argv.forEach((item, index) => {
  //   if (item === '--title' && argv[index + 1]) {
  //     options.title = argv[index + 1]
  //   } else if (item === '--min' && argv[index + 1]) {
  //     options.min = argv[index + 1]
  //   } else if (item === '--max' && argv[index + 1]) {
  //     options.max = argv[index + 1]
  //   } 
  // })
  // return options
  const optionDefinitions = [
    {name: 'title', alias: 't', type: String},
    {name: 'min', type: Number},
    {name: 'max', type: Number},
    {name: 'help'}
  ]
  return commandLineArgs(optionDefinitions)
}

const usageSections = [
  {
    header: '狗屁不通文章生成器--by yfj',
    content: '生成随机的文章段落用于测试',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'title',
        typeLabel: '{underline string}',
        description: '文章的主题。'
      },
      {
        name: 'min',
        typeLabel: '{underline number}',
        description: '文章最小字数。'
      },
      {
        name: 'max',
        typeLabel: '{underline number}',
        description: '文章最大字数。'
      },
      {
        name: 'help',
        typeLabel: '{underline string}',
        description: '命令行参数手册'
      }
    ],
  },
]

// 加载词法库
loadCorpus().then(({ status, data }) => {
  if (!status) return console.log('err:', data) 
  // 随机获取title方法
  const randomTitleFunc = createRandomPicker(data.title)
  // 获取到的随机title
  const defaultTitle = randomTitleFunc()
  // 获取命令行的参数
  const argvOptions = parseOptions()
  // 命令行输入的--help就打印参数手册
  if ('help' in argvOptions) {
    console.log(commandLineUsage(usageSections))
  } else {
    // 文章title
    const title = argvOptions.title || defaultTitle
    // 生成的文章列表
    const article = generate(`${title}`, { corpus: data, min: argvOptions.min || 1000, max: argvOptions.max || 2000 })
    // 格式化文章
    const articleStr = `${title}\n\n    ${article.join('\n    ')}`
    // 保存文章
    const saveFileUrl = saveCorpus(`${title}-${new Date().getTime()}`, articleStr)
    console.log(`保存文章成功，目录在 ${saveFileUrl}`)
  }
})