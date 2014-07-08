$('#set_variables_form').submit(function (e) {
  e.preventDefault();
  console.log($('#mass1').val());
  m1     = $('#mass1').val();
  m2     = $('#mass2').val();
  Phi1   = $('#Phi1').val()/180*(Math.PI);
  Phi2   = $('#Phi2').val()/180*(Math.PI);
  d2Phi1 = 0;
  d2Phi2 = 0;
  dPhi1  = 0;
  dPhi2  = 0;
  run();
});

function drawCircle(myCircle, context) {
  context.beginPath();
  context.arc(myCircle.x, myCircle.y, myCircle.mass, 0, 2 * Math.PI, false);
  context.fillStyle = 'rgba(0,0,0,1)';
  context.fill();
}

function drawLine(myLine, context) {
  context.beginPath();
  context.moveTo(myLine.x0, myLine.y0);
  context.lineTo(myLine.x, myLine.y);
  context.strokeStyle = 'red';
  context.lineWidth = 5;
  context.stroke();
}

function animate(myCircle1, myCircle2, myLine1, myLine2, canvas, context) {
  mu      =  1+m1/m2;
  d2Phi1  =  (g*(Math.sin(Phi2)*Math.cos(Phi1-Phi2)-mu*Math.sin(Phi1))-(l2*dPhi2*dPhi2+l1*dPhi1*dPhi1*Math.cos(Phi1-Phi2))*Math.sin(Phi1-Phi2))/(l1*(mu-Math.cos(Phi1-Phi2)*Math.cos(Phi1-Phi2)));
  d2Phi2  =  (mu*g*(Math.sin(Phi1)*Math.cos(Phi1-Phi2)-Math.sin(Phi2))+(mu*l1*dPhi1*dPhi1+l2*dPhi2*dPhi2*Math.cos(Phi1-Phi2))*Math.sin(Phi1-Phi2))/(l2*(mu-Math.cos(Phi1-Phi2)*Math.cos(Phi1-Phi2)));
  dPhi1   += d2Phi1*time;
  dPhi2   += d2Phi2*time;
  Phi1    += dPhi1*time;
  Phi2    += dPhi2*time;

  myCircle1.x = X0+l1*Math.sin(Phi1);
  myCircle1.y = Y0+l1*Math.cos(Phi1);
  myCircle2.x = X0+l1*Math.sin(Phi1)+l2*Math.sin(Phi2);
  myCircle2.y = Y0+l1*Math.cos(Phi1)+l2*Math.cos(Phi2);

  myLine1.x  = myCircle1.x;
  myLine1.y  = myCircle1.y;
  myLine2.x0 = myCircle1.x;
  myLine2.y0 = myCircle1.y;
  myLine2.x  = myCircle2.x;
  myLine2.y  = myCircle2.y;

  context.clearRect(0, 0, canvas.width, canvas.height);

  drawLine(myLine1, context);
  drawLine(myLine2, context);
  drawCircle(myCircle1, context);
  drawCircle(myCircle2, context);
}

//Physics Constants
var d2Phi1 = 0;
var d2Phi2 = 0;
var dPhi1  = 0;
var dPhi2  = 0;
var Phi1   = 0*(Math.PI)/2;
var Phi2   = 2.3*(Math.PI)/2;
var m2     = 10;
var l1     = 150;
var l2     = 150;
var X0     = 350;
var Y0     = 60;
var g      = 9.8;
var time   = 0.05;

var canvas  = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var init    = {};

function run(){
  var myLine1 = {x0: X0, y0: Y0, x: 0, y: 0};
  var myLine2 = {x0: 0, y0: 0, x: 0, y: 0};
  var myCircle1 = {x: X0+l1*Math.sin(Phi1), y: Y0+l1*Math.cos(Phi1), mass: m1};
  var myCircle2 = {x: X0+l1*Math.sin(Phi1)+l2*Math.sin(Phi2), y: Y0+l1*Math.cos(Phi1)+l2*Math.cos(Phi2), mass: m2};

  clearInterval(init);
  context.clearRect(0, 0, canvas.width, canvas.height);
  init = setInterval(function(){
    animate(myCircle1, myCircle2, myLine1, myLine2, canvas, context);
  }, 5);

}
