var Service = require('node-windows').Service;
var svc = new Service({
    name: "Shutdown Remotely Daemon",
    description: "Shutdown Remotely Daemon Created by Jay Are Galinada. View repository at https://github.com/jayaregalinada/shutdown-remotely",
    script: require('path').join(__dirname, "/lib/app.js")
});

svc.on('install', function() {
    console.log('Installing Service');
    svc.start();
    console.log('The Service exists:', svc.exists);
});
svc.on('uninstall', function() {
    console.log('Uninstall complete.');
    console.log('The Service exists:', svc.exists);
});

module.exports = svc;
