var Iterator = require("iterator").Iterator
var vectors = require("vectors")

var add = vectors.add(2)
  , mult = vectors.mult(2)
  , copy = vectors.copy(2)
  , sub  = vectors.sub(2)
  , cross = vectors.cross(2)
  , dot = vectors.dot(2)
  , normalize = vectors.normalize(2)

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
        //        Iterator.zip(nextPosition[i], nextVelocity[i])
        //            .forEach(function(x) {
        //                x[0] += dt * x[1];
        //                console.log(x[0])
        //            });
        
        // UGLY, USE iterators?
//        nextPosition[i][0] += dt * nextVelocity[i][0];
//        nextPosition[i][1] += dt * nextVelocity[i][1];
//        vectors.dot(nextPosition[i],nextVelocity[i])

        // hmm, seems like vectors does things inplace, work off copies
        // calculate new positions
        add(nextPosition[i], mult(copy(nextVelocity[i]), dt))

            // check if point is inside polygon
        for (var j =0; j < poly.length; j++) {
            var p1 = poly[j].slice(0)
            var p2 = poly[(j+1)%poly.length]
            var v1 = p2.slice(0)
            var v2 = p2.slice(0)

            sub(v1, p1)
            sub(v2, nextPosition[i])

            if (cross(v1, v2) > 0) {
                console.log("    Point:   " + nextPosition[i] + "\n    Crosses: " + p1 + "\n             " + p2) 
                //mirror it
                //from: http://stackoverflow.com/questions/8954326/how-to-calculate-the-mirror-point-along-a-line
                var A = p2[1] - p1[1]
                var B = -(p2[0] - p1[0])
                var C = -A * p1[0] - B * p1[0]

                var M = Math.sqrt(A*A + B*B)

                var Ap = A/M
                var Bp = B/M
                var Cp = C/M

                var D = Ap * nextPosition[i][0] + Bp * nextPosition[i][1] + Cp

                nextPosition[i][0] -= 2 * Ap * D
                nextPosition[i][1] -= 2 * Bp * D

                var V = nextVelocity[i].slice(0)

                //var N = normalize([-A, -B])
                //N = V.slice(0)
                //mult(N,-1)
                //sub(nextVelocity[i], mult(mult(dot(V,N)/dot(N,N),N),2))
                mult(nextVelocity[i],-1)

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
