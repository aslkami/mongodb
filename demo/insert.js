const db = connect('saber')
db.random.drop()

function getRandomNumber(min, max) {
  let diff = max - min
  let rand = Math.random()
  return (min + Math.round(rand * diff))
}

function getRandomUsername(mix, max) {
  let alpha = '1234567890qwertyuiopasdfghjklzxcvbnm'.split('')
  let str = ''
  for (let i = 1; i <= getRandomNumber(mix, max); i++) {
    str += alpha[getRandomNumber(0, alpha.length)]
  }
  return str
}

let startTime = new Date().getTime()
let tempArr = []
for (let j = 0; j < 2000000; j++) {
  tempArr.push({
    username: getRandomUsername(7, 16),
    registTime: new Date(),
    randNum0: getRandomNumber(100000, 999999),
    randNum1: getRandomNumber(100000, 999999),
    randNum2: getRandomNumber(100000, 999999),
    randNum3: getRandomNumber(100000, 999999),
    randNum4: getRandomNumber(100000, 999999),
    randNum5: getRandomNumber(100000, 999999),
    randNum6: getRandomNumber(100000, 999999),
    randNum7: getRandomNumber(100000, 999999),
    randNum8: getRandomNumber(100000, 999999),
    randNum8: getRandomNumber(100000, 999999)
  })
}
let foreachTime = new Date().getTime()
db.random.insert(tempArr)


let finishedTime = new Date().getTime()


print(`循环用时${foreachTime - startTime}ms`)
print(`插入用时${finishedTime - foreachTime}ms`)
