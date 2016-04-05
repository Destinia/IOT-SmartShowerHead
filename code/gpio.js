var mraa = require('mraa'); //require mraa

console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console

var myOnboardLed = new mraa.Gpio(13); //LED hooked up to digital pin 13 (or built in pin on Galileo Gen1 & Gen2 plus Edison Arduino Breakout board)

while(1){

myOnboardLed.dir(mraa.DIR_OUT); //set the gpio direction to output

}

