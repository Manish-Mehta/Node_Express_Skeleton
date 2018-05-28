
const config = require('./config'),
 bodyparser = require('body-parser'),
 mongoose = require('mongoose'),
 express = require('express'),
 morgan = require('morgan'),
 bluebird = require('bluebird'),
 compress = require('compression')

 /*
 fs = require('fs'),
 FileStreamRotator = require('file-stream-rotator')
*/

const app = express()

mongoose.Promise = bluebird  

app.use(bodyparser.urlencoded({extended: true}))   
app.use(bodyparser.json())
app.use(compress())
app.use(express.static(__dirname + './public'))

/*
let logDirectory = __dirname + './log'
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)  
// create a rotating write stream
let accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
})

    filename: logDirectory + './access-%DATE%.log',
    frequency: 'daily',
    verbose: false
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))  
*/
app.use(morgan('dev'))

const cors = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE')
    res.header("Access-Control-Allow-Headers", "accept, content-type, x-access-token, x-requested-with")
    next()
}
app.use(cors)

process.on('uncaughtException', function(err) {
    console.log(err);
})

// handle OPTIONS requests from the browser
app.options("*", function(req,res,next){res.send(200);});

//API Route setup
app.use('/','./api')

// Error handling middleware
app.use(function(err, req, res, next){
    console.log(err);
    if(err.statusCode){
        res.status(err.statusCode || 500);
    }
    res.send({"success": false, "message": err.message, "data": err});
});

//Starting point of app 
app.listen(config.port, function (err) {
    if (err)
        console.log(err);
    else
        console.log('app started running at  ' + config.port);

})









