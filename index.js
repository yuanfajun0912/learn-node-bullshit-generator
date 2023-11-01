import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { readFile } from 'fs'

const url = import.meta.url // 获取当前文件的url

// 异步获取基础数据
readFile(resolve(dirname(fileURLToPath(url)), './corpus/data.json'), 'utf-8', (err, data) => {
  if (err) {
    console.log('err:', err)
  } else {
    console.log('data:', data)
    // TODO: 处理源数据
  }
})