var fs = require('fs');
//var process = require('process');
var systemPath = require('path');
/*
makeDir('test\\test1');
function makeDir(path,mode){
    if(mode ==undefined){
        mode =0777 & (-process.unmask);//0755
        var parts = path.split(systemPath.sep);//win \ linux /
        for(var i=0;i<parts.length;i++){// ./a/b/c
            var sa = parts.slice(0,i+1).join(systemPath.sep);
            if(fs.existsSync(sa)){
                var st;
                if(st = fs.statSync(sa)){
                    if(!st.isDirectory()){
                        throw new Error('路径存在但不是文件夹');
                    }
                }
            }else{
                break;
            }
        }
        for(var i=0;i<parts.length;i++){
            var build = parts.slice(0,i+1).join(systemPath.sep);
            fs.mkdirSync(build,mode);
        }
    }
}
*/
var flag = true;
function removeDir(path){
    var parts = path.split(systemPath.sep);//win \ linux /
    var sa = parts.join(systemPath.sep);
    if(fs.existsSync(sa)){
        var st;
        if(st = fs.statSync(sa)){
            if(!st.isDirectory()){
                fs.unlinkSync(sa);
                console.log('成功删除文件:'+sa);
            }else{
                var tmpDir = fs.readdirSync(sa);
                if(tmpDir.length>0){
                    for(var j=0;j<tmpDir.length;j++){
                        //console.log(sa+systemPath.sep+tmpDir[j]+'--'+tmpDir.length);
                        flag = flag && removeDir(sa+systemPath.sep+tmpDir[j]);
                    }
                    if(flag == true){
                        fs.rmdirSync(sa);
                        console.log('成功删除目录:'+sa);
                    }else{
                        console.log('未成功删除含有子空目录的目录:'+sa);
                    }

                }else{
                    //fs.rmdirSync(sa);
                    console.log('不删除空目录'+sa);
                    flag = false;
                }
            }

        }else{
            console.log('stat exception');
        }
    }else{
        console.log('不是有效的路径');
    }
    return flag;
}

removeDir('test\\test1\\test2');