const db = connect('saber')

// 1. $set
// db.saber.update({ name: 'berserker' }, { '$set': { age: 25, weapon: 'super-axe' } })
// db.saber.update({ name: 'caster' }, { '$set': { 'feature.master': 'iriya', 'feature.clothes': 'long' } })

// 2. $unset
// db.saber.update({ name: 'caster' }, { '$unset': { registTime: '' } })

//3. $inc
// db.saber.update({ name: 'berserker' }, { '$inc': { age: -10 } })

// 4. multi
// db.saber.update({}, { '$set': { interest: [] } }, { multi: true })

// 5. upsert
// db.saber.update({ name: 'saber' }, { '$set': { age: 4 } }, { upsert: true })

// 6. $push
// db.saber.update({ name: 'berserker' }, { $push: { interest: '看电影' } })
// db.saber.update({ name: 'caster' }, { $push: { 'feature.emoji': 'smile' } })

// 7. $ne, $addToSet 查看是否存在，没有则追加
// db.saber.update({ name: 'caster', 'feature.emoji': { $ne: 'angry' } }, { $push: { 'feature.emoji': 'angry' } })
// db.saber.update({ name: 'caster' }, { $addToSet: { 'feature.emoji': 'sad' } })

// 8. $each 
// let interest_arr = ['game', 'film', 'football']
// db.saber.update({ name: 'caster' }, { $push: { interest: { $each: interest_arr } } })

// 9. $pop
// db.saber.update({ name: 'berserker' }, { $pop: { interest: 1 } })

// 10. 根据数组下标修改数组的值
// db.saber.update({ name: 'caster' }, { $set: { 'feature.emoji.0': 'laugh' } })






/* 应答式（有返回值） */

// 11. db.runCommand
// db.saber.update({ name: 'caster' }, { $set: { age: 16 } }, true, true)
// let msg = db.runCommand({ getLastError: 1 })
// printjson(msg)


// 12. findAndModify
let updateObj = {
  findAndModify: 'saber',
  query: { name: 'saber' },
  update: { $set: { master: 'aslkami' } },
  new: true
}
let msg = db.runCommand(updateObj)
printjson(msg)
