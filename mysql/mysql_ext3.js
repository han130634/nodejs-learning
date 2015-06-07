var mysql = require('mysql');
var conn = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    charset:'utf8',
    database:'test'
});
var id=1,username='dd1231\' or 1=1 or 1=\'';
var sql = 'select * from test_users where id='+conn.escape(id)+' and name='+conn.escape(username)+' ';

conn.query(sql,function(err,rows,fields){
    //console.log(arguments);
    console.log(rows);
    //conn.destroy();
});
var queryUser = 'select * from test_users where id=?';
conn.query(queryUser,['1'],function(err,rows,fields){
    console.log(rows);
});
var queryUser = 'select ?? from test_users where id=?';
conn.query(queryUser,[['id','name'],'1'],function(err,rows,fields){
    console.log(rows);
});

var sql = mysql.format(queryUser,['id','name','1']);
console.log(sql);
