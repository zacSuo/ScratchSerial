var SerialPort = require('SerialPort');
var url = require('url')

var serialPort = new SerialPort("COM3", {
  baudRate: 115200
});

function write2Serial(data){
    serialPort.write(data);
}

function decodeMsg(reqUrl)
{
    var buff = [0xFE,0x05,0x93,0xCF,0x7D,0x5A,0x00,0xFF];
    var urlInfo = url.parse(reqUrl,true);
    var urlPath = urlInfo.pathname;
    var intValue = urlInfo.query.dt;
    switch (urlPath)
    {
        case '/p':
        if(intValue == 1){
            buff[6] = 0xA2
        }else{
            buff[6] = 0xA3
        }
        break;
        case '/m':
        if(intValue == 1){
            buff[6] = 0xA4
        }else{
            buff[6] = 0xA5
        }
        break;
        case '/h':
        if(intValue == 1){
            buff[6] = 0xA6
        }else{
            buff[6] = 0xA7
        }
        break;
        case '/msg':
        var msgLen = intValue.length;
        
        buff = [0xFE,0x04 + msgLen,0x93,0xCF,0x7D,0x5A];

        for (var i = 0; i < msgLen; i++) {
            var s = intValue.substr(i, 1);
            var v = parseInt(s, 16);
            buff.push(v);
        }
        buff.push(0xFF);
        break;
        default:break;
    }
    return buff;
}


var server = require("http")
server.createServer(function(req,res){
    var buffSend = decodeMsg(req.url)
    write2Serial(buffSend)
    res.writeHead(200,{"Content-type":"text/plain"});
    res.write("hello");
    res.end();
}).listen(8800)