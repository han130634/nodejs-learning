var http = require('http');
var url = require('url');
var mysql = require('mysql');

/*var pool  = mysql.createPool({
    host     : '127.0.0.1',
    user     : '',
    password : '',
    database: "test_db"
});*/

pool = mysql.createPool({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database: "test"
});

exports.do = function (sql, callback){
    this.getConnection(function (err, connection){
        connection.query(sql, function (){
            callback.apply(connection, arguments);
            connection.release();
        });
    })
}.bind(pool);


function getUser(conn, id, callback) {
    conn.query("SELECT * FROM test_users WHERE ?", { id: id }, callback);
}

http.createServer(function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    //console.log(url_parts+'---'+query);
    pool.getConnection(function(err, conn) {
        if(!err) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            if(query.id) {
                if(query.name) {
                    getUser(conn, query.id, function(err, results) {
                        if(results.length === 0) {
                            conn.query("INSERT INTO test_users SET ?", { id: query.id, name: query.name }, function(err, result) {
                                if(!err) {
                                    res.end("Successful insertion!");
                                }
                                else {
                                    res.end("There was an error with MySQL.");
                                }
                            });
                        }
                        else {
                            conn.query("UPDATE test_users SET name = ? WHERE id = ?", [query.name, query.id], function(err, result) {
                                if(!err) {
                                    res.end("Successful update!");
                                }
                                else {
                                    res.end("There was an error with MySQL.");
                                }
                            });
                        }
                    });
                }
                else {
                    getUser(conn, query.id, function(err, result) {
                        if(!err) {
                            res.end(result[0].name);
                        }
                        else {
                            res.end("There was an error with MySQL.");
                        }
                    });
                }
            }
            else {
                res.end("Hello, world!");
            }
        }
    });

}).listen(8080);
