/**
 * Kue Monitor
 * http://www.xuebuyuan.com/2066320.html
 */
var kue = require('kue')
var redis = require('redis');
var jf = require("jsonfile")
var path = require("path")

/*
 * get user home dir
 */
function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

/**
 * set redis credentials .
 * Priority :
 * 1 VCAP_SERVICES
 * 2 user.home/.redis-server.json
 * 3 config/redis-server.json
 * 4 default as local:6379 , no password
 */
function getCredentials(callback){
    if (process.env.VCAP_SERVICES) {
        var env = JSON.parse(process.env.VCAP_SERVICES);
        return env['redis-2.6'][0].credentials;
    } else {
        jf.readFile(path.join(getUserHome(),".redis-server.json"),
            function(err,data){
                console.log("read local redis json file")
                if(err){
                    jf.readFile("./config/redis-server.json", function(err,data){
                        if(err){
                            var credentials = {}
                            credentials.host="127.0.0.1"
                            credentials.port=6379
                            credentials.password=''
                            callback(credentials)
                        }else{
                            callback(data["redis-2.6"][0]["credentials"])
                        }
                    })
                }else{
                    callback(data["redis-2.6"][0]["credentials"])
                }
            }) };
}
/**
 * create que client
 */
function init(){
    getCredentials(function(credentials){
        console.log("redis server ...")
        console.log(credentials)
        kue.redis.createClient = function() {
            console.log("host:"+ credentials.host)
            console.log("port:"+ credentials.port)
            console.log("password:"+ credentials.password)
            var client = redis.createClient(credentials.port, credentials.host);
            if (credentials.password != '') {
                client.auth(credentials.password);
            }
            return client;
        }
        mountUI()
    })
}

function mountUI(){
    kue.app.set('title', 'Redis Que Monitor');
    console.log("Monitor Service @ 3030 is started.")
    kue.app.listen(3030)
}
init()