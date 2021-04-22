const GIFEncoder = require('gifencoder');
const { createCanvas } = require('canvas');
const fs = require('fs');

const width = 1200;
const height = 600;
const encoder = new GIFEncoder(width, height);
// stream the results as they are available into myanimated.gif
encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'));
 
encoder.start();
encoder.setRepeat(-1);   // 0 for repeat, -1 for no-repeat
encoder.setDelay(1000);  // frame delay in ms
encoder.setQuality(100); // image quality. 10 is default.
 
// use node-canvas
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#000'
ctx.fillRect(0, 0, width, height)

var text = 'Hello, World!'

const now = new Date();

const future = new Date('October 3, 2020 16:30:00');

var diff = Math.abs(future - now)
var diffMinutes = Math.floor( diff / 1000 / 60);
var diffSeconds = Math.floor((diff - (diff / 60)) / 1000);

ctx.font = 'bold 70pt Impact'
ctx.textAlign = 'center'
ctx.fillStyle = '#fff'

var text = `${diffMinutes.toString()}:${diffSeconds.toString()}`;
ctx.fillText(text, 600, 170)

encoder.addFrame(ctx);

// // // red rectangle
// // ctx.fillStyle = '#ff0000';
// // ctx.fillRect(0, 0, width, height);
// // encoder.addFrame(ctx);
 
// // // green rectangle
// // ctx.fillStyle = '#00ff00';
// // ctx.fillRect(0, 0, width, height);
// // encoder.addFrame(ctx);
 
// // // blue rectangle
// // ctx.fillStyle = '#0000ff';
// // ctx.fillRect(0, 0, width, height);
// // encoder.addFrame(ctx);

encoder.finish();

