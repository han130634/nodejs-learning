var fs = require('fs')
var liner = require('./liner')
var source = fs.createReadStream('./access.log')
source.pipe(liner)
liner.on('readable', function () {
    var line
    while (line = liner.read()) {
        // do something with line
        console.log(line);
        var startTime =new Date().getTime();
        while(new Date().getTime()< startTime + 1000);
    }
})