var crypto = require('crypto');
function sign(val,key,ip,agent){
    return val + "|" +
        crypto.createHmac('sha256',key+ip+agent).update(val)
            .digest('base64');

}

//var result  = sign('sessionId','456','127.0.0.1','chrome');
//console.log(result);
module.exports = sign;