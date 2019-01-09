mongod --help

port | logpath | dbpath
端口 | 日志路径 | 数据存储路径

mongod --install --dbpath --logpath

netstat -an

集合： 相当于mysql 表
文档： 相当于MySQL 表里的记录

show dbs                               展示数据库 
db                                     展示当前使用数据库
db.集合.insert({})                     插入数据
db.集合.find/findOne()                 查询  所有/第一条 数据
db.集合.drop()                         删除集合
db.dropDatabase()                      删除数据库
db.集合.remove(false)                  删除所有文档
db.集合.update({条件}, {新的文档}})     更改文档（整个文档都改）
db.集合.update({条件}, {'$set':{内容}}) 更新特定字段
db.集合.find({条件}},{'字段':1})        显示所有文档，但是只显示该字段，0的话 是除该字段以外的字段都显示
db.集合.find().sort({'字段': 1})        排序，1升序  -1 降序
db.集合.find().skip(2).limit(3)         跨过2条记录，选取3条
db.集合.count()                         返回文档数量
db.addUser('用户名', '密码', '布尔值')   第三个参数默认为false，表示是否只读，false则为有修改权限



db.createUser(user, writeConcern)
    user这个文档创建关于用户的身份认证和访问信息；
    writeConcern这个文档描述保证MongoDB提供写操作的成功报告。

· user文档，定义了用户的以下形式：
{ user: "<name>",
  pwd: "<cleartext password>",
  customData: { <any information> },
  roles: [
    { role: "<role>", db: "<database>" } | "<role>",
    ...
  ]
}

user文档字段介绍：
    user字段，为新用户的名字；
    pwd字段，用户的密码；
    cusomData字段，为任意内容，例如可以为用户全名介绍；
    roles字段，指定用户的角色，可以用一个空数组给新用户设定空角色；
    在roles字段,可以指定内置角色和用户定义的角色。

    Built-In Roles（内置角色）：
    1. 数据库用户角色：read、readWrite;
    2. 数据库管理角色：dbAdmin、dbOwner、userAdmin；
    3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
    4. 备份恢复角色：backup、restore；
    5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
    6. 超级用户角色：root  
    // 这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）
    7. 内部角色：__system
    PS：关于每个角色所拥有的操作权限可以点击上面的内置角色链接查看详情。

· writeConcern文档（官方说明）
    w选项：允许的值分别是 1、0、大于1的值、"majority"、<tag set>；
    j选项：确保mongod实例写数据到磁盘上的journal（日志），这可以确保mongd以外关闭不会丢失数据。设置true启用。
    wtimeout：指定一个时间限制,以毫秒为单位。wtimeout只适用于w值大于1。

例如：在products数据库创建用户accountAdmin01，并给该用户admin数据库上clusterAdmin和readAnyDatabase的角色，products数据库上readWrite角色。
use products
db.createUser( 
    { 
        "user" : "accountAdmin01",
        "pwd": "cleartext password",
        "customData" : { employeeId: 12345 },
        "roles" : [ 
            { role: "clusterAdmin", db: "admin" },
            { role: "readAnyDatabase", db: "admin" },"readWrite"
        ] 
    },
    { w: "majority" , wtimeout: 5000 } 
)

验证：
mongo -u accountAdmin01 -p yourpassward --authenticationDatabase products









db.fate.insert({'name' : 'saber', 'age': 18, 'weapon':'sword'})
db.fate.insert({'name' : 'archer', 'age': 18, 'weapon':'arrow'})
db.fate.insert({'name' : 'berserker', 'age': 18, 'weapon':'axe'})
db.fate.insert({'_id': 100, 'name' : 'rider', 'age': 18, 'weapon':'horse'})

for(i = 1; i<= 10; i++){
    db.fate.insert({'_id': i, 'name' : 'saber' + i, 'age': 18, 'weapon':'sword'})
}

db.fate.remove({'_id': 5})
db.fate.remove({'_id': {'$lt': 3}})


db.fate.update({'_id': 6}, {'$set':{'age': 20, 'weapon': 'ball'}})
db.fate.update({'_id': 8}, {'$inc':{'age': 20}})

db.createUser(
    {
        'user': 'root',
        'pwd' : '123456',
        'customData' : {
            'info' : 'administrator'
        },
        'roles': [
            {
                'role': 'userAdmin',
                'db' : 'userAdminAnyDatabase'
            },
            {
                'role': 'dbAdmin',
                'db' : 'dbAdminAnyDatabase'
            }, 
            "readWrite"
        ]
    },
    { w: "majority" , wtimeout: 5000 } 
)


db.createUser(
    {
        'user': 'saber',
        'pwd' : '123456',
        'customData' : {
            'info' : 'user'
        },
        'roles': [
            {
                'role': 'userAdmin',
                'db' : 'readAnyDatabase'
            },
            "read"
        ]
    },
    { w: "majority" , wtimeout: 5000 } 
)

mongo.exe -u saber -p 123456  -authenticationDatabase fate



db.createUser(
  {
    user : 'root',
    pwd : '123456' ,
    roles : [{'role' : 'userAdminAnyDatabase', 'db':'admin'  }] 
  } 
)

db.createUser(
    {
        user: "admin",
        pwd: "123456",
        roles: [{ role: "readWrite", db: "fate" }]
    }
)

db.createUser(
    {
        user: "saber",
        pwd: "123456",
        roles: [{ role: "read", db: "fate" }]
    }
)

mongo 127.0.0.1/fate -usaber -p123456