const PORT = 8008;
const ADDRESS = '0.0.0.0';

var http = require('http'),
    url = require('url'),
    exec = require('child_process').exec,
    child;

var server = http.createServer(routes);

function routes(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});

  switch (req.url) {

    case '/':
    resJson(res, req, 'Oh nothing here man');
    exec('msg * ALERT! Someone is accessing this computer');
    break;

    case '/shutdown':
    resJson(res, req, 'Shutting Down your system');
    exec('msg * System Shut Down Initiate && shutdown /s /f /t 0');
    console.log('Shutting down your system');
    break;

  }

  res.end();
}

function resJson(res, req, message) {
    return res.write(JSON.stringify({
        method: req.method,
        url: req.url,
        message: message
    }, 0, 4));
}

server.listen(PORT, ADDRESS, function() {
  console.log('Server running at http://%s:%d/', ADDRESS, PORT);
  console.log('Press CTRL+C to exit');
});

process.on('SIGTERM', function () {
  if (server === undefined) return;
  server.close(function () {
    // Disconnect from cluster master
    process.disconnect && process.disconnect();
  });
});

