var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');
client.on('connetc',function(){
	client.subscribe('presence');
	client.publish('presence','hello mqtt');
});

client.on('message',function(topic,message){
	console.log(message.toString());
	client.end();
});
