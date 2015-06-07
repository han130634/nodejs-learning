/**
 * ����URLʵ��session
 */
var http = require('http');
var url = require('url');
var fs = require('fs');
var sign = require('./crypt_tmp/crypt_module.js');
var SESSION_KEY = 'zfkey';
var SESSION_SAFE_KEY = 'safe_key';
var sessions = {};
var EXPIRE_TIME = 5*1000;//Ĭ�Ϲ���ʱ��
function newSession(req){
    var now = new Date().getTime();
    var sessionObj = {mny:100,expTime:new Date(now+EXPIRE_TIME)};
    var sessionId = now + "_" + Math.random();//����һ��Ψһ���ظ���sessionID
    sessionId = sign(sessionId,SESSION_SAFE_KEY,getClientIp(req),req.headers['user-agent']);
    sessions[sessionId] = sessionObj;//Ȼ���sessionid��session����Ķ�Ӧ�����˷�������
    return sessionId;
}
function changeTo(url,res){
    res.writeHead(302,{'Location':url});
    //statusCode = 302
    res.end();
}
function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};
var app = http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    req.query = urlObj.query;
    var sessionId = req.query[SESSION_KEY];
    if(req.url == '/favicon.ico'){
        res.writeHead(404);
        res.end(http.STATUS_CODES[404])
    }
    //console.log(req.url+'---'+sessionId);
    //console.log(req.headers['user-agent']);
    //console.log(getClientIp(req));
    if(!sessionId){//���sessionID������
        var sessionId = newSession(req);
        console.log(sessionId);
        //�õ����ǵ�URL url.format()
        urlObj['search']=SESSION_KEY+'='+sessionId;
        var newUrl = url.format(urlObj);
        //var newUrl = url.resolve(req.url,SESSION_KEY+'='+sessionId);
        //console.log(newUrl);
        changeTo(newUrl,res);
    }else{
        var sessionObj = sessions[sessionId];
        if(sessionObj){
            if(sessionObj['expTime']>=new Date()){
                console.log('can use it.'+new Date()+'--'+sessionObj['expTime']);
                res.end('can use it now.');
            }else{
                console.log('not used time expired '+new Date()+'--'+sessionObj['expTime']);
                console.log('please delete the '+SESSION_KEY+'param from the url and fresh it.');
                res.end('please delete the '+SESSION_KEY+'param from the url and fresh it.');
            }
        }else{
            //console.log(sessions);
            res.end('the sessionId not used.');
        }
    }
}).listen(8080);

/**
 * 1.ʵ��URL��session
 * 2.ʵ�ּ���
 **/