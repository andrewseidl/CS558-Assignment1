
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

var context = myCanvas.getContext("2d")
context.fillStyle = "rgb(220,0,0)"
context.fillRect(20,20,100,100)
