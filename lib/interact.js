export function interact (questions) {
  process.stdin.setEncoding('utf8')
  let i = 0
  let { title, value } = questions[i++] // 获取当前问题，并且i++
  const answers = []
  return new Promise((resolve, reject) => {
    console.log(`${title}（例如：${value}）`) // 打印问题
    process.stdin.on('readable', () => {
      const value = process.stdin.read().slice(0, -1)
      answers.push(value) // 保存回答
      const nextQuestion = questions[i++] // 获取下一个问题，并且i++
      // 还有下一个问题，继续监听并且打印问题
      if (nextQuestion) {
        process.stdin.read()
        let { title, value } = nextQuestion
        console.log(`${title}（例如：${value}）`) // 打印问题
      } else {
        // 问题回答完了，就resolve返回
        resolve(answers)
      }
    })
  })
}