const db = connect('saber')
let obj = {
  name: 'archer'
}
db.saber.insert(obj)

print('success')