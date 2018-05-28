var cluster = require('cluster'),
os = require('os');

// Code to run if we're in the master process
if (cluster.isMaster) {
	// Count the machine's CPUs
	var cpuCount = os.cpus().length;

	// Create a worker for each CPU
	for (var i = 0; i < cpuCount; i += 1) {
		cluster.fork();
	}

	// Listen for dying workers
	cluster.on('exit', function (worker) {
	// Replace the dead worker
	console.log('Worker ' + worker.id + ' died :(');
		cluster.fork();
	});
} else {
	// Code to run if we're in a worker process
	require('./app')
}