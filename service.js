var Service = require('node-windows').Service;

var svc = new Service({
	name: "Shutdown Daemon",
	description: "Nodejs Shutdown Daemon",
	script: "lib/app.js"
});

svc.on('install', function(){
	svc.start();
});

svc.install();
