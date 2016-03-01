/*
 *  winston-opbeat-transport.js: Winston Transport for Opbeat
 *  opbeat.com
 *
 *  (C) 2016 Francesco Tonini
 *  This transport has been loosely based from
 *  https://github.com/thisjustin/winston-opbeat
 *  MIT LICENSE
 *
 */

var winston = require('winston');
var opbeat  = require('opbeat').start({
	appId: '{your_app_id}',
	organizationId: '{your_organizationId}',
	secretToken: '{your_secretToken}'
}); 

// Opbeat transport
require('../lib/winston-opbeat.js').Opbeat;

var logger = new winston.Logger({
	transports: [
		new winston.transports.Console({
			level: 'debug',
			timestamp: true,
			colorize: true,
			handleExceptions: true,
			humanReadableUnhandledException: true
		}),
		new winston.transports.Opbeat({
			opbeat: opbeat,
			level: 'error',
			silent: false
		})
	]
});

var e = new Error('Thrown by opbeat');
throw e; // Exception is sent using the opbeat module

var e = new Error('Sent by transport');
logger.error('This is an additional message', e); // Sent by transport
