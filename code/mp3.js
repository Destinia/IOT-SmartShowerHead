var m = require('mraa'); //require mraa
console.log('MRAA Version: ' + m.getVersion());
u = new m.Uart(0);
console.log("Note: connect Rx and Tx of UART with a wire before use");

function sleep(delay) {
  delay += new Date().getTime();
  while (new Date() < delay) { }
}

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function setPlayMode(mode){
	if(((mode===0x00)|(mode===0x01)|(mode===0x02)|(mode===0x03))==false){
		console.log("PlayMode parameter error");
	}
	var error = u.writeStr(String.fromCharCode(0x7E,0x03,0xA9,mode,0x7E));	
	sleep(200);
	//console.log(error);
	var temp = u.readStr(1);
	//console.log(u);
	console.log(temp.charCodeAt(0));
	if(u.readStr(1)===String.fromCharCode(0xA9))
		console.log('success');
	else
		console.log("error"+u.readStr(1));
}


function setMusicPlay(hbyte,lbyte){
	u.writeStr(String.fromCharCode(0x7E,0x04,0xA0,hbyte,lbyte,0x7E)+'\n');
	sleep(200);
	if(u.readStr(1)===String.fromCharCode(0xA0))
		console.log('success');
	else
		console.log("error"+u.readStr(1));
}

function setVolume(volume){
	u.writeStr(String.fromCharCode(0x7E,0x03,0xA7,volume,0x7E)+'\n');
	sleep(200);
	if(u.readStr(1)===String.fromCharCode(0xA7))
		console.log('success');
	else
		console.log("error"+u.readStr(1));

}
console.log("Set UART parameters");
function PauseMusic(){
	u.writeStr(String.fromCharCode(0x7E,0x02,0xA3,0x7E)+'\n');
	sleep(10);
	if(u.readStr(1)===String.fromCharCode(0xA3))
		console.log('success');
	else
		console.log(u.readStr(1));
}


u.setBaudRate(9600);
u.setMode(8,0,1);
u.setFlowcontrol(false,false);
sleep(200);

//console.log(u);
//console.log('check');
var error = u.writeStr(String.fromCharCode(0x7E,0x03,0xA9,0x01,0x7E));	
console.log(error);
sleep(200);
error = u.writeStr(String.fromCharCode(0x7E,0x02,0xA3,0x7E));
console.log(error);
sleep(200);
var error = u.writeStr(String.fromCharCode(0x7E,0x03,0xA9,0x01,0x7E));	
console.log(error);
sleep(200);
error = u.writeStr(String.fromCharCode(0x7E,0x04,0xA0,0x00,0x01,0x7E));
console.log(error);

//setPlayMode(0x01);
//PauseMusic();
//setMusicPlay(00,01);
//setVolume(0x0E);

