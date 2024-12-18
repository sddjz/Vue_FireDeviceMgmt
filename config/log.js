var path = require('path');

//日志根目录
var baseLogPath = path.resolve(__dirname, '../logs')

//错误日志目录
var errorPath = "/error";
//错误日志文件名
var errorFileName = "error";
//错误日志输出完整路径
var errorLogPath = baseLogPath + errorPath + "/" + errorFileName;
//var errorLogPath = path.resolve(__dirname, "../logs/error/error");

//响应日志目录
var responsePath = "/response";
//响应日志文件名
var responseFileName = "response";
//响应日志输出完整路径
var responseLogPath = baseLogPath + responsePath + "/" + responseFileName;
//var responseLogPath = path.resolve(__dirname, "../logs/response/response");

//响应日志目录
var infoPath = "/info";
//响应日志文件名
var infoFileName = "info";
//响应日志输出完整路径
var infoLogPath = baseLogPath + infoPath + "/" + infoFileName;
module.exports = {
　　//日志格式等设置
    appenders:
    {
        "rule-console": {"type": "console"},
        "errorLogger": {
            "type": "dateFile",
            "filename": errorLogPath,
            "pattern": "-yyyy-MM-dd.log",
            "alwaysIncludePattern": true,
            "encoding":"utf-8",
            "maxLogSize": 1000,
            "numBackups": 3,
            "path":errorPath
        },
        "resLogger": {
            "type": "dateFile",
            "filename": responseLogPath,
            "pattern": "-yyyy-MM-dd.log",
            "alwaysIncludePattern": true,
            "encoding":"utf-8",
            "maxLogSize": 1000,
            "numBackups": 3,
            "path":responsePath
        },
        "infoLogger": {
            "type": "dateFile",
            "filename": infoLogPath,
            "pattern": "-yyyy-MM-dd.log",
            "alwaysIncludePattern": true,
            "encoding":"utf-8",
            "maxLogSize": 1000,
            "numBackups": 3,
            "path":infoPath
        },
    },
 　　//供外部调用的名称和对应设置定义
    categories: {
        "default": {"appenders": ["rule-console"], "level": "all"},
        "resLogger": {"appenders": ["resLogger"], "level": "info"},
        "errorLogger": {"appenders": ["errorLogger"], "level": "error"},
        "infoLogger": {"appenders": ["infoLogger"], "level": "info"},
        "http": {"appenders": ["resLogger"],"level": "info"}
    },
    "baseLogPath": baseLogPath 
}

/**
 1、type:console
将日志输出至控制台，这样可以方便开发人员在开发时接看到所有日志信息，在其他环境不建议设置
2、alwaysIncludePattern
如果为true，则每个文件都会按pattern命名，否则最新的文件不会按照pattern命名
3、replaceConsole
如果为true，则程序中用console.log输出到控制台的信息，也会输出到日志文件中，且格式按照log4js的格式输出，如果为false，则console.log只会输出在控制台。与type:console的appender正好相反，如果设置了type:console，则会将log4js.log日志输出至控制台。
4、category
没有看到权威的说明，我的理解category就是一个日志名字，如果没有取应该是默认的。只有当开发人员通过getLogger(category)获得相对应的日志时，才能输出到对应的appender中，否则会发送给所有默认的appender
5、logLevelFilter
没有看到什么文档说明，但实际的例子还是不少，直观理解应该就是根据日志级别进行日志过滤。

filename: __dirname + '/logs/test.log',//文件目录，当目录文件或文件夹不存在时，会自动创建
maxLogSize : 10,//文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件test.log.1的序列自增长的文件
backups : 3,//default value = 5.当文件内容超过文件存储空间时，备份文件的数量
//compress : true,//default false.是否以压缩的形式保存新文件,默认false。如果true，则新增的日志文件会保存在gz的压缩文件内，并且生成后将不被替换，false会被替换掉
encoding : 'utf-8',//default "utf-8"，文件的编码
 */