
(function(ext) {

    var currentBaud = 115200; 

    // 当插件退出时要做的事情
    ext._shutdown = function() {};
 
    // 状态描述，用于提示插件的错误信息，比如不支持浏览器及版本等
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
 
    // 功能实现
    ext.my_first_block = function() {
        // 当模块运行时要执行的功能
    };

    ext.set_baud_rate = function(baudRate){
        return baudRate;
    };

    // 模块描述
    var descriptor = {
        blocks: [
            // 模块类型, 模块名称, 对应方法名称，参数依次对应的默认值
            [' ', '抬起', 'put_up'],
            [' ', '放下', 'put_down'],
            [' ', '向前', 'move_forward'],
            [' ', '向后', 'move_backword'],
            [' ', '抓住', 'hand_catch'],
            [' ', '放开', 'hand_free'],
            [' ', '发送数据', 'send_message'],
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
