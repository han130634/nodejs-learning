var fs = require('fs');

fs.open('./msg2.txt','w',438,function(err,fd){
    console.log(fd);
    fs.write(fd,new Buffer('虎妈猫爸'),0,6,0,function(err,bytesWritten,buffer){
        //console.log('成功写入了'+bytesWritten+'字节');
        fs.write(fd,new Buffer('虎妈猫爸'),6,6,6,function(err,bytesWritten,buffer){
            console.log('成功写入了'+bytesWritten+'字节');
        });
    });
});