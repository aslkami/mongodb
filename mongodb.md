# Mongdb

## 安装服务

1. 创建mongod.cfg，以及对应的目录文件夹

```yaml
systemLog:
    destination: file
    path: c:\data\log\mongod.log
storage:
    dbPath: c:\data\db
```

 2. 命令行下配置 MongoDB 服务

    ```window
    mongod --install --dbpath --logpath
    ```

3. 配置文件启动MongoDB服务

   ```
   管理员权限打开cmd
   mongod.exe --config "your config path" --install
   net start MongoDB
   ```

   

## 连接MongoDB

​	cmd下输入  `mongo`  连接服务器



## ​基本命令

   +  show dbs   (查看数据库，相当于show  databases)
   +  show collections  (查看集合，相当于show tables)
   +  use dbname (选择数据库，与mysql一致)
   +  db  （查看当前位置）
   +  db.集合.insert/remove/update/find  (增删改查操作)
   +  db.集合.drop  (删除表)

​				

## vscode操作mongodb

mongo.js如下

```javascript
const db = connect('saber')
let obj = {
  name: 'archer'
}
db.saber.insert(obj)

print('success')
```

```
PS C:\Users\fate\Desktop\mongodb> mongo .\mongodb\demo\mongo1.js

MongoDB shell version v4.0.5
connecting to: mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("298a735a-e733-49e4-991e-909a8db2cf26") }
MongoDB server version: 4.0.5
connecting to: mongodb://127.0.0.1:27017/saber
Implicit session: session { "id" : UUID("c7b27759-9b99-4c3a-8b35-3085b92c823d") }
MongoDB server version: 4.0.5
success
```



## mongdb增删改查

### 修改

语法：db.collection.update(condition,  object)，详见demo/update.js

修改器加不加引号都可以，修改对象属性则必须加引号（如下方的feature.master）

1.  $set修饰符，用于修改属性以及嵌套属性

   ```javascript
   db.saber.update({ name: 'berserker' }, { '$set': { age: 25, weapon: 'super-axe' } })
   db.saber.update({ name: 'caster' }, { '$set': { 'feature.master': 'iriya', 'feature.clothes': 'long' } })
   ```

2. $unset 删除key

   ```javascript
   db.saber.update({name: 'caster'}, {'$unset': {registTime: ''}})
   ```

3. $inc 修改数字

   ```javascript
   db.saber.update({name: 'berserker'}, {'$inc': {age: -10}})
   ```

4. multi 为每个记录增加一个属性时可用

   ```javascript
   db.saber.update({}, {'$set': {interest: []}}, {multi: true})
   ```

5. upsert 当找不到值的时候，则改为插入该数据

   ```javascript
   db.saber.update({name: 'saber'}, {'$set': {age: 4}}, {upsert: true})
   ```

6. $push 为对象追加数组成员或者追加数组（是数组则追加，非数组则创建并追加）

   ```javascript
   db.saber.update({ name: 'berserker' }, { $push: { interest: '看电影' } })
   db.saber.update({ name: 'caster' }, { $push: { 'feature.emoji': 'smile' } })
   ```

7. $ne, $addToSet 查看是否存在，没有则追加

   ```javascript
   db.saber.update({ name: 'caster', 'feature.emoji': { $ne: 'angry' } }, { $push: { 'feature.emoji': 'angry' } })
   db.saber.update({name: 'caster'}, {$addToSet: {'feature.emoji': 'sad'}})
   ```

8. $each  批量追加

   ```javascript
   let interest_arr = ['game', 'film', 'football']
   db.saber.update({name: 'caster'}, {$push: {interest: {$each: interest_arr}}})
   ```

9. $pop  1 表示末尾删除，-1表示开头删除

   ```javascript
   db.saber.update({ name: 'berserker' }, { $pop: { interest: 1 } })
   ```

10. 根据下标修改数组元素

    ```javascript
    db.saber.update({name: 'caster'}, {$set: {'feature.emoji.0': 'laugh' }})
    ```

    

