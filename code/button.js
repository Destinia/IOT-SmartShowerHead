var mraa = require('mraa');

var http = require('http');
var DigitalPinIn1 = new mraa.Gpio(5);
var DigitalPinIn2 = new mraa.Gpio(6);
var DigitalPinIn3 = new mraa.Gpio(7);
var DigitalPinIn4 = new mraa.Gpio(8);
var DigitalPinIn5 = new mraa.Gpio(9);

DigitalPinIn1.dir(mraa.DIR_IN);
DigitalPinIn2.dir(mraa.DIR_IN);
DigitalPinIn3.dir(mraa.DIR_IN);
DigitalPinIn4.dir(mraa.DIR_IN);
DigitalPinIn5.dir(mraa.DIR_IN);


  var post_options = {
    host: '172.20.10.6',
    port: '2015',
    path: '/keyboardcontrol',
    method: 'POST',
    headers:{
      'Content-Type':'text/plain'
    }
  };



setInterval(function(){
	if(DigitalPinIn1.read()===1){
		console.log('pressed 1');
		var post_req = http.request(post_options, function(res){
   			res.setEncoding('utf8');
    			res.on('data', function(chunk){
      				console.log('Response: '+chunk);
    			});
    			res.on('end',function(res_body){
      			//do something
      			//connect ke= junvc 
    			});
  		});

  		post_req.write("1");
  		console.log('AAA');
 		post_req.on('error',function(e){
    			console.log('ERROR:  ' +e.message);
  		});
  		post_req.end();
	}

	if(DigitalPinIn2.read()===1){
		console.log('pressed 2');
		var post_req = http.request(post_options, function(res){
   			res.setEncoding('utf8');
    			res.on('data', function(chunk){
      				console.log('Response: '+chunk);
    			});
    			res.on('end',function(res_body){
      			//do something
      			//connect ke= junvc 
    			});
  		});

  		post_req.write("2");
  		console.log('AAA');
 		post_req.on('error',function(e){
    			console.log('ERROR:  ' +e.message);
  		});
  		post_req.end();
	}	

	if(DigitalPinIn3.read()===1){
		console.log('pressed 3');
		var post_req = http.request(post_options, function(res){
   			res.setEncoding('utf8');
    			res.on('data', function(chunk){
      				console.log('Response: '+chunk);
    			});
    			res.on('end',function(res_body){
      			//do something
      			//connect ke= junvc 
    			});
  		});

  		post_req.write("3");
  		console.log('AAA');
 		post_req.on('error',function(e){
    			console.log('ERROR:  ' +e.message);
  		});
  		post_req.end();
	}

	if(DigitalPinIn4.read()===1){
		console.log('pressed 4');
		var post_req = http.request(post_options, function(res){
   			res.setEncoding('utf8');
    			res.on('data', function(chunk){
      				console.log('Response: '+chunk);
    			});
    			res.on('end',function(res_body){
      			//do something
      			//connect ke= junvc 
    			});
  		});

  		post_req.write("4");
  		console.log('AAA');
 		post_req.on('error',function(e){
    			console.log('ERROR:  ' +e.message);
  		});
  		post_req.end();
	}

	if(DigitalPinIn5.read()===1){
		console.log('pressed 5');
		var post_req = http.request(post_options, function(res){
   			res.setEncoding('utf8');
    			res.on('data', function(chunk){
      				console.log('Response: '+chunk);
    			});
    			res.on('end',function(res_body){
      			//do something
      			//connect ke= junvc 
    			});
  		});

  		post_req.write("5");
  		console.log('AAA');
 		post_req.on('error',function(e){
    			console.log('ERROR:  ' +e.message);
  		});
  		post_req.end();
	}


}, 150);
