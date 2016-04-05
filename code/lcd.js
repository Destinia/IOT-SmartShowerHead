var m = require('mraa'); //require mraa

// helper function to go from hex val to dec
function char(x) { return parseInt(x, 16); }

x = new m.I2c(0)
x.address(0x62)
x.writeReg(0, 0)
x.writeReg(1, 0)

x.writeReg(char('0x08'), char('0xAA'));
x.writeReg(char('0x04'), 255);
x.writeReg(char('0x03'), 255);
x.writeReg(char('0x02'), 255);

var LCD = require('jsupm_i2clcd');
var mylcd = new LCD.Jhd1313m1(0);
mylcd.setColor(64,255,64);
mylcd.write('hello');
mylcd.cursorBlinkOn();
