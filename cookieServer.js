var http = require('http');
var util = require('util');
var querystring = require('querystring');
http.createServer(function(req,res){
    console.log(req);
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    if('/favicon.ico' == pathname){
        res.writeHead(404);
        res.end(http.STATUS_CODES[404])
    }else if('/write' == pathname){
        res.writeHead(200,{
            "Content-type":"text/html",
            "Set-Cookie":["name=ffff;max-age:300","age=5"]
        });
        res.end('ok');
    }else if('/read' == pathname){
        var cookie = req.headers.cookie;
        var cookieObj = querystring.parse(cookie,'; ','=');
        var cookieJson = JSON.stringify(cookieObj);
        res.end(cookieObj);
    }
}).listen(8080);



















