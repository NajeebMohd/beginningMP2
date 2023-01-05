const kue = require('kue');

// const queue = kue.createQueue({redis: {
//     port: 13091, host: 'redis-13091.c8.us-east-1-4.ec2.cloud.redislabs.com:13091' , auth: 'kJtJj9jTmdY4XVX4K4rVzXs9i9EBPUPG'
// }});

const queue = kue.createQueue();

module.exports = queue;