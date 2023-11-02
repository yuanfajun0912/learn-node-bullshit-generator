import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'

const optionDefinitions = [
  {name: 'title', alias: 't', type: String},
  {name: 'min', type: Number},
  {name: 'max', type: Number},
  {name: 'help'}
]

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

// 解析命令行参数
export function parseOptions () {
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
  return commandLineArgs(optionDefinitions)
}

// 获取命令行参数手册
export function getCommonGuide () {
  return commandLineUsage(usageSections)
}