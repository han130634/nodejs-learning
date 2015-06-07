var redis = require('redis');
var pool =  require('generic-pool');
var p = pool.Pool({
    name:'redisPool',
    create:function(callback){
        var client = redis.createClient();
        callback(null,client);
    },
    destroy:function(client){
        client.end();
    },
    min:5,
    max:100,
    idleTimeoutMills:3000,
    log:true

});
p.acquire(function(err,client){
    client.hgetall('person_102', function(err, res){
        if(err) {
            console.log(error);
        } else {
            console.log('name:'+res['name']+';age:'+res['age']);
        }
        client.end();
    });
});
/*
mysql 的使用方法
 但是有一点不足的地方是，实例A和实例B建立链接，初始化连接池poolAB之后，
 如果实例A在守护进程的作用下进行了重启，此时poolAB中的所有连接都会失效，
 但是generic-pool本身只对超时的连接进行了处理，
 对于这种虽然没有超时但是已经失效的连接并没有相应操作。
 */
//http://blog.csdn.net/zenghuaidong/article/details/7428808
function removeNotWritable() {
    var toKeep = [],
        i,
        al;
    // Go through the available (idle) items,
    // check if they are not writeable
    for (i = 0, al = availableObjects.length; i < al; i += 1) {
        if (availableObjects[i]["obj"]["writable"] != false &&  availableObjects[i]["obj"]["readable"] != false ) {
            // Client is writeable, so keep it.
            toKeep.push(availableObjects[i]);
        } else {
            // The client is not writeable, call it's destroyer.
            //      log("removeIdle() destroying obj - now:" + now + "not writeable");
            me.destroy(availableObjects[i].obj);
        }
    }

    // Replace the available items with the ones to keep.
    availableObjects = toKeep;
    al = availableObjects.length;
}
/*
 这个函数遍历了连接池中所有现存的连接句柄，判断是否可读可写，若不可以，
 则证明该连接失效，删除此连接。在dispense()函数的如下位置调用该函数
 即可实现对失效连接的销毁。
 function dispense() {
 ......
 if (waitingCount > 0) {
 removeNotWritable();
 if (availableObjects.length > 0) {
 */
/*http://www.yunjuu.com/info/46235.html
http://runnable.com/Ui3kJlcMrW0hAABL/connection-pools-in-node-mysql-for-node-js
https://cnodejs.org/topic/516b77e86d382773064266df
*/