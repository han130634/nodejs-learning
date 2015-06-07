/**
 * HTTP hypertext transfer protocal
 * 1xx  信息响应，标示接收到请求并继续
 * 2xx  处理成功响应标示动作被接受，理解和处理
 * 3xx  重定向为了完成响应，要求客户端进行进一步处理
 * 4xx  客户端错误 客户端语法错误活请求错误
 * 5xx  服务器错误 服务器不能正常处理
 *
 * @type {*}
 */
var http = require('http');
//流对象 req 读取流对象IncoingMessage
// res 写流对象 ServerResponse
/*var server = htp.createServer(function(req,res){
    res.end('hello');

});*/

var booklist = {
    1: {id: 1, name: 'node'},
    2: {id: 2, name: 'js'},
    3: {id: 3, name: 'nodejs'}
}
var server = http.createServer();
//请求 / 返回所有的书籍列表
// 请求 /book?id=? 返回对应的书籍信息
server.on('request',function(req,res){
    /*res.setHeader('test','test');
    res.statusCode = 404;
    res.end('hello');*/
    var url = req.url;
    //var rlt = '';
    //rlt = url.replace(/book?id=/g,'');
    //console.log(url.replace(/\/book\?/g,'').length);

    if(url == '/'){//返回所有的书籍
        var result = '';
        for(var attr in booklist){
            result += (booklist[attr].name)+",";
        }
        res.end(result);
    }else if(url== "/favicon.co"){//url.indexOf('/book?id=')>=0
        console.log('图片');
        res.end();
    }else if(url.replace(/\/book\?/g,'').length != url.length){
        var result = '';
        var arr = url.replace(/\/book\?/g,'').split("&");
        for(var attr in arr){
            if(arr[attr].replace(/=/g,'').length != arr[attr].length){
                console.log(arr[attr].substring(0,arr[attr].indexOf('=')));
                var tmpParam = arr[attr].substring(0,arr[attr].indexOf('='));
                var tmpData = arr[attr].substring(arr[attr].indexOf('=')+1);
                for(var attr in booklist){
                    if(tmpParam=='id' && booklist[tmpData] != 'undefined'){
                        result += (booklist[attr].name)+",";
                    }else if(tmpParam=='name' && booklist[attr] == tmpData){
                        result += (booklist[attr].name)+",";
                    }
                }

            }

        }
        res.end(result);
    }else{
        res.statusCode = 404;
    }
});
server.on('connection',function(socket){
    socket.on('close',function(){
        console.log('客户端已断开');
    });
    console.log('一个新的链接建立了');
});
server.on('close',function(){
    console.log('服务器关闭了');
});
server.on('error',function(err){
   console.log(err);
})
server.setTimeout(30000,function(){
    console.log('链接已超时');
});
server.listen(8080);