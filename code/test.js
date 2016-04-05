var util = require('util'),
    exec = require('child_process').exec,
    child;

child = exec('mplayer tanya\ tsai\ -\ stranger.wav', // command line argument directly in string
  function (error, stdout, stderr) {      // one easy function to capture data/errors
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});
