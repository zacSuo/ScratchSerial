
// https://zacsuo.github.io/ScratchSerial/armDemo.js

(function(ext) {

    var currentBaud = 115200;
    var currentStatus = 1;

    // 当插件退出时要做的事情
    ext._shutdown = function() {};
 
    // 状态描述，用于提示插件的错误信息，比如不支持浏览器及版本等
    ext._getStatus = function() {
        var tmpResult = {status: 1, msg: '等待连接'};
        
        if(currentStatus == 2)
        {
            tmpResult.status = 2;
            tmpResult.msg = '连接成功';
        }
        
        return tmpResult;
    };

    ext.put_up = function(){        
        $.ajax({
            url:'http://localhost:8800/p',
            data:{
                dt:1
            }
        });
    };

    ext.put_down = function(){     
        $.ajax({
            url:'http://localhost:8800/p',
            data:{
                dt:2
            }
        });
    };

    ext.move_forward = function(){
        $.ajax({
            url:'http://localhost:8800/m',
            data:{
                dt:1
            }
        });
    };

    ext.move_backword = function(){
        $.ajax({
            url:'http://localhost:8800/m',
            data:{
                dt:2
            }
        });
    };

    ext.hand_catch = function(){
        $.ajax({
            url:'http://localhost:8800/h',
            data:{
                dt:1
            }
        });
    };

    ext.hand_free = function(){
        $.ajax({
            url:'http://localhost:8800/h',
            data:{
                dt:2
            }
        });
    };

    ext.send_message = function(msg){
        $.ajax({
            url:'http://localhost:8800/msg',
            data:{
                dt:msg
            }
        });
    };

    ext.check_connection = function(){
    };

    ext.get_last_message = function(callback){
        $.ajax({
            url:'http://localhost:8800/m',
            type: "get", 
            async:false,
            contentType:"text/plain",
            data:{
                dt:24
            },
            success:function(msg){
                currentStatus = 2; 
                // info = msg;
                // callback(info);
            }
        });
    };

    ext.set_baud_rate = function(baudRate){
        return baudRate;
    };

    // 模块描述
    var descriptor = {
        blocks: [
            // 模块类型, 模块名称, 对应方法名称，参数依次对应的默认值
            [' ', '抬 起 ', 'put_up'],
            [' ', '放 下 ', 'put_down'],
            [' ', '向 前 ', 'move_forward'],
            [' ', '向 后 ', 'move_backword'],
            [' ', '抓 住 ', 'hand_catch'],
            [' ', '放 开 ', 'hand_free'],
            [' ', '发送数据 %s ', 'send_message','1'],
            ['b', '连接成功', 'check_connection'],
            ['r', '最新接受数据', 'get_last_message'],
            ['r', "波特率: %m.baudRates", 'set_baud_rate', currentBaud]
        ],
        menus:{
            my_first_menu:['one','two','three'],
            baudRates: [2400, 9600, 19200, 38400, 57600, 115200]
        },
        url:'https://github.com/zacSuo/ScratchSerial',
        displayName: '机械臂功能测试'
    };
 
    // 注册扩展插件
    ScratchExtensions.register('机械臂小游戏', descriptor, ext);
})({});