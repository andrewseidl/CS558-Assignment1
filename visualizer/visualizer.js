
var sim = require("../simulator.js")

var position = [[0, 0.1]]
var velocity = [[1, 1.0]]
var ground   = [0, 1]
var dt       = 0.1

var poly = [[1,1],[-1,1]]
var polyHasGround = false

var nstate = sim(position, velocity, ground, dt, poly, polyHasGround)

var myCanvas = document.body.querySelector("#visuals")

myCanvas.width = document.body.clientWidth / 2
myCanvas.height = document.body.clientHeight

topLeft = [-1, 1] //needed to switch to Canvas' coord system

var scale = 200; //scale up from sim coords, FIXME should be dynamic

var context = myCanvas.getContext("2d")

console.log(nstate.poly.length)

function drawBox() {
for (var i=0; i < nstate.poly.length; i++) {
    context.moveTo(scale*(-topLeft[0]+nstate.poly[i][0]),scale*(topLeft[1]-nstate.poly[i][1]))
    context.lineTo(scale*(-topLeft[0]+nstate.poly[(i+1)%nstate.poly.length][0]),scale*(topLeft[1]-nstate.poly[(i+1)%nstate.poly.length][1]))
}

context.strokeStyle = "#000"
context.stroke();
}

function drawPoints() {
    requestAnimationFrame(drawPoints)
    context.clearRect(0,0,myCanvas.width,myCanvas.height)
        drawBox()
    nstate = sim(position, velocity, ground, dt, poly.slice(0), polyHasGround)
        position = nstate.position
        velocity = nstate.velocity

    for (var i=0; i < nstate.position.length; i++) {
        context.beginPath();
        context.arc(scale*(nstate.position[i][0]-topLeft[0]),scale*(topLeft[1]-nstate.position[i][1]),10,0,2*Math.PI);
        //context.arc(100,100,10,0,2*Math.PI);
        context.closePath();
    }
}

setInterval(drawPoints,8000)
