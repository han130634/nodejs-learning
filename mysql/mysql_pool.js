var mysql = require('mysql');
var pool = mysql.createPool({
    host:'localhost',
    user:'root'
});

pool.getConnection(function(err,conn){
    conn.query('select * from test.test_users', function(err,rows){
        console.log(rows);
        conn.release();
        //pool.destroy();
    });
});
//pool.destroy();