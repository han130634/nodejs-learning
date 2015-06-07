/**
 * 如何从提定的位置读文件
 * fs.open
 * path 路径
 * flags 打开文件的模式 w r a
 * mode 文件模式
 * callback 打开之后的回调函数
 *  err 错误 对象，读取错误时触发的对象
 *  fd 整数值 代表打开文件的索引。
 *  open返回的一定是最小未用的索引
 *  0 stdin 标准输入
 *  1 标准输出
 *  2 错误输出
 *
 */

var fs = require('fs');
fs.open('./msg.txt','r',function(err,fd){
    //console.log(fd);
});

/**
 读取文件fs.read
 fd 文件描述符
 buffer 读到哪个缓存区内
 offset 向缓存区中写入的数据的起始位置
 length 从文件中读取到的字节
 position 文件中读取的开始位置
 callback
 err 错误对象
 bytesRead 表示实际读取到的字节数
 buffer 就是读取到的缓存区对象
 */
/*fs.open('./msg.txt','r',function(err,fd){
    var buff = new Buffer(6);
    fs.read(fd,buff,0,6,3,function(err,bytesRead,buffer){
        console.log(bytesRead);
        console.log(buff);
        console.log(buff.toString());
        console.log(buff === buffer);
    });
});*/
/**
 * 可以读取多次
 */
fs.open('./msg.txt','r',function(err,fd){
    var buff = new Buffer(12);
    fs.read(fd,buff,0,6,0,function(err,bytesRead,buffer){
        console.log(buff.toString());
        fs.read(fd,buff,0,6,6,function(err,bytesRead,buffer){
            console.log(buff.toString());
        });
    });
});