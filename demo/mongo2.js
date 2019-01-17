// var db = connect('saber')
let berserker = {
  name: 'berserker',
  age: 18,
  weapon: 'axe',
  skill: 'kill people',
  feature: {
    height: 180,
    strong: true,
    master: 'iriya'
  },
  registTime: new Date()
}

let caster = {
  name: 'caster',
  age: 16,
  weapon: 'magic',
  skill: 'kill herself',
  feature: {
    height: 160,
    strong: false,
    master: 'unknown'
  },
  registTime: new Date()
}

let data = [berserker, caster]
db.saber.insert(data)

print('[insert success]')