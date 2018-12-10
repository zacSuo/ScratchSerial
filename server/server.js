var server = require("http")
server.createServer(function(req,res){
    console.log(req.url)
    res.writeHead(200,{"Content-type":"text/plain"});
    res.write("hello");
    res.end();
}).listen(8800)