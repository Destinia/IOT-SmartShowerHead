var mqtt    = require('mqtt');
var client = mqtt.connect('mqtt://127.0.0.1');
var m = require('mraa');
var B = 4275;
var sensor = new m.Aio(1);
function sleep(delay){
        var start = new Date().getTime();
        while(new Date().getTime() < start +delay );
}
client.on('connect',function(){
	var a = sensor.readFloat();
	var R = 1/a -1.0;
    R = 100000.0*R;
    var temperature=1.0/(Math.log(R/100000.0)/B+1/298.15)-273.15;
    while(1){                                                          
            client.publish('temp',temperature.toFixed(2).toString());
            //console.log(temperature.toString());
    sleep(1000);                              
    }
});
