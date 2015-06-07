var fs = require('fs');
var BUFFER_SIZE = 1;
function copy(src, dest){
    var readSoFar,fdsrc,fddest,read;
    var buff =  new Buffer(BUFFER_SIZE);
    fdsrc = fs.openSync(src,'r');
    fddest = fs.openSync(dest,'w');
    readSoFar = 0;
    do{
        //fd,buffer,offset,length,position,
        read = fs.readSync(fdsrc,buff,0,BUFFER_SIZE,readSoFar);
        fs.writeSync(fddest,buff,0,read);
        readSoFar += BUFFER_SIZE;
    }while(read>0);
    fs.closeSync(fdsrc);
    fs.closeSync(fddest);
}
copy('./msg2.txt','msg3.xt');
//mover fs.unlinkSync(src);