var assert = require("assert")
var almostEqual = require("almost-equal")
var stepSimulator = require("../simulator.js")

var position = [[0, 0.5]]
var velocity = [[0, 1.0]]
var ground   = [0, 1]
var dt       = 0.1

for(var t=0.0; t<1.0; t+=dt) {
    var nstate = stepSimulator(position, velocity, ground, dt)
        position = nstate.position
        velocity = nstate.velocity
        assert.equal(position[0][0], 0.0)
        assert.ok(almostEqual(position[0][1], 1.0 - Math.abs((t+dt) - 0.5), almostEqual.DBL_EPSILON))
}
