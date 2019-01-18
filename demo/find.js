const db = connect('saber')

// db.saber.find({name: 'caster'}, {_id: false, age: true, feature: true})

// 1. $in, $nin
// db.saber.find({ name: { $in: ['saber', 'archer'] } }, { _id: false , name: true, age: true, feature: true })
// db.saber.find({ name: { $nin: ['saber', 'archer'] } }, { _id: false , name: true, age: true, feature: true })


// 2. $or
// db.saber.find({ $or: [{ name: 'saber' }, { weapon: { $in: ['axe'] } }] }, { _id: false, name: true, age: true, weapon: true })

// 3. $and
// db.saber.find({ $and: [{ name: 'saber' }, { weapon: { $in: ['sword'] } }] }, { _id: false, name: true, age: true, weapon: true })


// 4.数组的查询
// db.saber.find({ hobby: '绝地求生' }, { _id: false, name: true, hobby: true })
// db.saber.find({ hobby: ['绝地求生'] }, { _id: false, name: true, hobby: true })

// db.saber.find({ hobby: { $all: ['绝地求生', '王者荣耀']} }, { _id: false, name: true, hobby: true })
// db.saber.find({ hobby: { $in: ['音乐', '电影'] } }, { _id: false, name: true, hobby: true })


// db.saber.find({ hobby: { $size: 7 } }, { _id: false, name: true, hobby: true })

// db.saber.find({}, { _id: false, name: true, hobby: { $slice: -1 } })
// db.saber.find({}, { _id: false, name: true, hobby: { $slice: 0 } })

// 5.limit,sort,skip
// db.saber.find({}, { name: true, weapon: true, age: true }).limit(2).skip(2).sort({ age: 1 })


// 6. $wehre
// db.saber.find({ $where: "this.age>30" }, { name: true, weapon: true, age: true })

// 7. find 在文本中的使用

let result = db.saber.find()
// hasNext
while (result.hasNext()) {
  printjson(result.next())
}
// forEach
result.forEach(ele => {
  printjson(ele)
});



