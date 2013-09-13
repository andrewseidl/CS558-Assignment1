// TODO: styleguide, should these be in the function?
// NOTE: assuming convex polygon for the container
var Iterator = require("iterator").Iterator
var vectors = require("vectors")
var eqs = require("eqsolver")

var add = vectors.add(2)
  , mult = vectors.mult(2)
  , copy = vectors.copy(2)
  , sub  = vectors.sub(2)
  , cross = vectors.cross(2)
  , dot = vectors.dot(2)
  , normalize = vectors.normalize(2)
  , mag = vectors.mag(2)

module.exports = simulator

function simulator(position, velocity, ground, dt) {

    // points on the polygon defining the box
    // this should probably be passed in
    var poly = [ [ 1, 1 ],
                 [-1, 1 ],
                 [-1, ground[0] *  1 / ground[1] ],
                 [ 1, ground[0] * -1 / ground[1] ] ];


    var nextPosition = new Array(position.length);
    var nextVelocity = new Array(velocity.length);

    nextPosition = position
    nextVelocity = velocity

    for (var i = 0; i < nextPosition.length; i++) {
        // hmm, seems like vectors does things inplace, work off copies
        // calculate new positions
        add(nextPosition[i], mult(copy(nextVelocity[i]), dt))

            // check if point is inside polygon
        for (var j =0; j < poly.length; j++) {
            var p1 = poly[j].slice(0)
            var p2 = poly[(j+1)%poly.length].slice(0)
            var v1 = copy(p2)
            var v2 = copy(p2)

            sub(v1, p1)
            sub(v2, nextPosition[i])

            if (cross(copy(v1), v2) > 0) {
                // TODO: better logging framework/see if console has 'debug'/'info' streams
                // more 'informational'/'debug' than typical log
                console.log("    Point:   " + nextPosition[i] + "\n    Crosses: " + p1 + "\n             " + p2) 
                //mirror the point across the line
                //from: http://stackoverflow.com/questions/8954326/how-to-calculate-the-mirror-point-along-a-line
                var A = p2[1] - p1[1]
                var B = -(p2[0] - p1[0])
                var C = -A * p1[0] - B * p1[0]

                var D = B
                var E = -A

                var F = -D*nextPosition[i][0] - E*nextPosition[i][1]

                lhs = [[A,B,0],[D,E,0],[0,0,0]]
                rhs = [-C,-F,0]

                console.log(rhs)
                console.log(lhs)
                var np = eqs(lhs,rhs)
                //np = rhs
                console.log("moo: " + np.b)

                nextPosition[i][0] = 2*np.a - nextPosition[i][0]
                nextPosition[i][1] = 2*np.b - nextPosition[i][1]

                var V = nextVelocity[i].slice(0)
       
                var N = normalize([-A, -B])
                // 'vectors' seems a bit ugly
                mult(N,dot(N,V)/dot(N,N))
                mult(N,2)
                sub(nextVelocity[i], N)
                //mult(nextVelocity[i],-1)
                
                console.log("    New Velocity: " + nextVelocity[i] + "\n")

                j = 0 //we've moved the point, need to recheck to make sure we don't cross any other sides
            }
        }
    }


    console.log("Position: " + nextPosition + " Velocity: " + nextVelocity)

    return {
        position: nextPosition,
        velocity: nextVelocity
    }
}
