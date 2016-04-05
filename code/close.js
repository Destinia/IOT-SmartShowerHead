var m = require('mraa');
var pin = new m.Gpio(13);
pin.dir(m.DIR_OUT);
pin.write(0);
console.log(pin);
