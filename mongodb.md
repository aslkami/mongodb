# Mongdb

## 安装服务

1. 创建mongod.cfg，以及对应的目录文件夹(给第三步用的)

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

   ```powershell
   管理员权限打开cmd
   mongod.exe --config "your config path" --install
   net start MongoDB (开机自动启动mongodb服务，不需要窗口)
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

```powershell
执行:
mongo .\mongodb\demo\mongo1.js

返回:
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

语法：db.collection.update(==[Object]== condition, ==[Object]==  object, ==[Boolean]== upsert, ==[Boolean]==  muliti)，详见demo/update.js

带$符号的为修改器，修改器加不加引号都可以，修改对象属性则必须加引号（如下方的feature.master）

#### 非应答式（无返回值）

1.  $set修饰符，用于修改属性以及嵌套属性

   ```javascript
   db.saber.update({ name: 'berserker' }, { '$set': { age: 25, weapon: 'super-axe' } })
   db.saber.update({ name: 'caster' }, { '$set': { 'feature.master': 'iriya', 'feature.clothes': 'long' } })
   ```

   

2. $unset 删除key

   ```javascript
   db.saber.update({ name: 'caster' }, { '$unset': { registTime: '' } })
   ```

3. $inc 修改数字

   ```javascript
   db.saber.update({ name: 'berserker' }, { '$inc': { age: -10 } })
   ```

4. multi 为每个记录增加一个属性时可用

   ```javascript
   db.saber.update({}, { '$set': { interest: [] } }, { multi: true })
   ```

5. upsert 当找不到值的时候，则改为插入该数据

   ```javascript
   db.saber.update({ name: 'saber' }, { '$set': { age: 4 } }, { upsert: true })
   ```

6. $push 为对象追加数组成员或者追加数组（是数组则追加，非数组则创建并追加）

   ```javascript
   db.saber.update({ name: 'berserker' }, { $push: { interest: '看电影' } })
   db.saber.update({ name: 'caster' }, { $push: { 'feature.emoji': 'smile' } })
   ```

7. $ne, $addToSet 查看是否存在，没有则追加

   ```javascript
   db.saber.update({ name: 'caster', 'feature.emoji': { $ne: 'angry' } }, { $push: { 'feature.emoji': 'angry' } })
   db.saber.update({ name: 'caster' }, { $addToSet: { 'feature.emoji': 'sad' } })
   ```

8. $each  批量追加

   ```javascript
   let interest_arr = ['game', 'film', 'football']
   db.saber.update({ name: 'caster' }, { $push: { interest: { $each: interest_arr } } })
   ```

9. $pop  1 表示末尾删除，-1表示开头删除

   ```javascript
   db.saber.update({ name: 'berserker' }, { $pop: { interest: 1 } })
   ```

10. 根据下标修改数组元素

    ```javascript
    db.saber.update({name: 'caster'}, {$set: {'feature.emoji.0': 'laugh' }})
    ```

    

#### 应答式（有返回值）

 1. db.runCommand(object)，参数可用db.listCommands()查看

    ```javascript
    db.saber.update({ name: 'caster' }, { $set: { age: 16 } }, true, true)
    let msg = db.runCommand({ getLastError: 1 })
    printjson(msg)
    ```

    ```json
    msg:
    
    {
        "connectionId" : 75,
        "updatedExisting" : true,
        "n" : 1,
        "syncMillis" : 0,
        "writtenTo" : null,
        "err" : null,
        "ok" : 1
    }
    ```

    2.  findAndModify

     + query：条件
     + findAndModify：修改的集合（表）
     + update：更改的字段
     + sort：排序
     + remove：Boolean，是否删除查找的文档
     + new：Boolean，返回更新前的文档（false）还是更新后的文档（true）
     + fields：返回的字段
     + upsert：找不到则增加

     ```javascript
     let updateObj = {
       findAndModify: 'saber',
       query: { name: 'saber' },
       update: { $set: { master: 'aslkami' } },
       new: true
     }
     let msg = db.runCommand(updateObj)
     printjson(msg)
     ```

     ```
     msg:
     
     {
         "lastErrorObject" : {
             "n" : 1,
             "updatedExisting" : true
         },
         "value" : {
             "_id" : ObjectId("5c405d1b0ae19131d2813071"),
             "name" : "saber",
             "age" : 4,
             "master" : "aslkami"
         },
         "ok" : 1
     }
     ```



### 查找

语法：db.collection.find(condition,  fileds, limit, skip) ，  控制台打==db.collection.find==，可查看完整的函数

- query：这个就是查询条件，MongoDB默认的第一个参数。
- fields：（返回内容）查询出来后显示的结果样式，可以用true和false控制是否显示。
- limit：返回的数量，后边跟数字，控制每次查询返回的结果数量。
- skip:跳过多少个显示，和limit结合可以实现分页。
- sort：排序方式，从小到大排序使用1，从大到小排序使用-1。



filed里的布尔值为是否显示该字段，field里的 _id 默认显示，需要手动隐藏

 1. 普通用法

    ```javascript
    db.saber.find({name: 'caster'}, {_id: false, age: true, feature: true})
    ```

2. $in, $nin 匹配是否在数组里能找到对应的记录（和mysql 的 in/ not in 一致）

   ```javascript
   db.saber.find({ name: { $in: ['saber', 'archer'] } }, { _id: false, name: true, age: true, feature: true })  //查看名字等于saber,archer的记录
   db.saber.find({ name: { $nin: ['saber', 'archer'] } }, { _id: false, name: true, age: true, feature: true }) //查看名字不等于saber,archer的记录
   ```

3. $or 

   ```javascript
   db.saber.find({ $or: [{ name: 'saber' }, { weapon: { $in: ['axe'] } }] }, { _id: false, name: true, age: true, weapon: true }
   ```

 4. $and

    ```javascript
    db.saber.find({ $and: [{ name: 'saber' }, { weapon: { $in: ['sword'] } }] }, { _id: false, name: true, age: true, weapon: true })
    ```

 5. 数组的查询

    ```javascript
    db.saber.find({ hobby: '绝地求生' }, { _id: false, name: true, hobby: true })   //查询到记录，类似于php里的 in_array('绝地求生', ['绝地求生'])
    db.saber.find({ hobby: ['绝地求生'] }, { _id: false, name: true, hobby: true })  //找不到记录，带中括号是完全匹配
    db.saber.find({ hobby: { $all: ['绝地求生', '王者荣耀']} }, { _id: false, name: true, hobby: true }) //匹配2个游戏都玩的人的记录
    db.saber.find({ hobby: { $in: ['音乐', '电影'] } }, { _id: false, name: true, hobby: true }) //匹配听音乐或者看电影的人的记录
    db.saber.find({ hobby: { $size: 7 } }, { _id: false, name: true, hobby: true }) //匹配有7个爱好的人的记录
    db.saber.find({}, { _id: false, name: true, hobby: { $slice: -2 } }) //截取展示爱好数量，-号表示方向，从后面开始截取2个（即截取倒数后2个）
    ```

 6. limit,skip,sort的使用

    ```javascript
    db.saber.find({}, { name: true, weapon: true, age: true }).limit(2).skip(2).sort({ age: 1 }) //表示以年龄排序（1升序，-1降序）选取2条记录之后的下2条记录
    ```

 7. $where  （虽灵活，但是安全性会下降和查询压力会加大）

    ```javascript
    db.saber.find({ $where: "this.age>30" }, { name: true, weapon: true, age: true }) 
    ```

 8. find在js文本中的使用

    ```javascript
    let result = db.saber.find()
        
    // hasNext
    while (result.hasNext()) {
      printjson(result.next())
    }
    
    // forEach
    result.forEach(ele => {
      printjson(ele)
    });
    ```



### 索引

普通索引，复合索引，全文索引

+ 查看索引

  ```javascript
  db.collection.getIndexes()
  ```

+ 创建索引

  ```javascript
  db.collection.ensure({field:1})  //以某字段作为索引
  ```

  ```javascript
  const db = connect('saber')
  
  let startTime = new Date().getTime()
  
  let result = db.random.find({ username: '2rzkr9yj0hp2f' })
  result.forEach(element => {
    printjson(element)
  });
  
  let endTime = new Date().getTime()
  
  print(`${endTime - startTime}ms`)  //800ms左右
  ```

  ```javascript
  const db = connect('saber')
  db.random.ensureIndex({ username: 1 })
  let startTime = new Date().getTime()
  
  let result = db.random.find({ username: '2rzkr9yj0hp2f' })
  result.forEach(element => {
    printjson(element)
  });
  
  let endTime = new Date().getTime()
  
  print(`${endTime - startTime}ms`)  //4ms左右
  ```

  

 + 删除索引

   ```javascript
   db.collection.dropIndex(indexName) //这里不是传key，而是索引名字
   ```

   

索引使用tips：

- 数据不超万条时，不需要使用索引。性能的提升并不明显，而大大增加了内存和硬盘的消耗。
- 查询数据超过表数据量30%时，不要使用索引字段查询。实际证明会比不使用索引更慢，因为它大量检索了索引表和我们原表。
- 数字索引，要比字符串索引快的多，在百万级甚至千万级数据量面前，使用数字索引是个明确的选择。
- 把你经常查询的数据做成一个内嵌数据（对象型的数据），然后集体进行索引。



## 用户管理

1. 数据库用户角色：read、readWrite；
2. 数据库管理角色：dbAdmin、dbOwner、userAdmin;
3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManage；
4. 备份恢复角色：backup、restore；
5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
6. 超级用户角色：root
7. 内部角色：__system

```javascript
db.createUser({
  user: "saber",
  pwd: "123456",
  customData: {
    name: 'saber',
    email: 'saber@163.com',
    age: 18,
  },
  roles: [
    {
      role: "readWrite",
      db: "company"
    },
    'read'
  ]
})
```

```powershell
mongom  -u saber -p 123456 127.0.0.1:27017/admin
```





## 备份与还原

```
mongodump
    --host 127.0.0.1
    --port 27017
    --out D:/databack/backup
    --collection myCollections
    --db test
    --username username
    --password password
```

```
mongorestore
    --host 127.0.0.1
    --port 27017
    --username username
    --password password
    <path to the backup>
```

