/*node.js��ʱ����node-schedule��ʹ��
��װ npm install node-schedule
 http://www.zhanxin.info/nodejs/2013-11-04-nodejs-practical-study-notes.html
 http://www.robanlee.com/p/1
 https://github.com/robanlee123/RobCron
ʹ�÷���

1��ȷ��ʱ��

���磺2014��2��14�գ�15:40ִ��*/

var schedule = require("node-schedule");

var date = new Date(2014,2,14,15,40,0);

var j = schedule.scheduleJob(date, function(){

    console.log("ִ������");

});

//ȡ������

//j.cancel();

/*2��ÿСʱ�Ĺ̶�ʱ��

���磺ÿСʱ��40����ִ��*/

/*var rule = new schedule.RecurrenceRule();

rule.minute = 40;

var j = schedule.scheduleJob(rule, function(){

    console.log("ִ������");

});*/
/*
3��һ�������е�ĳЩ���ĳ��ʱ��ִ�У�

���磺��һ�����յ�20��ִ��*/

var rule = new schedule.RecurrenceRule();

/*
rule.dayOfWeek = [0, new schedule.Range(1, 6)];

rule.hour = 20;

rule.minute = 0;

var j = schedule.scheduleJob(rule, function(){

    console.log("ִ������");

});
*/

//4��ÿ��ִ��

var rule = new schedule.RecurrenceRule();

var times = [];

for(var i=1; i<60; i++){

    times.push(i);

}

rule.second = times;

var c=0;
var j = schedule.scheduleJob(rule, function(){
    c++;
    console.log(c);
});

 