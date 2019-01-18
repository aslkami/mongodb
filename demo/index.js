const db = connect('saber')

let startTime = new Date().getTime()

let result = db.random.find({ username: '2rzkr9yj0hp2f' })
result.forEach(element => {
  printjson(element)
});

let endTime = new Date().getTime()

print(`${endTime - startTime}ms`)
