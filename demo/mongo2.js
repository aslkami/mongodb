// var db = connect('saber')

let saber = {
  name: 'saber',
  age: 16,
  weapon: 'sword',
  skill: 'kill people',
  feature: {
    height: 170,
    strong: true,
    master: 'aslkami'
  },
  registTime: new Date(),
  hobby: ['吃饭', '睡觉', '打豆豆', '电影', '音乐', '绝地求生', '王者荣耀']
}


let archer = {
  name: 'archer',
  age: 25,
  weapon: 'arrow',
  skill: 'kill people',
  feature: {
    height: 172,
    strong: true,
    master: 'lin'
  },
  registTime: new Date(),
  hobby: ['吃饭', '睡觉', '电影', '绝地求生', '王者荣耀']
}

let berserker = {
  name: 'berserker',
  age: 35,
  weapon: 'axe',
  skill: 'kill people',
  feature: {
    height: 180,
    strong: true,
    master: 'iriya'
  },
  registTime: new Date(),
  hobby: ['吃饭', '电影', '绝地求生']
}

let caster = {
  name: 'caster',
  age: 29,
  weapon: 'magic',
  skill: 'kill herself',
  feature: {
    height: 160,
    strong: false,
    master: 'unknown'
  },
  registTime: new Date(),
  hobby: ['吃饭']
}

let data = [saber,archer, berserker, caster]
db.saber.insert(data)

print('[insert success]')