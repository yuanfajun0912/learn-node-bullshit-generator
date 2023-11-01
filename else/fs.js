import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { readFile } from 'fs'

const url = import.meta.url // 获取当前文件的url
// console.log(url)
// console.log(fileURLToPath(url)) // 当前文件path
// console.log(dirname(fileURLToPath(url))) // 所属目录url
readFile(resolve(dirname(fileURLToPath(url)), '../corpus/data.json'), 'utf-8', (err, data) => {
  console.log('err:', err) // null
  console.log('data:', data) // 打印的buffer对象
})


// import { readFile } from 'fs'
// // import path from 'path'
// // console.log(path.dirname())
// readFile('../corpus/data.json', 'utf-8', (err, data) => {
//   console.log('err:', err) // null
//   console.log('data:', data) // 打印的buffer对象
// })

// readFile('../corpus/data1.json', (err, data) => {
//   console.log('err:', err) // 保存信息：err: [Error: ENOENT: no such file or directory, open './corpus/data1.json']....
//   console.log('data:', data) // null
// })