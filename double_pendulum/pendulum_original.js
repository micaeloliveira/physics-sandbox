function drawCircle(myCircle, context) {
  context.beginPath();
  context.arc(myCircle.x, myCircle.y, 50, 0, 2 * Math.PI, false);
  context.fillStyle = '#000';
  context.fill();
  context.lineWidth = myCircle.borderWidth;
  context.strokeStyle = 'black';
  context.stroke();
}

function drawLine(myLine, context) {
  context.beginPath();
  context.moveTo(myLine.x0, myLine.y0);
  context.lineTo(myLine.x, myLine.y);
  context.strokeStyle = 'red';
  context.stroke();
}

function animate(myCircle, myLine, canvas, context, time) {
  // update
  var time = time + 1000 ;
  var amplitude = 150;

  // in ms
  var period = 2000.;
  var centerX = canvas.width / 2 - myCircle.width / 2;
  var nextX = amplitude * Math.sin(time * 2 * Math.PI / period) + centerX;
  myCircle.x = nextX;
  myLine.x = nextX;
  myLine.y = myCircle.y;

  // clear
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw
  drawCircle(myCircle, context);
  drawLine(myLine, context);
}




var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var myCircle = {x: 300, y: 400, width: 100, height: 50, borderWidth: 5};
var myLine = {x0: 0, y0: 0, x: 0, y: 0};

drawLine(myLine, context);
drawCircle(myCircle, context);

var init = {};

init.interval = setInterval(function(){

  var startTime = (new Date()).getTime();
  animate(myCircle, myLine, canvas, context, startTime);

}, 2);

