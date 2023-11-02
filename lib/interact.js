import readline from 'readline';

// 设置好的问题换用户的输入回答
function question(rl, {text, value}) {
  const q = `${text}(${value})\n`;
  return new Promise((resolve) => {
    rl.question(q, (answer) => {
      resolve(answer || value);
    });
  });
}

export async function interact(questions) {
  // 输入输出实例
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const answers = [];
  for(let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const answer = await question(rl, q); // 等待问题的输入，获取answer
    answers.push(answer);
  }
  rl.close(); // 断掉实例
  return answers;
}

// export function interact (questions) {
//   process.stdin.setEncoding('utf8')
//   let i = 0
//   let { title, value } = questions[i++] // 获取当前问题，并且i++
//   const answers = []
//   return new Promise((resolve, reject) => {
//     console.log(`${title}（例如：${value}）`) // 打印问题
//     process.stdin.on('readable', () => {
//       const value = process.stdin.read().slice(0, -1)
//       answers.push(value) // 保存回答
//       const nextQuestion = questions[i++] // 获取下一个问题，并且i++
//       // 还有下一个问题，继续监听并且打印问题
//       if (nextQuestion) {
//         process.stdin.read()
//         let { title, value } = nextQuestion
//         console.log(`${title}（例如：${value}）`) // 打印问题
//       } else {
//         // 问题回答完了，就resolve返回
//         resolve(answers)
//       }
//     })
//   })
// }