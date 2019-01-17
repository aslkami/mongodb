const db = connect('saber') 
db.saber.drop()
load('./mongo2.js')