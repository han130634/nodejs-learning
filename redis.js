/*
使用示例
 https://cnodejs.org/topic/5200755c44e76d216a1620df
 */

//redis API：http://redis.readthedocs.org/cn/latest/index.html
var redis = require('redis');
var client = redis.createClient(6379,'127.0.0.1');
// redis 链接错误
client.on("error", function(error) {
    console.log(error);
});
// redis 验证 (reids.conf未开启验证，此项可不需要)
//client.auth("foobared");
/*client.select('0',function(err){
    if(err){
        console.log(err);
    }else{
        var person = {}
        person.name = 'tom';
        person.age = '20';
        //console.log(person);return;
        client.hmset('person_102',person,function(err,res){
            if(err){
                console.log(err);
            }else{
                console.log(res+'xxxxxxx');
            }

        });
    }
});*/
// hmget
client.hgetall('person_102', function(err, res){
    if(err) {
        console.log(error);
    } else {
        console.log('name:'+res['name']+';age:'+res['age']);
    }
});
client.select('0', function(error){
    if(error) {
        console.log(error);
    } else {
        // hmget
        //client.hmget('person_101', ['name','age'], function(error, res){
        //client.hmget('person_101','name', function(error, res){
        client.hmget(['person_101','name','age'], function(error, res){
            if(error) {
                console.log(error);
            } else {
                console.log(res.toString());
            }

            // 关闭链接
            client.end();
        });
    }
});

//client.end();
/*
client.set('person_100','name tom age 100',function(){
    console.log(arguments);
    client.get('person_100 name',function(){
        console.log(arguments[1]);
    });
});
*/
/*
client.get('name',function(){
    console.log(arguments);
});*/
