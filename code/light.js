var mqtt    = require('mqtt');
var client = mqtt.connect('mqtt://127.0.0.1');
var m = require('mraa');
var light = new m.Aio(0);
function sleep(delay){
	var start = new Date().getTime();
	while(new Date().getTime() < start +delay );
}
client.on('connect',function(){
	client.subscribe('presence');
	while(1){
	if(light.read()>500)
		client.publish('presence','light');
	else
		client.publish('presence','dark');
	sleep(1000);
	}
});
client.on('message', function (topic, message) {
  // message is Buffer 
 console.log(message.toString());
  client.end();
});

