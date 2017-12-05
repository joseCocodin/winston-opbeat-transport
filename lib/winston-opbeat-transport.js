/*
 *  winston-opbeat.js: Winston Transport for Opbeat
 *  opbeat.com
 *
 *  (C) 2014 Justin McCammon
 *  MIT LICENSE
 *
 */

var util = require('util'),
    winston = require('winston');

/*
*   @constructs Opbeat
*   @param options {object} options for this transport
*/
var Opbeat = function (options) {
    this.name = 'opbeat';
    // instance of opbeat
    this.opbeat = options.opbeat || false;
    // level you want to send to opbeat
    this.level = options.level || 'error';
    // set logging to silent (off)
    this.silent = options.silent || false;
};

/*
*   Inherit from `winston.Transport` so you can take advantage
*   of the base functionality and `.handleExceptions()`.
*/
util.inherits(Opbeat, winston.Transport);

/*
*   Send messages to Opbeat
*   Use optional meta field to pass along a reference to the
*   original error and any other information you'd like passed
*   into Opbeat
*
*   @param level {string} Level at which to send message
*   @param msg {string} Message to log
*   @param meta {object} **Optional** Additional info to send to opbeat
*       suggested use: {error: new Error('My error'), param1: 'foo'...}
*   @param callback {function} callback to run when done
*
*/
Opbeat.prototype.log = function (level, msg, meta, callback) {
    var error = new Error(msg);
    var extra = {};

    // return early if we shouldn't send to opbeat
    if (this.silent || level !== this.level || !this.opbeat) {
        return callback(null, true);
    }

    // handle when meta field isn't included
    if (typeof(meta) === 'function' && !callback) {
        callback = meta;
        meta = false;
    }

    // create error from meta if meta is sort of Error
    if (meta.name && meta.message && meta.stack) {
        error = new Error(meta.message);
        error.name = meta.name;
        error.stack = meta.stack;

        extra.info = msg;
    } else {
        extra.data = meta;
    }

    // send to opbeat
    this.opbeat.captureError(error, {
        extra: extra
    });

    // let winston know we're done here
    this.emit('logged');
    callback(null, true);
};

// for backwards compatibility
winston.transports.Opbeat = Opbeat;
module.exports.Opbeat = Opbeat;
