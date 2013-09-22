
var sim = require("../simulator.js")

var position = [[0, 0.1]]
var velocity = [[1, 1.0]]
var ground   = [0, 1]
var dt       = 0.1

var poly = [[1,1],[-1,1]]
var polyHasGround = false

var nstate = sim(position, velocity, ground, dt, poly, polyHasGround)

var myCanvas = document.body.querySelector("#visuals")
var velocs = document.body.querySelector("#velocity")
var posField = document.body.querySelector("#positions")

myCanvas.width = 400
myCanvas.height = 400

topLeft = [-1, 1] //needed to switch to Canvas' coord system

var scale = 200; //scale up from sim coords, FIXME should be dynamic

var context = myCanvas.getContext("2d")

console.log(nstate.poly.length)

function drawBox() {
    context.beginPath()
    for (var i=0; i < nstate.poly.length; i++) {
        context.moveTo(scale*(-topLeft[0]+nstate.poly[i][0]),scale*(topLeft[1]-nstate.poly[i][1]))
        context.lineTo(scale*(-topLeft[0]+nstate.poly[(i+1)%nstate.poly.length][0]),scale*(topLeft[1]-nstate.poly[(i+1)%nstate.poly.length][1]))
    }

    context.strokeStyle = "#000"
    context.stroke();
}

function transformCoords(x,y,scale,tL) {
    return [scale*(x-tL[0]), scale*(tL[1]-y)]
}

function drawPoint(point) {
    context.beginPath();
    context.arc(point[0], point[1], 5, 0,2*Math.PI, true);
    context.closePath();
    context.fill();
}

function drawPoints() {
    //requestAnimationFrame(drawPoints)
    context.clearRect(0,0,myCanvas.width,myCanvas.height);
    drawBox();
    nstate = sim(position, velocity, ground, dt, poly.slice(0), polyHasGround);
    position = nstate.position;
    velocity = nstate.velocity;

    for (var i=0; i < nstate.position.length; i++) {
        drawPoint(transformCoords(nstate.position[i][0], nstate.position[i][1], scale, topLeft))
        velocs.innerHTML = nstate.velocity[i]
    }
}

var simulate = setInterval(drawPoints,1000*dt)

function parseField(data) {
    //regex:
    // -?        : optional minus sign
    // [\d\.]+   : one or more digits or .
    // [^\d\.]+  : one or more characters that aren't digits or .
    return data.match(/-?[\d\.]+[^\d\.]+-?[\d\.]+/g).map(function(x){return x.split(/[^\d\.-]/)})
}

function checkPositions(event) {
    clearInterval(simulate);
    console.log("Cleared")
    context.clearRect(0,0,myCanvas.width,myCanvas.height);
    context.clearRect(0,0,myCanvas.width,myCanvas.height);
    context.clearRect(0,0,myCanvas.width,myCanvas.height);
    context.clearRect(0,0,myCanvas.width,myCanvas.height);
    drawBox();
    data = parseField(posField.value)
    for (var i=0; i < data.length; i++) {
        drawPoint(transformCoords(1.0*data[i][0],1.0*data[i][1],scale, topLeft));
    }
}

posField.addEventListener("change",checkPositions)

