;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = addn

function addn(vec) {
  for (var i = 1; i < arguments.length; i++) {
    if (Array.isArray(arguments[i])) {
      for (var n = 0; n < vec.length; n++) {
        vec[n] += arguments[i][n]
      }
    } else {
      for (var n = 0; n < vec.length; n++) {
        vec[n] += arguments[i]
      }
    }
  }

  return vec
}

},{}],2:[function(require,module,exports){
/**

### `add(vec, other[, ...])`

Adds the `other` vector to `vec`:

``` javascript
var add = require('vectors/add')(2)
var pos = [0, 0]
var spd = [1, 1.5]

add(pos, spd)
add(pos, spd)

console.log(pos) // [2, 3]
```

Or add a scalar to the entire array:

``` javascript
var res = add([1, 1, 1], 6)
console.log(res) // [7, 7, 7]
```

You can disable this by passing `scalars: false` to
the generator function for faster results:

``` javascript
var add = require('vectors/add')(2, { scalars: false })
```

**/

module.exports = require('./lib/operator')('add', '+')

},{"./lib/operator":17}],3:[function(require,module,exports){
module.exports = require('./copy')()

},{"./copy":4}],4:[function(require,module,exports){
/**

### `copy(vec)`

Returns a copy of the vector `vec`:

``` javascript
var copy = require('vectors/copy')(2)
var spd = [5, 5]

var cop = copy(spd)
mult(spd, 100) === [100, 100]
cop === [5, 5]
```

**/

module.exports = function() {
  return copy
}

function copy(vec) {
  return vec.slice(0)
}

},{}],5:[function(require,module,exports){
module.exports = crossn

function crossn(vec, other) {
  return vec.length < 3 ? (
    vec[0] * other[1] -
    vec[1] * other[0]
  ) : [
    (vec[1] * other[2]) - (vec[2] * other[1]),
    (vec[2] * other[0]) - (vec[0] * other[2]),
    (vec[0] * other[1]) - (vec[1] * other[0])
  ]
}

},{}],6:[function(require,module,exports){
/**

### `cross(vec, other)`

Returns the cross product of vectors `vec` and `other`:

``` javascript
var cross = require('vectors/cross')(2)
var a = [1, 2]
var b = [8, 4]

cross(a, b) === -12
```

This method only works in 2 and 3 dimensions.

**/

module.exports = function generator(dims) {
  dims = +dims|0
  if (dims === 2) return cross2
  if (dims === 3) return cross3
  throw new Error('cross product only supported for 2 and 3 dimensions')
}

function cross2(vec, other) {
  return (
    vec[0] * other[1] -
    vec[1] * other[0]
  )
}

function cross3(vec, other) {
  return [
    (vec[1] * other[2]) - (vec[2] * other[1]),
    (vec[2] * other[0]) - (vec[0] * other[2]),
    (vec[0] * other[1]) - (vec[1] * other[0])
  ]
}

},{}],7:[function(require,module,exports){
module.exports = distn

function distn(vec, other) {
  var res = 0
  for (var n = 0; n < vec.length; n++) {
    res += Math.pow(other[n] - vec[n], 2)
  }
  return Math.sqrt(res)
}

},{}],8:[function(require,module,exports){
/**

### `dist(vec, other)`

Returns the distance between vectors `vec` and `other`:

``` javascript
var dist = require('vectors/dist')(2)
var pos1 = [2, 4]
var pos2 = [4, 4]

dist(pos1, pos2) === 2
```

**/


module.exports = generator

function generator(dims) {
  dims = +dims|0

  var body = []

  body.push('return function dist' + dims + '(vec, other) {')
      var els = []
      for (var i = 0; i < dims; i += 1) {
        body.push('var p'+i+' = other[' + i + ']-vec[' + i + ']')
        els.push('p'+i+'*p'+i)
      }
    body.push('return Math.sqrt(' + els.join(' + ') + ')')
  body.push('}')

  return Function(body.join('\n'))()
}

},{}],9:[function(require,module,exports){
module.exports = divn

function divn(vec) {
  for (var i = 1; i < arguments.length; i++) {
    if (Array.isArray(arguments[i])) {
      for (var n = 0; n < vec.length; n++) {
        vec[n] /= arguments[i][n]
      }
    } else {
      for (var n = 0; n < vec.length; n++) {
        vec[n] /= arguments[i]
      }
    }
  }

  return vec
}

},{}],10:[function(require,module,exports){
/**

### `div(vec, other[, ...])`

Divides the vector `vec` by a `other` value:

``` javascript
var div = require('vectors/div')(2)
var spd = [5, 5]

div(spd, 2) === [2.5, 2.5]
```

Or divide multiple arrays from each other:

``` javascript
var res = div([6, 6, 6], [2, 2, 2])
console.log(res) // [3, 3, 3]
```

You can disable this by passing `vectors: false` to
the generator function for faster results:

``` javascript
var sub = require('vectors/div')(2, { vectors: false })
```

**/

module.exports = require('./lib/operator')('div', '/')

},{"./lib/operator":17}],11:[function(require,module,exports){
module.exports = dotn

function dotn(vec, other) {
  var res = 0
  for (var n = 0; n < vec.length; n++) {
    res += vec[n] * other[n]
  }
  return res
}

},{}],12:[function(require,module,exports){
/**

### `dot(vec, other)`

Returns the dot product of vectors `vec` and `other`:

``` javascript
var dot = require('vectors/dot')(2)
var vecA = [15, 5]
var vecB = [10, 8]

dot(vecA, vecB) === 190
```

**/

function generator(dims) {
  dims = +dims|0

  var body = []

  body.push('return function(vec, other) {')
    var els = []
    for (var i = 0; i < dims; i += 1) {
      els.push('vec[' + i + ']*other[' + i + ']')
    }
    body.push('return ' + els.join(' + '))
  body.push('}')

  return Function(body.join('\n'))()
}

module.exports = generator

},{}],13:[function(require,module,exports){
/**

### `heading(vec, other)`

Mutliplies the vector `vec` by a `scalar` value:

``` javascript
var heading = require('vectors/heading')(2)
var a = [5, 0]
var b = [0, 5]

heading(a, b) * 180 / Math.PI === 45 // degrees
```

**/

module.exports = generator

function generator(dims) {
  dims = +dims|0

  if (dims !== 2) throw new Error(
    '`vectors.heading` only works in 2 dimensions'
  )

  return function heading(vec, other) {
    return Math.atan2(vec[1] - other[1], vec[0] - other[0])
  }
}

},{}],14:[function(require,module,exports){
/**

# vectors
[![Build Status](https://travis-ci.org/hughsk/vectors.png?branch=master)](https://travis-ci.org/hughsk/vectors)
[![unstable](http://hughsk.github.io/stability-badges/dist/unstable.svg)](http://github.com/hughsk/stability-badges)

A grab bag of vector utility functions for 2D and 3D vectors that
operate on plain arrays. Much like [cog](http://ghub.io/cog),
each method can be required individually to limit the amount of
bloat you get from using the module on the client with
[browserify](http://browserify.org).

## Installation

``` bash
npm install vectors
```

## Contributors

* [hughsk](https://github.com/hughsk)
* [shama](https://github.com/shama)

## Usage

Each method is requireable from `vectors/${method}`,
followed by calling the returned generator function
with the number of dimensions you want your vectors to be.
e.g.:

``` javascript
var mag = require('vectors/mag')(2)
var add = require('vectors/add')(3)
var sub = require('vectors/sub')(3)
```

If you want something totally generic, you can assume
in most cases that appending `-nd` to your require
will return a less performant but more flexible function:

``` javascript
var mag = require('vectors/mag-nd')
var add = require('vectors/add-nd')
var sub = require('vectors/sub-nd')
```

Most of the methods in this module support vectors of
arbitrary dimensions, but the ones that don't will throw
an error to let you know.

Each method takes a `vec` vector, which if returning a new
vector will almost always do so by *modifying it directly*:

``` javascript
var spd = [+1, 0]
var acc = [-1, 0]
var cop = copy(spd)

mag(spd)      // 1
add(spd, acc) // spd === [0, 0]
mag(spd)      // 0
mag(cop)      // 1
```

**/

module.exports = {
    add: require('./add')
  , addn: require('./add-nd')

  , sub: require('./sub')
  , subn: require('./sub-nd')

  , div: require('./div')
  , divn: require('./div-nd')

  , mult: require('./mult')
  , multn: require('./mult-nd')

  , copy: require('./copy')
  , copyn: require('./copy-nd')

  , mag: require('./mag')
  , magn: require('./mag-nd')

  , dot: require('./dot')
  , dotn: require('./dot-nd')

  , dist: require('./dist')
  , distn: require('./dist-nd')

  , lerp: require('./lerp')
  , lerpn: require('./lerp-nd')

  , cross: require('./cross')
  , crossn: require('./cross-nd')

  , limit: require('./limit')
  , limitn: require('./limit-nd')

  , heading: require('./heading')

  , normalize: require('./normalize')
  , normalizen: require('./normalize-nd')
}

},{"./add":2,"./add-nd":1,"./copy":4,"./copy-nd":3,"./cross":6,"./cross-nd":5,"./dist":8,"./dist-nd":7,"./div":10,"./div-nd":9,"./dot":12,"./dot-nd":11,"./heading":13,"./lerp":16,"./lerp-nd":15,"./limit":19,"./limit-nd":18,"./mag":21,"./mag-nd":20,"./mult":23,"./mult-nd":22,"./normalize":25,"./normalize-nd":24,"./sub":27,"./sub-nd":26}],15:[function(require,module,exports){
module.exports = lerpn

function lerpn(vec, a, b, scalar) {
  for (var n = 0; n < a.length; n++) {
    vec[n] = a[n] + (b[n] - a[n]) * scalar
  }
  return vec
}

},{}],16:[function(require,module,exports){
/**

### `lerp(vec, start, finish, scalar)`

Set `vec` to the linear interpolation between vectors `start`
and `finish`:

``` javascript
var lerp = require('vectors/lerp')(2)
var start = [0, 0]
var finish = [100, 100]

lerp([], start, finish, 0.75) === [75, 75]
```

**/

module.exports = generator

function generator(dims) {
  dims = +dims|0

  var body = []

  body.push('return function lerp' + dims + '(vec, a, b, scalar) {')
    for (var i = 0; i < dims; i += 1) {
      body.push(
        'vec[$] = a[$] + (b[$] - a[$]) * scalar'.replace(/\$/g, i)
      )
    }
    body.push('return vec')
  body.push('}')

  return Function(body.join('\n'))()
}

},{}],17:[function(require,module,exports){
module.exports = operator

function operator(name, op) {
  return function generator(dims, opts) {
    dims = +dims|0
    opts = opts || {}

    var scalars = 'scalars' in opts
      ? opts.scalars : true
    var vectors = 'vectors' in opts
      ? opts.vectors : true

    var both = scalars && vectors
    var body = []

    if (!scalars && !vectors) throw new Error(
      'Your function must accept either scalars or vectors'
    )

    body.push('return function ' + name + dims + '(vec) {')
      body.push('var i = arguments.length')
      body.push('while (--i) {')
        if (both) body.push('if (Array.isArray(arguments[i])) {')
        if (vectors) {
          for (var i = 0; i < dims; i += 1) {
            body.push('vec[' + i + '] ' + op + '= arguments[i][' + i + ']')
          }
        }
        if (both) body.push('} else {')
        if (scalars) {
          for (var i = 0; i < dims; i += 1) {
            body.push('vec[' + i + '] ' + op + '= arguments[i]')
          }
        }
        if (both) body.push('}')
      body.push('}')
      body.push('return vec')
    body.push('}')

    return Function(body.join('\n'))()
  }
}

},{}],18:[function(require,module,exports){
module.exports = limitn

function limitn(vec, scalar) {
  var mag = 0
  for (var n = 0; n < vec.length; n++) {
    mag += vec[n]*vec[n]
  }

  if (mag > scalar*scalar) {
    mag = Math.sqrt(mag)
    for (var n = 0; n < vec.length; n++) {
      vec[n] = vec[n] * scalar / mag
    }
  }

  return vec
}

},{}],19:[function(require,module,exports){
/**

### `limit(vec, scalar)`

Limits the vector `vec` to a magnitude of `scalar` units.

``` javascript
var limit = require('vectors/limit')(2)

limit([3, 0], 2)  === [2, 0]
limit([3, 4], 1)  === [0.6, 0.8]
limit([5, 5], 24) === [5, 5]
```

**/

module.exports = generator

function generator(dims) {
  dims = +dims|0

  var body = []

  body.push('return function limit' + dims + '(vec, scalar) {')
    var mag = []
    for (var i = 0; i < dims; i += 1) {
      mag.push('vec[' + i + '] * vec[' + i + ']')
    }
    body.push('var mag = ' + mag.join('+'))

    body.push('if (mag > scalar*scalar) {')
      body.push('mag = Math.sqrt(mag)')
      for (var i = 0; i < dims; i += 1) {
        body.push('vec[' + i + '] = vec[' + i + '] * scalar / mag')
      }
    body.push('}')
    body.push('return vec')
  body.push('}')

  return Function(body.join('\n'))()
}

},{}],20:[function(require,module,exports){
module.exports = magn

function magn(vec) {
  var res = 0
  for (var n = 0; n < vec.length; n++) {
    res += vec[n]*vec[n]
  }
  return Math.sqrt(res)
}

},{}],21:[function(require,module,exports){
/**

### `mag(vec)`

Returns the magnitude of the vector:

``` javascript
var mag = require('vectors/mag')(2)
var spd = [2, 4]

mag(spd) === 4.47213595499958
```

**/

module.exports = generator

function generator(dims) {
  dims = +dims|0

  var body = []

  body.push('return function mag' + dims + '(vec) {')
    body.push('return Math.sqrt(')
    var contents = []
    for (var i = 0; i < dims; i += 1) {
      contents.push('vec[' + i + ']*vec[' + i + ']')
    }
    body.push(contents.join('+'))
    body.push(')')
  body.push('}')

  return Function(body.join('\n'))()
}

},{}],22:[function(require,module,exports){
module.exports = multn

function multn(vec) {
  for (var i = 1; i < arguments.length; i++) {
    if (Array.isArray(arguments[i])) {
      for (var n = 0; n < vec.length; n++) {
        vec[n] *= arguments[i][n]
      }
    } else {
      for (var n = 0; n < vec.length; n++) {
        vec[n] *= arguments[i]
      }
    }
  }

  return vec
}

},{}],23:[function(require,module,exports){
/**

### `mult(vec, other[, ...])`

Mutliplies the vector `vec` by a `other` value:

``` javascript
var mult = require('vectors/mult')(2)
var spd = [5, 5]

mult(spd, 2) === [10, 10]
```

Or multiply multiple arrays:

``` javascript
var res = mult([2, 2, 2], [4, 4, 4])
console.log(res) // [8, 8, 8]
```

You can disable this by passing `vectors: false` to
the generator function for faster results:

``` javascript
var sub = require('vectors/mult')(2, { vectors: false })
```

**/

module.exports = require('./lib/operator')('mult', '*')

},{"./lib/operator":17}],24:[function(require,module,exports){
module.exports = normalize

function normalize(vec) {
  var mag = 0
  for (var n = 0; n < vec.length; n++) {
    mag += vec[n] * vec[n]
  }
  mag = Math.sqrt(mag)

  // avoid dividing by zero
  if (mag === 0) {
    return Array.apply(null, new Array(vec.length)).map(Number.prototype.valueOf, 0)
  }

  for (var n = 0; n < vec.length; n++) {
    vec[n] /= mag
  }

  return vec
}

},{}],25:[function(require,module,exports){
/**

### `normalize(vec, scalar)`

Normalizes the vector (i.e. scales it to make its
distance 1 unit).

``` javascript
var normalize = require('vectors/normalize')(2)

normalize([3, 0])  === [1, 0]
normalize([4, 3])  === [0.8, 0.6]
```

**/

module.exports = generator

function generator(dims) {
  dims = +dims|0

  var body = []

  body.push('return function normalize'+dims+'(vec, scalar) {')
    var els = []
    for (var i = 0; i < dims; i += 1) {
      els.push('vec['+i+']*vec['+i+']')
    }
    body.push('var mag = Math.sqrt(' + els.join('+') + ')')

    body.push('if (mag === 0) {')
      for (var i = 0; i < dims; i += 1) {
        body.push('vec['+i+'] = 0')
      }
    body.push('} else {')
      for (var i = 0; i < dims; i += 1) {
        body.push('vec['+i+'] /= mag')
      }
    body.push('}')
    body.push('return vec')

  body.push('}')

  return Function(body.join('\n'))()
}

},{}],26:[function(require,module,exports){
module.exports = subn

function subn(vec) {
  for (var i = 1; i < arguments.length; i++) {
    if (Array.isArray(arguments[i])) {
      for (var n = 0; n < vec.length; n++) {
        vec[n] -= arguments[i][n]
      }
    } else {
      for (var n = 0; n < vec.length; n++) {
        vec[n] -= arguments[i]
      }
    }
  }

  return vec
}

},{}],27:[function(require,module,exports){
/**

### `sub(vec, other[, ...])`

Subtracts the `other` vector from `vec`:

``` javascript
var sub = require('vectors/sub')(2)
var pos = [0, 0]
var spd = [1, 1.5]

sub(pos, spd)
sub(pos, spd)

console.log(pos) // [-2, -3]
```

Or subtract a scalar from the entire array:

``` javascript
var res = sub([9, 8, 7], 6)
console.log(res) // [3, 2, 1]
```

You can disable this by passing `scalars: false` to
the generator function for faster results:

``` javascript
var sub = require('vectors/sub')(2, { scalars: false })
```

**/

module.exports = require('./lib/operator')('sub', '-')

},{"./lib/operator":17}],28:[function(require,module,exports){
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

},{"vectors":14}],29:[function(require,module,exports){

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


},{"../simulator.js":28}]},{},[29])
;