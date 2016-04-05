var m = require('mraa');
var LCD = require('jsupm_i2clcd');
var mylcd = new LCD.Jhd1313m1(0);
mylcd.write("Water Flow");
