var fs = require('fs');
var EventEmiter = require('events').EventEmitter;
var util = require('util');
var RETURN = 0x0d; //ascii \r 0d=13 回车  return  移动光标到该行的起始位置
var NEWLINE = 0x0a; //ascii \n a=10 换行 换行移动至下一行的起始位置
/*var fileName = './access.log';
fs.open(fileName,'r',function(err, fd){
    if(err){
        console.log(err);
        return;
    }
    this._rs = fd;
    console.log(fd);return;
});*/

function LineReader(fileName) {
    //console.log(fileName);return;
    var fd1;
    fd1 = fs.open(fileName,'r',function(err, fd){
        if(err){
            console.log(err);
            return;
        }

    });
    this._rs = fd1;
}
util.inherits(LineReader,EventEmiter);
LineReader.prototype.on('newListener', function (event, func) {
    if (event == 'newLine') {
        var self = this;
        var line = [];
        var ch;
        var fd;
        var buf = new Buffer(1);
        var i=0;
        var fileName = './access.log';
        fs.open(fileName,'r',function(err, fd) {
                if (err) {
                    console.log(err);
                    return;
                }
                fs.read(fd, buf, 0, 1,null, function(err, bytesRead, buffer){
                    if(err){
                        console.log(err);
                        self.emit('newLine', Buffer.concat(line).toString());
                        self.emit('end');
                    }
                    ch = buffer;
                    i += buffer.bytesRead;

                    while(null != ch){
                        console.log(ch.toString());
                        var buf = new Buffer(1);
                        if (ch[0] == RETURN) {
                            console.log(ch.toString());
                            return;
                            fs.read(fd, buf, i, 1,null, function(err, bytesRead, buffer){
                                if(err){
                                    console.log(err);
                                    return;
                                }
                                i += buffer.bytesRead;
                            });
                            self.emit('newLine', Buffer.concat(line).toString());
                            line = [];
                        } else {
                            line.push(ch);
                            fs.read(fd, buf, i, 1,null, function(err, bytesRead, buffer){
                                if(err){
                                    console.log(err);
                                    return;
                                }
                                i += buffer.bytesRead;
                                ch = buffer;
                                console.log(this._rs)
                                return;
                            });
return;
                        }
                    }
                });
            }
        );


    }
});
var reader = new LineReader('./access.log');
reader.on('newLine', function (data) {
    console.log(data);
});
reader.on('end', function () {
    console.log('end');
});



/*

var fileName = './access.log';
fs.open(fileName,'r',function(err, fd){
    if(err){
        console.log(err);
        return;
    }
    var ch;
    while(null != ch){
        var buf = new Buffer(8);
        fs.read(fd, buf, 0, 8,null, function(err, bytesRead, buffer){
            if(err){
                console.log(err);
                return;
            }
            console.log('bytesRead' + bytesRead);
            console.log(buffer.toString());
        });
    }

});*/
