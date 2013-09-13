var assert = require("assert")
var almostEqual = require("almost-equal")
var stepSimulator = require("../simulator.js")

var position = [[0, 1]]
var velocity = [[0, 1]]
var ground   = [0, 1]
var dt       = 0.1

var nstate = stepSimulator(position, velocity, ground, dt)
    position = nstate.position
    velocity = nstate.velocity
assert.ok(almostEqual(position[0][0], 0.0, almostEqual.FLT_EPSILON))
assert.ok(almostEqual(position[0][1], 0.9, almostEqual.FLT_EPSILON))
assert.ok(almostEqual(velocity[0][0], 0.0, almostEqual.FLT_EPSILON))
assert.ok(almostEqual(velocity[0][1],-1.0, almostEqual.FLT_EPSILON))
