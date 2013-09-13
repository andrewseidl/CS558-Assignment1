var assert = require("assert")
var almostEqual = require("almost-equal")
var stepSimulator = require("../simulator.js")

var position = [[0, 0.1]]
var velocity = [[1, 1.0]]
var ground   = [0, 1]
var dt       = 0.1

for(var t=0.0; t<1.9; t+=dt) {
    var nstate = stepSimulator(position, velocity, ground, dt)
        position = nstate.position
        velocity = nstate.velocity
}
assert.ok(almostEqual(position[0][0], 0.1, almostEqual.FLT_EPSILON))
assert.ok(almostEqual(position[0][1], 0.0, almostEqual.FLT_EPSILON))
