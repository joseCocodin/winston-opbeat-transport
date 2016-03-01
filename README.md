winston-opbeat-transport
==============

A Winston transport for sending logs to [Opbeat](http://opbeat.com)
This transport has been loosely based from https://github.com/thisjustin/winston-opbeat

## Installation

### Installing winston-opbeat

``` sh
  $ npm install winston
  $ npm install winston-opbeat-transport
```

## Usage
``` js
  var winston = require('winston');

  //
  // Requiring `winston-opbeat` will expose
  // `winston.transports.Opbeat`
  //
  require('winston-opbeat-transport').Opbeat;

  winston.add(winston.transports.Opbeat, options);
```

### Options  
* __opbeat:__ instance of opbeat
* __level:__ level of logs you want to send to Opbeat
* __silent:__ turn off sending to Opbeat (useful for dev)

### Logging  
Send an instance of `Error` in the `meta` field of your Winston logger; this will be passed to Opbeat as the first parameter of `caughtException`. The message sent as first parameter on the logger will be included to Opbeat as an extra parameter. 

Example logging:
```javascript
// replace logger.error with however you call Winston
logger.error('Some message', new Error('Pass your error or init a new one here'));
```

## License
The MIT License (MIT)
(c) 2016, Francesco Tonini

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.