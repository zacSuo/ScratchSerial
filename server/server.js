var server = require("http")
server.createServer(function(req,res){
    res.writeHead(200,{"Content-type":"text/plain"});
    res.write("hello");
    res.end();
}).listen(8800)