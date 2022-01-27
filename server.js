//加载模块
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path')
 


var server = http.createServer(function(req, res){
    
    //1.__dirname是全局变量,可以直接获取。表示当前执行脚本所在的目录。
    var staticPath = path.join(__dirname,'docs');    //path.join方法，拼接目录地址
    //2.staticPath拼接后的目录地址，为了跳到自己项目所在那个目录。
 
    //3.req.url请求的链接（这里输出的是/index.html）
    var pathObj = url.parse(req.url, true);         //url.parse方法，解析请求的url，解决链接"\"和"/"的差异问题。
    //4.解析后的req.url是个对象。
    
    //5.从解析后的对象中获取到pathname(这里pathObj.pathname是/index.html)
    var filePath = path.join(staticPath, pathObj.pathname);   //path.join方法，拼接完整项目目录地址。
    //6.fileContent拼接后的项目目录名字（这里是E:\subject\act\index.html）
            
    //fs.readFileSync方法，同步读取文件信息                                                          
    var fileContent = fs.readFileSync(filePath,'binary');     //读取拼接完整后的目录中的文件， 'binary'表示二进制方式读取   
    
    res.write(fileContent,'binary');
    res.end();  

     // 注意:因为是同步请求,这个地方会出现一个问题，当文件没获取完，我们就打开网址的话，服务器就会报错、崩溃
     // 推荐使用异步

       //异步读取文件数据
    fs.readFile(filePath,'binary',function(err,fileContent){
        if(err){    //如果报错，显示404，不会导致服务器崩溃了。
            res.writeHead(404,"Not Found");
            res.end('<h1>404 Not Found!</h1>')  
        }else{
            res.writeHead(200,'ok');
            res.write(fileContent,'binary');
            res.end();  
        }
    });

 
server.listen(8888);


console.log('服务器已打开, 可以运行 http://localhost:8888');