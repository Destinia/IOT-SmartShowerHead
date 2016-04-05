var mqtt    = require('mqtt');
var m = require('mraa');
var input = new m.Aio(0);
var client = mqtt.connect('mqtt://127.0.0.1');
//input.dir(m.DIR_IN);

client.on('connect', function () {
  client.subscribe('presence');
//if(input.read()>=500)
  client.publish('psence','light');

  client.publish('presence', 'dark');
console.log(input.read());
});
console.log(input.read());
client.end();
client.on('message', function (topic, message) {
//message is Buffer 
  console.log(message.toString());
  client.end();
});

