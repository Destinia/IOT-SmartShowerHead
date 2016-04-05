var mqtt = require('mqtt');
var m = require('mraa');
var client = mqtt.connect('mqtt://127.0.0.1');
var LCD = require('jsupm_i2clcd');
var mylcd = new LCD.Jhd1313m1(0);
var line1,line2;
function sleep(delay){
	var start = new Date().getTime();
	while(new Date().getTime() < start +delay );
}
//file visiter
var fs = require("fs");    
var path = require("path");
var songs = new Array;
var temp = new Array;
var index = 0;
temp = fs.readdirSync('music/sdcard');
for(var i=0;i<temp.length;i++){
   if(temp[i].substr(temp[i].lastIndexOf('.')+1, temp[i].length)==='wav'){
	songs.push(temp[i]);
   }
}
function marquee(data){
	if(data.length>16){
		for(var i=0;i<data.length-15;i++){
			mylcd.clear();
			mylcd.write(data.slice(i,16+i));
			sleep(500);
		}
		
	}
	else
		mylcd.write(data);
}
//////
mylcd.setColor(64,255,64);
//mylcd.cursorBlinkOn();
client.on('connect',function(){
client.subscribe('presence');
client.subscribe('temp');
client.subscribe('touch');
});
marquee(songs[index]);
client.on('message',function(topic,message){
  mylcd.clear();
  if(topic.toString()==='presence')
	line1 = message.toString();
  else if(topic.toString()=='temp')
    	line2 = message.toString();
  else {
	console.log('here');
	marquee(songs[(++index)%songs.length]);
	}
    /*if(line1)
    	mylcd.write(line1);
    mylcd.setCursor(1,0);
    if(line2)
    	mylcd.write(line2);*/
  
});
