//如果怕丢掉括号的话先把大括号打出来   你不要动我鼠标
function test(){
    var inner = function(){
        console.log('test');
    }
    return inner;

}
var inner = test();
inner();