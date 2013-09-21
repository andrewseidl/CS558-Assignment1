// 'vectors' might not have been the best choice
var vectors = require("vectors")

var add = vectors.add(2)
  , mult = vectors.mult(2)
  , copy = vectors.copy(2)
  , sub  = vectors.sub(2)
  , cross = vectors.cross(2)
  , dot = vectors.dot(2)
  , normalize = vectors.normalize(2)
  , mag = vectors.mag(2)
  , dist = vectors.dist(2)

module.exports = simulator

function det(p1, p2) {
    return p1[0]*p2[1]-p1[1]*p2[0]
}

function intersection(s1, e1, s2, e2) {
    var p = s1.slice(0);
    var r = e1.slice(0);
    sub(r,s1);

    var q = s2.slice(0);
    var s = e2.slice(0);
    sub(s,s2);

    var crosss = cross(r,s);
    sub(q,p);
    var numer = cross(q,s);
    var t = numer/crosss;
    mult(r,t)
    add(p,r);

    return p;
}



function simulator(position, velocity, ground, dt, poly, polyHasGround) {

    polyHasGround = polyHasGround || false


    // points on the polygon defining the box
    // this should probably be passed in
    poly = poly.slice(0) || [[1,1],[-1,1]];

    if (!polyHasGround) {
        poly.push([-1, ground[0] *  1 / ground[1] ]);
        poly.push([ 1, ground[0] * -1 / ground[1] ]);
    }


    var nextPosition = new Array(position.length);
    var nextVelocity = new Array(velocity.length);

    nextPosition = position
    nextVelocity = velocity

    for (var i = 0; i < nextPosition.length; i++) {
        // hmm, seems like vectors does things inplace, work off copies
        // calculate new positions
        var prevPoint = nextPosition[i].slice(0)
        add(nextPosition[i], mult(copy(nextVelocity[i]), dt))

        var remainingTime = dt

            // check if point is inside (convex) polygon
        for (var j =0; j < poly.length; j++) {
            var p1 = poly[j].slice(0)
            var p2 = poly[(j+1)%poly.length].slice(0)
            var v1 = copy(p2)
            var v2 = copy(p2)

            sub(v1, p1)
            sub(v2, nextPosition[i])

            if (det(v2,v1) < 0) {
                // TODO: better logging framework/see if console has 'debug'/'info' streams
                // more 'informational'/'debug' than typical log
                //console.log("    Point:   " + nextPosition[i] + "\n    Crosses: " + p1 + "\n             " + p2) 
                //mirror the point across the line
                //from: http://stackoverflow.com/questions/8954326/how-to-calculate-the-mirror-point-along-a-line
                var A = p2[1] - p1[1]
                var B = -(p2[0] - p1[0])
                var C = -A * p1[0] - B * p1[0]

                var V = nextVelocity[i].slice(0)
                var N = normalize([-A, -B])

                // 'vectors' seems a bit ugly
                mult(N,2*dot(N,V)/dot(N,N))
                sub(nextVelocity[i], N)
                //console.log("    New Velocity: " + nextVelocity[i])

                // find intersection
                var inters = intersection(p1, p2, nextPosition[i], prevPoint)
                //console.log("    Intersection: " + inters + "\n")

                remainingTime = remainingTime*(1-dist(prevPoint,inters)/dist(nextPosition[i],prevPoint))

                prevPoint = nextPosition[i].slice(0)
                nextPosition[i] = inters.slice(0)
                add(nextPosition[i], mult(copy(nextVelocity[i]), remainingTime))
                //console.log("    New point:   " + nextPosition[i])

                

                j = 0 //we've moved the point, need to recheck to make sure we don't cross any other sides
            }
        }
    }


    //console.log("Position: " + nextPosition + " Velocity: " + nextVelocity)

    return {
        position: nextPosition,
        velocity: nextVelocity,
        poly: poly
    }
}
