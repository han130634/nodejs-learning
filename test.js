//����¶������ŵĻ��ȰѴ����Ŵ����   �㲻Ҫ�������
function test(){
    var inner = function(){
        console.log('test');
    }
    return inner;

}
var inner = test();
inner();