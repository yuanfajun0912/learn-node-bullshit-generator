// 输出两个随机方法：
// randomInt：控制生成文章的字数在min和max之间
// createRandomPicker: 从4-bullshit-generator/corpus/data.json的每类的数组中随机取出一段话

// min + probability * (max - min) => min * (1 - probability) + max * probability
export function randomInt (min = 0, max = 100) {
  const probability = Math.random()
  return Math.floor(min * (1 - probability) + max * probability)
}

export function createRandomPicker (arr) {
  // clone arr
  arr = [...arr]
  // 
  function randomPick () {
    const len = arr.length - 1;
    const pIndex = randomInt(0, len);
    let picked = arr[pIndex]; // 从数组第0到倒数第二项，随机选出一项
    [arr[pIndex], arr[len]] = [arr[len], arr[pIndex]]; // 将选出的项放到最后一项，保证下次不会被选中，防止两个一样的话相继出现
    return picked;
  }
  randomPick() // 若是创建时不执行它，则首次执行randomPick，必定不会得到最后一项，所以先执行一次把最后一项放前面，则最后一项有可能出现了（同时会随机把任意一项放到最后不让他首次出现）
  return randomPick // 输入一个随机函数，使用时就不用传入源数据arr，每次直接无脑randomPick即可
}