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
mysql ��ʹ�÷���
 ������һ�㲻��ĵط��ǣ�ʵ��A��ʵ��B�������ӣ���ʼ�����ӳ�poolAB֮��
 ���ʵ��A���ػ����̵������½�������������ʱpoolAB�е��������Ӷ���ʧЧ��
 ����generic-pool����ֻ�Գ�ʱ�����ӽ����˴���
 ����������Ȼû�г�ʱ�����Ѿ�ʧЧ�����Ӳ�û����Ӧ������
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
 ����������������ӳ��������ִ�����Ӿ�����ж��Ƿ�ɶ���д���������ԣ�
 ��֤��������ʧЧ��ɾ�������ӡ���dispense()����������λ�õ��øú���
 ����ʵ�ֶ�ʧЧ���ӵ����١�
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