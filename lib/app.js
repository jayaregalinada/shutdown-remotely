const PORT = 8008;
const ADDRESS = '0.0.0.0';
const TIMEOUT = 10000;

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    exec = require('child_process').exec,
    shutdownTimeout,
    child;

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/vendors/bootstrap', express.static(__dirname + '/../node_modules/bootstrap/dist'));
app.use('/vendors/jquery', express.static(__dirname + '/../node_modules/jquery/dist'));
app.use('/vendors/angular', express.static(__dirname + '/../node_modules/angular'));

app.post('/send', function(req, res) {
    console.log('Someone is sending a message')
    console.log('/send@message', req.body.message);
    exec('msg * ' + req.body.message)

    res.status(200).json({
        status: 'success',
        message: 'Successfully send message',
        content: req.body.message
    })
})

app.post('/shutdown', function(req, res) {
    console.log('Someone is shutting down your system')
    console.log('/shutdown@message', req.body.message);
    var shutdown = ' && shutdown /s /f /t ' + (TIMEOUT/1000)
    exec('msg * ' + req.body.message + shutdown)

    shutdownTimeout = setTimeout(function() {
        res.status(200).json({
            status: 'success',
            message: 'Successfully send message and shutting down computer',
            content: req.body.message
        })
    }, TIMEOUT)
})

app.post('/cancel', function(req, res) {
    console.log('Shutting down your system')
    var shutdown = ' && shutdown -a'
    clearTimeout(shutdownTimeout)
    exec('msg * ABORT SHUTDOWN!' + shutdown)

    res.status(200).json({
        status: 'success',
        message: 'Successfully abort shutting down computer'
    })
})


var server = app.listen(PORT, function () {
    console.log('App is listening on port: ' + PORT);
});

