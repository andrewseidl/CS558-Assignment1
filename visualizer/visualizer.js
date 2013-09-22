
var sim = require("../simulator.js")

var position = [[0, 0.1]]
var velocity = [[1, 1.0]]
var ground   = [0, 1]
var dt       = 0.01

var poly = [[1,1],[-1,1]]
var polyHasGround = false

//var nstate = sim(position, velocity, ground, dt, poly, polyHasGround)

var myCanvas = document.body.querySelector("#visuals")

var posField = document.body.querySelector("#posField")
var velField = document.body.querySelector("#velField")
var gndField = document.body.querySelector("#gndField")
var stepField = document.body.querySelector("#stepField")
var polyField = document.body.querySelector("#polyField")
var resetBtn = document.body.querySelector("#reset")
var scaleField = document.body.querySelector("#scaleField")
var enableGround = document.body.querySelector("#enableGround")

posField.value = position
velField.value = velocity
gndField.value = ground
stepField.value = dt
polyField.value = poly

var scale = 200; //scale up from sim coords

scaleField.value = scale

myCanvas.width = 400
myCanvas.height = 400

var topLeft = [] //needed to switch to Canvas' coord system

function calcCorners(poly) {
    x = poly.map(function(o) { return o[0] } )
    y = poly.map(function(o) { return o[1] } )
    topLeft = [Math.min.apply(null,x), Math.max.apply(null,y)]
    bottomRight = [Math.max.apply(null,x), Math.min.apply(null,y)]
}


var context = myCanvas.getContext("2d")

function drawBox() {
    calcCorners(nstate.poly)

    myCanvas.width = (-topLeft[0]+bottomRight[0])*scale
    myCanvas.height = (+topLeft[1]-bottomRight[1])*scale

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

function runSimulation() {
    //requestAnimationFrame(runSimulation)
    context.clearRect(0,0,myCanvas.width,myCanvas.height);
    nstate = sim(position, velocity, ground, dt, poly.slice(0), polyHasGround);
    drawBox();
    position = nstate.position;
    velocity = nstate.velocity;

    for (var i=0; i < nstate.position.length; i++) {
        drawPoint(transformCoords(nstate.position[i][0], nstate.position[i][1], scale, topLeft))
    }
}

var simulate = setInterval(runSimulation,1000*dt)

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
    drawBox();
    data = parseField(posField.value)
    for (var i=0; i < data.length; i++) {
        drawPoint(transformCoords(1.0*data[i][0],1.0*data[i][1],scale, topLeft));
    }
}

function resetSim() {
    clearInterval(simulate);
    console.log("Resetting");
    context.clearRect(0,0,myCanvas.width,myCanvas.height);

    var pos = parseField(posField.value);
    var vel = parseField(velField.value);
    var gnd = parseField(gndField.value);
    var ply = parseField(polyField.value);
    dt = stepField.value.match(/-?[\d\.]+/)[0];
    scale = scaleField.value.match(/-?[\d\.]+/)[0];

    polyHasGround = !enableGround.checked

    var n = Math.min(pos.length, vel.length);

    position.length = 0;
    velocity.length = 0;
    poly.length = 0;

    for (var i=0; i < n; i++) {
        position[i] = [1*pos[i][0], 1*pos[i][1]];
        velocity[i] = [1*vel[i][0], 1*vel[i][1]];
    }

    for (var i=0; i < ply.length; i++) {
        poly[i] = [1*ply[i][0], 1*ply[i][1]];
    }
    ground = [gnd[0][0], gnd[0][1]]

    simulate = setInterval(runSimulation,1000*dt)
}

resetBtn.addEventListener("click",resetSim)
posField.addEventListener("change",checkPositions)

