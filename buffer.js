/**
 * Created by han130634 on 2015/5/24.
 */
//���ƻ���
//Buffer.copy();
//target ���Ƶ�Ŀ�����
//target_start ��Ŀ���︴��ʱ����ʼλ��
//start Դbuffer��ȡʱ����ʼλ��
//end  Դbuffer��ȡʱ�Ľ���λ��
var srcBuf = new Buffer([4,5,6]);
var tarBuf = new Buffer(6);
tarBuf[0] = 1;
tarBuf[1] = 2;
tarBuf[2] = 3;
srcBuf.copy(tarBuf,3,0,3);
console.log(tarBuf);//123456


var buf1 = new Buffer([0x31,0x32,0x33,0x34,0x35,0x36,
    0x37]);
var buf2 = new Buffer([0x38,0x39,0x30,0x31,0x32]);
console.log(buf1.toString());
console.log(buf2.toString());
//1.�ȴ洢��ϲ�
function concat(arr,length){
    var totalBuf = new Buffer(length);
    var index =0;
    for(var i=0;i<arr.length;i++){
        arr[i].copy(totalBuf,index,0,arr[i].length);
        index += arr[i].length;
    }
    return totalBuf;
}
console.log(concat([buf1,buf2],
    buf1.length+buf2.length).toString());