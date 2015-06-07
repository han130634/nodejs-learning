var mysql = require('mysql');
var conn = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    charset:'utf8',
    database:'test'
});

conn.query('select * from test_users',function(err,rows,fields){
    //console.log(arguments);
    console.log(rows[0].id,rows[0].name);
    conn.destroy();
});

