var mqtt    = require('mqtt');
var client = mqtt.connect('mqtt://127.0.0.1');
var m = require('mraa');
var sensor = new m.Aio(1);
function sleep(delay){
        var start = new Date().getTime();
        while(new Date().getTime() < start +delay );
}
client.on('connect',function(){
    while(1){                                                          
            //client.publish('temp',temperature.toFixed(2).toString());
            console.log(temperature.toString());
    //sleep(1000);                              
    }
});
