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
    context.arc(point[0], point[1], 5,0,2*Math.PI);
    context.closePath();
}

function drawPoints() {
    //requestAnimationFrame(drawPoints)
    //context.clearRect(0,0,myCanvas.width,myCanvas.height);
    drawBox();
    nstate = sim(position, velocity, ground, dt, poly.slice(0), polyHasGround);
    position = nstate.position;
    velocity = nstate.velocity;

    for (var i=0; i < nstate.position.length; i++) {
        drawPoint(transformCoords(nstate.position[i][0], nstate.position[i][1], scale, topLeft))
        velocs.innerHTML = nstate.velocity[i]
    }
}

drawPoint([30,30])

function parseField(data) {
    //regex:
    // -?        : optional minus sign
    // [\d\.]+   : one or more digits or .
    // [^\d\.]+  : one or more characters that aren't digits or .
    return data.match(/-?[\d\.]+[^\d\.]+-?[\d\.]+/g).map(function(x){return x.split(/[^\d\.-]/)})
}

function checkPositions(event) {
    data = parseField(posField.value)
        console.log(data)
    for (var i=0; i < data.length; i++) {
        drawPoint(transformCoords(data[i][0],data[i][1],scale, topLeft))
    }
}

posField.addEventListener("onKeyUp",checkPositions)

setInterval(drawPoints,1000*dt)

},{"../simulator.js":28}]},{},[29])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS9hbmRyZXcvUmVwb3NpdG9yaWVzL0NTNTU4LUFzc2lnbm1lbnQxL25vZGVfbW9kdWxlcy92ZWN0b3JzL2FkZC1uZC5qcyIsIi9ob21lL2FuZHJldy9SZXBvc2l0b3JpZXMvQ1M1NTgtQXNzaWdubWVudDEvbm9kZV9tb2R1bGVzL3ZlY3RvcnMvYWRkLmpzIiwiL2hvbWUvYW5kcmV3L1JlcG9zaXRvcmllcy9DUzU1OC1Bc3NpZ25tZW50MS9ub2RlX21vZHVsZXMvdmVjdG9ycy9jb3B5LW5kLmpzIiwiL2hvbWUvYW5kcmV3L1JlcG9zaXRvcmllcy9DUzU1OC1Bc3NpZ25tZW50MS9ub2RlX21vZHVsZXMvdmVjdG9ycy9jb3B5LmpzIiwiL2hvbWUvYW5kcmV3L1JlcG9zaXRvcmllcy9DUzU1OC1Bc3NpZ25tZW50MS9ub2RlX21vZHVsZXMvdmVjdG9ycy9jcm9zcy1uZC5qcyIsIi9ob21lL2FuZHJldy9SZXBvc2l0b3JpZXMvQ1M1NTgtQXNzaWdubWVudDEvbm9kZV9tb2R1bGVzL3ZlY3RvcnMvY3Jvc3MuanMiLCIvaG9tZS9hbmRyZXcvUmVwb3NpdG9yaWVzL0NTNTU4LUFzc2lnbm1lbnQxL25vZGVfbW9kdWxlcy92ZWN0b3JzL2Rpc3QtbmQuanMiLCIvaG9tZS9hbmRyZXcvUmVwb3NpdG9yaWVzL0NTNTU4LUFzc2lnbm1lbnQxL25vZGVfbW9kdWxlcy92ZWN0b3JzL2Rpc3QuanMiLCIvaG9tZS9hbmRyZXcvUmVwb3NpdG9yaWVzL0NTNTU4LUFzc2lnbm1lbnQxL25vZGVfbW9kdWxlcy92ZWN0b3JzL2Rpdi1uZC5qcyIsIi9ob21lL2FuZHJldy9SZXBvc2l0b3JpZXMvQ1M1NTgtQXNzaWdubWVudDEvbm9kZV9tb2R1bGVzL3ZlY3RvcnMvZGl2LmpzIiwiL2hvbWUvYW5kcmV3L1JlcG9zaXRvcmllcy9DUzU1OC1Bc3NpZ25tZW50MS9ub2RlX21vZHVsZXMvdmVjdG9ycy9kb3QtbmQuanMiLCIvaG9tZS9hbmRyZXcvUmVwb3NpdG9yaWVzL0NTNTU4LUFzc2lnbm1lbnQxL25vZGVfbW9kdWxlcy92ZWN0b3JzL2RvdC5qcyIsIi9ob21lL2FuZHJldy9SZXBvc2l0b3JpZXMvQ1M1NTgtQXNzaWdubWVudDEvbm9kZV9tb2R1bGVzL3ZlY3RvcnMvaGVhZGluZy5qcyIsIi9ob21lL2FuZHJldy9SZXBvc2l0b3JpZXMvQ1M1NTgtQXNzaWdubWVudDEvbm9kZV9tb2R1bGVzL3ZlY3RvcnMvaW5kZXguanMiLCIvaG9tZS9hbmRyZXcvUmVwb3NpdG9yaWVzL0NTNTU4LUFzc2lnbm1lbnQxL25vZGVfbW9kdWxlcy92ZWN0b3JzL2xlcnAtbmQuanMiLCIvaG9tZS9hbmRyZXcvUmVwb3NpdG9yaWVzL0NTNTU4LUFzc2lnbm1lbnQxL25vZGVfbW9kdWxlcy92ZWN0b3JzL2xlcnAuanMiLCIvaG9tZS9hbmRyZXcvUmVwb3NpdG9yaWVzL0NTNTU4LUFzc2lnbm1lbnQxL25vZGVfbW9kdWxlcy92ZWN0b3JzL2xpYi9vcGVyYXRvci5qcyIsIi9ob21lL2FuZHJldy9SZXBvc2l0b3JpZXMvQ1M1NTgtQXNzaWdubWVudDEvbm9kZV9tb2R1bGVzL3ZlY3RvcnMvbGltaXQtbmQuanMiLCIvaG9tZS9hbmRyZXcvUmVwb3NpdG9yaWVzL0NTNTU4LUFzc2lnbm1lbnQxL25vZGVfbW9kdWxlcy92ZWN0b3JzL2xpbWl0LmpzIiwiL2hvbWUvYW5kcmV3L1JlcG9zaXRvcmllcy9DUzU1OC1Bc3NpZ25tZW50MS9ub2RlX21vZHVsZXMvdmVjdG9ycy9tYWctbmQuanMiLCIvaG9tZS9hbmRyZXcvUmVwb3NpdG9yaWVzL0NTNTU4LUFzc2lnbm1lbnQxL25vZGVfbW9kdWxlcy92ZWN0b3JzL21hZy5qcyIsIi9ob21lL2FuZHJldy9SZXBvc2l0b3JpZXMvQ1M1NTgtQXNzaWdubWVudDEvbm9kZV9tb2R1bGVzL3ZlY3RvcnMvbXVsdC1uZC5qcyIsIi9ob21lL2FuZHJldy9SZXBvc2l0b3JpZXMvQ1M1NTgtQXNzaWdubWVudDEvbm9kZV9tb2R1bGVzL3ZlY3RvcnMvbXVsdC5qcyIsIi9ob21lL2FuZHJldy9SZXBvc2l0b3JpZXMvQ1M1NTgtQXNzaWdubWVudDEvbm9kZV9tb2R1bGVzL3ZlY3RvcnMvbm9ybWFsaXplLW5kLmpzIiwiL2hvbWUvYW5kcmV3L1JlcG9zaXRvcmllcy9DUzU1OC1Bc3NpZ25tZW50MS9ub2RlX21vZHVsZXMvdmVjdG9ycy9ub3JtYWxpemUuanMiLCIvaG9tZS9hbmRyZXcvUmVwb3NpdG9yaWVzL0NTNTU4LUFzc2lnbm1lbnQxL25vZGVfbW9kdWxlcy92ZWN0b3JzL3N1Yi1uZC5qcyIsIi9ob21lL2FuZHJldy9SZXBvc2l0b3JpZXMvQ1M1NTgtQXNzaWdubWVudDEvbm9kZV9tb2R1bGVzL3ZlY3RvcnMvc3ViLmpzIiwiL2hvbWUvYW5kcmV3L1JlcG9zaXRvcmllcy9DUzU1OC1Bc3NpZ25tZW50MS9zaW11bGF0b3IuanMiLCIvaG9tZS9hbmRyZXcvUmVwb3NpdG9yaWVzL0NTNTU4LUFzc2lnbm1lbnQxL3Zpc3VhbGl6ZXIvdmlzdWFsaXplci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gYWRkblxuXG5mdW5jdGlvbiBhZGRuKHZlYykge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFyZ3VtZW50c1tpXSkpIHtcbiAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgdmVjLmxlbmd0aDsgbisrKSB7XG4gICAgICAgIHZlY1tuXSArPSBhcmd1bWVudHNbaV1bbl1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCB2ZWMubGVuZ3RoOyBuKyspIHtcbiAgICAgICAgdmVjW25dICs9IGFyZ3VtZW50c1tpXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2ZWNcbn1cbiIsIi8qKlxuXG4jIyMgYGFkZCh2ZWMsIG90aGVyWywgLi4uXSlgXG5cbkFkZHMgdGhlIGBvdGhlcmAgdmVjdG9yIHRvIGB2ZWNgOlxuXG5gYGAgamF2YXNjcmlwdFxudmFyIGFkZCA9IHJlcXVpcmUoJ3ZlY3RvcnMvYWRkJykoMilcbnZhciBwb3MgPSBbMCwgMF1cbnZhciBzcGQgPSBbMSwgMS41XVxuXG5hZGQocG9zLCBzcGQpXG5hZGQocG9zLCBzcGQpXG5cbmNvbnNvbGUubG9nKHBvcykgLy8gWzIsIDNdXG5gYGBcblxuT3IgYWRkIGEgc2NhbGFyIHRvIHRoZSBlbnRpcmUgYXJyYXk6XG5cbmBgYCBqYXZhc2NyaXB0XG52YXIgcmVzID0gYWRkKFsxLCAxLCAxXSwgNilcbmNvbnNvbGUubG9nKHJlcykgLy8gWzcsIDcsIDddXG5gYGBcblxuWW91IGNhbiBkaXNhYmxlIHRoaXMgYnkgcGFzc2luZyBgc2NhbGFyczogZmFsc2VgIHRvXG50aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uIGZvciBmYXN0ZXIgcmVzdWx0czpcblxuYGBgIGphdmFzY3JpcHRcbnZhciBhZGQgPSByZXF1aXJlKCd2ZWN0b3JzL2FkZCcpKDIsIHsgc2NhbGFyczogZmFsc2UgfSlcbmBgYFxuXG4qKi9cblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9vcGVyYXRvcicpKCdhZGQnLCAnKycpXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29weScpKClcbiIsIi8qKlxuXG4jIyMgYGNvcHkodmVjKWBcblxuUmV0dXJucyBhIGNvcHkgb2YgdGhlIHZlY3RvciBgdmVjYDpcblxuYGBgIGphdmFzY3JpcHRcbnZhciBjb3B5ID0gcmVxdWlyZSgndmVjdG9ycy9jb3B5JykoMilcbnZhciBzcGQgPSBbNSwgNV1cblxudmFyIGNvcCA9IGNvcHkoc3BkKVxubXVsdChzcGQsIDEwMCkgPT09IFsxMDAsIDEwMF1cbmNvcCA9PT0gWzUsIDVdXG5gYGBcblxuKiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBjb3B5XG59XG5cbmZ1bmN0aW9uIGNvcHkodmVjKSB7XG4gIHJldHVybiB2ZWMuc2xpY2UoMClcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gY3Jvc3NuXG5cbmZ1bmN0aW9uIGNyb3Nzbih2ZWMsIG90aGVyKSB7XG4gIHJldHVybiB2ZWMubGVuZ3RoIDwgMyA/IChcbiAgICB2ZWNbMF0gKiBvdGhlclsxXSAtXG4gICAgdmVjWzFdICogb3RoZXJbMF1cbiAgKSA6IFtcbiAgICAodmVjWzFdICogb3RoZXJbMl0pIC0gKHZlY1syXSAqIG90aGVyWzFdKSxcbiAgICAodmVjWzJdICogb3RoZXJbMF0pIC0gKHZlY1swXSAqIG90aGVyWzJdKSxcbiAgICAodmVjWzBdICogb3RoZXJbMV0pIC0gKHZlY1sxXSAqIG90aGVyWzBdKVxuICBdXG59XG4iLCIvKipcblxuIyMjIGBjcm9zcyh2ZWMsIG90aGVyKWBcblxuUmV0dXJucyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB2ZWN0b3JzIGB2ZWNgIGFuZCBgb3RoZXJgOlxuXG5gYGAgamF2YXNjcmlwdFxudmFyIGNyb3NzID0gcmVxdWlyZSgndmVjdG9ycy9jcm9zcycpKDIpXG52YXIgYSA9IFsxLCAyXVxudmFyIGIgPSBbOCwgNF1cblxuY3Jvc3MoYSwgYikgPT09IC0xMlxuYGBgXG5cblRoaXMgbWV0aG9kIG9ubHkgd29ya3MgaW4gMiBhbmQgMyBkaW1lbnNpb25zLlxuXG4qKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZW5lcmF0b3IoZGltcykge1xuICBkaW1zID0gK2RpbXN8MFxuICBpZiAoZGltcyA9PT0gMikgcmV0dXJuIGNyb3NzMlxuICBpZiAoZGltcyA9PT0gMykgcmV0dXJuIGNyb3NzM1xuICB0aHJvdyBuZXcgRXJyb3IoJ2Nyb3NzIHByb2R1Y3Qgb25seSBzdXBwb3J0ZWQgZm9yIDIgYW5kIDMgZGltZW5zaW9ucycpXG59XG5cbmZ1bmN0aW9uIGNyb3NzMih2ZWMsIG90aGVyKSB7XG4gIHJldHVybiAoXG4gICAgdmVjWzBdICogb3RoZXJbMV0gLVxuICAgIHZlY1sxXSAqIG90aGVyWzBdXG4gIClcbn1cblxuZnVuY3Rpb24gY3Jvc3MzKHZlYywgb3RoZXIpIHtcbiAgcmV0dXJuIFtcbiAgICAodmVjWzFdICogb3RoZXJbMl0pIC0gKHZlY1syXSAqIG90aGVyWzFdKSxcbiAgICAodmVjWzJdICogb3RoZXJbMF0pIC0gKHZlY1swXSAqIG90aGVyWzJdKSxcbiAgICAodmVjWzBdICogb3RoZXJbMV0pIC0gKHZlY1sxXSAqIG90aGVyWzBdKVxuICBdXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGRpc3RuXG5cbmZ1bmN0aW9uIGRpc3RuKHZlYywgb3RoZXIpIHtcbiAgdmFyIHJlcyA9IDBcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCB2ZWMubGVuZ3RoOyBuKyspIHtcbiAgICByZXMgKz0gTWF0aC5wb3cob3RoZXJbbl0gLSB2ZWNbbl0sIDIpXG4gIH1cbiAgcmV0dXJuIE1hdGguc3FydChyZXMpXG59XG4iLCIvKipcblxuIyMjIGBkaXN0KHZlYywgb3RoZXIpYFxuXG5SZXR1cm5zIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHZlY3RvcnMgYHZlY2AgYW5kIGBvdGhlcmA6XG5cbmBgYCBqYXZhc2NyaXB0XG52YXIgZGlzdCA9IHJlcXVpcmUoJ3ZlY3RvcnMvZGlzdCcpKDIpXG52YXIgcG9zMSA9IFsyLCA0XVxudmFyIHBvczIgPSBbNCwgNF1cblxuZGlzdChwb3MxLCBwb3MyKSA9PT0gMlxuYGBgXG5cbioqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdG9yXG5cbmZ1bmN0aW9uIGdlbmVyYXRvcihkaW1zKSB7XG4gIGRpbXMgPSArZGltc3wwXG5cbiAgdmFyIGJvZHkgPSBbXVxuXG4gIGJvZHkucHVzaCgncmV0dXJuIGZ1bmN0aW9uIGRpc3QnICsgZGltcyArICcodmVjLCBvdGhlcikgeycpXG4gICAgICB2YXIgZWxzID0gW11cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGltczsgaSArPSAxKSB7XG4gICAgICAgIGJvZHkucHVzaCgndmFyIHAnK2krJyA9IG90aGVyWycgKyBpICsgJ10tdmVjWycgKyBpICsgJ10nKVxuICAgICAgICBlbHMucHVzaCgncCcraSsnKnAnK2kpXG4gICAgICB9XG4gICAgYm9keS5wdXNoKCdyZXR1cm4gTWF0aC5zcXJ0KCcgKyBlbHMuam9pbignICsgJykgKyAnKScpXG4gIGJvZHkucHVzaCgnfScpXG5cbiAgcmV0dXJuIEZ1bmN0aW9uKGJvZHkuam9pbignXFxuJykpKClcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZGl2blxuXG5mdW5jdGlvbiBkaXZuKHZlYykge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFyZ3VtZW50c1tpXSkpIHtcbiAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgdmVjLmxlbmd0aDsgbisrKSB7XG4gICAgICAgIHZlY1tuXSAvPSBhcmd1bWVudHNbaV1bbl1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCB2ZWMubGVuZ3RoOyBuKyspIHtcbiAgICAgICAgdmVjW25dIC89IGFyZ3VtZW50c1tpXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2ZWNcbn1cbiIsIi8qKlxuXG4jIyMgYGRpdih2ZWMsIG90aGVyWywgLi4uXSlgXG5cbkRpdmlkZXMgdGhlIHZlY3RvciBgdmVjYCBieSBhIGBvdGhlcmAgdmFsdWU6XG5cbmBgYCBqYXZhc2NyaXB0XG52YXIgZGl2ID0gcmVxdWlyZSgndmVjdG9ycy9kaXYnKSgyKVxudmFyIHNwZCA9IFs1LCA1XVxuXG5kaXYoc3BkLCAyKSA9PT0gWzIuNSwgMi41XVxuYGBgXG5cbk9yIGRpdmlkZSBtdWx0aXBsZSBhcnJheXMgZnJvbSBlYWNoIG90aGVyOlxuXG5gYGAgamF2YXNjcmlwdFxudmFyIHJlcyA9IGRpdihbNiwgNiwgNl0sIFsyLCAyLCAyXSlcbmNvbnNvbGUubG9nKHJlcykgLy8gWzMsIDMsIDNdXG5gYGBcblxuWW91IGNhbiBkaXNhYmxlIHRoaXMgYnkgcGFzc2luZyBgdmVjdG9yczogZmFsc2VgIHRvXG50aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uIGZvciBmYXN0ZXIgcmVzdWx0czpcblxuYGBgIGphdmFzY3JpcHRcbnZhciBzdWIgPSByZXF1aXJlKCd2ZWN0b3JzL2RpdicpKDIsIHsgdmVjdG9yczogZmFsc2UgfSlcbmBgYFxuXG4qKi9cblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9vcGVyYXRvcicpKCdkaXYnLCAnLycpXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGRvdG5cblxuZnVuY3Rpb24gZG90bih2ZWMsIG90aGVyKSB7XG4gIHZhciByZXMgPSAwXG4gIGZvciAodmFyIG4gPSAwOyBuIDwgdmVjLmxlbmd0aDsgbisrKSB7XG4gICAgcmVzICs9IHZlY1tuXSAqIG90aGVyW25dXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuIiwiLyoqXG5cbiMjIyBgZG90KHZlYywgb3RoZXIpYFxuXG5SZXR1cm5zIHRoZSBkb3QgcHJvZHVjdCBvZiB2ZWN0b3JzIGB2ZWNgIGFuZCBgb3RoZXJgOlxuXG5gYGAgamF2YXNjcmlwdFxudmFyIGRvdCA9IHJlcXVpcmUoJ3ZlY3RvcnMvZG90JykoMilcbnZhciB2ZWNBID0gWzE1LCA1XVxudmFyIHZlY0IgPSBbMTAsIDhdXG5cbmRvdCh2ZWNBLCB2ZWNCKSA9PT0gMTkwXG5gYGBcblxuKiovXG5cbmZ1bmN0aW9uIGdlbmVyYXRvcihkaW1zKSB7XG4gIGRpbXMgPSArZGltc3wwXG5cbiAgdmFyIGJvZHkgPSBbXVxuXG4gIGJvZHkucHVzaCgncmV0dXJuIGZ1bmN0aW9uKHZlYywgb3RoZXIpIHsnKVxuICAgIHZhciBlbHMgPSBbXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGltczsgaSArPSAxKSB7XG4gICAgICBlbHMucHVzaCgndmVjWycgKyBpICsgJ10qb3RoZXJbJyArIGkgKyAnXScpXG4gICAgfVxuICAgIGJvZHkucHVzaCgncmV0dXJuICcgKyBlbHMuam9pbignICsgJykpXG4gIGJvZHkucHVzaCgnfScpXG5cbiAgcmV0dXJuIEZ1bmN0aW9uKGJvZHkuam9pbignXFxuJykpKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0b3JcbiIsIi8qKlxuXG4jIyMgYGhlYWRpbmcodmVjLCBvdGhlcilgXG5cbk11dGxpcGxpZXMgdGhlIHZlY3RvciBgdmVjYCBieSBhIGBzY2FsYXJgIHZhbHVlOlxuXG5gYGAgamF2YXNjcmlwdFxudmFyIGhlYWRpbmcgPSByZXF1aXJlKCd2ZWN0b3JzL2hlYWRpbmcnKSgyKVxudmFyIGEgPSBbNSwgMF1cbnZhciBiID0gWzAsIDVdXG5cbmhlYWRpbmcoYSwgYikgKiAxODAgLyBNYXRoLlBJID09PSA0NSAvLyBkZWdyZWVzXG5gYGBcblxuKiovXG5cbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdG9yXG5cbmZ1bmN0aW9uIGdlbmVyYXRvcihkaW1zKSB7XG4gIGRpbXMgPSArZGltc3wwXG5cbiAgaWYgKGRpbXMgIT09IDIpIHRocm93IG5ldyBFcnJvcihcbiAgICAnYHZlY3RvcnMuaGVhZGluZ2Agb25seSB3b3JrcyBpbiAyIGRpbWVuc2lvbnMnXG4gIClcblxuICByZXR1cm4gZnVuY3Rpb24gaGVhZGluZyh2ZWMsIG90aGVyKSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIodmVjWzFdIC0gb3RoZXJbMV0sIHZlY1swXSAtIG90aGVyWzBdKVxuICB9XG59XG4iLCIvKipcblxuIyB2ZWN0b3JzXG5bIVtCdWlsZCBTdGF0dXNdKGh0dHBzOi8vdHJhdmlzLWNpLm9yZy9odWdoc2svdmVjdG9ycy5wbmc/YnJhbmNoPW1hc3RlcildKGh0dHBzOi8vdHJhdmlzLWNpLm9yZy9odWdoc2svdmVjdG9ycylcblshW3Vuc3RhYmxlXShodHRwOi8vaHVnaHNrLmdpdGh1Yi5pby9zdGFiaWxpdHktYmFkZ2VzL2Rpc3QvdW5zdGFibGUuc3ZnKV0oaHR0cDovL2dpdGh1Yi5jb20vaHVnaHNrL3N0YWJpbGl0eS1iYWRnZXMpXG5cbkEgZ3JhYiBiYWcgb2YgdmVjdG9yIHV0aWxpdHkgZnVuY3Rpb25zIGZvciAyRCBhbmQgM0QgdmVjdG9ycyB0aGF0XG5vcGVyYXRlIG9uIHBsYWluIGFycmF5cy4gTXVjaCBsaWtlIFtjb2ddKGh0dHA6Ly9naHViLmlvL2NvZyksXG5lYWNoIG1ldGhvZCBjYW4gYmUgcmVxdWlyZWQgaW5kaXZpZHVhbGx5IHRvIGxpbWl0IHRoZSBhbW91bnQgb2ZcbmJsb2F0IHlvdSBnZXQgZnJvbSB1c2luZyB0aGUgbW9kdWxlIG9uIHRoZSBjbGllbnQgd2l0aFxuW2Jyb3dzZXJpZnldKGh0dHA6Ly9icm93c2VyaWZ5Lm9yZykuXG5cbiMjIEluc3RhbGxhdGlvblxuXG5gYGAgYmFzaFxubnBtIGluc3RhbGwgdmVjdG9yc1xuYGBgXG5cbiMjIENvbnRyaWJ1dG9yc1xuXG4qIFtodWdoc2tdKGh0dHBzOi8vZ2l0aHViLmNvbS9odWdoc2spXG4qIFtzaGFtYV0oaHR0cHM6Ly9naXRodWIuY29tL3NoYW1hKVxuXG4jIyBVc2FnZVxuXG5FYWNoIG1ldGhvZCBpcyByZXF1aXJlYWJsZSBmcm9tIGB2ZWN0b3JzLyR7bWV0aG9kfWAsXG5mb2xsb3dlZCBieSBjYWxsaW5nIHRoZSByZXR1cm5lZCBnZW5lcmF0b3IgZnVuY3Rpb25cbndpdGggdGhlIG51bWJlciBvZiBkaW1lbnNpb25zIHlvdSB3YW50IHlvdXIgdmVjdG9ycyB0byBiZS5cbmUuZy46XG5cbmBgYCBqYXZhc2NyaXB0XG52YXIgbWFnID0gcmVxdWlyZSgndmVjdG9ycy9tYWcnKSgyKVxudmFyIGFkZCA9IHJlcXVpcmUoJ3ZlY3RvcnMvYWRkJykoMylcbnZhciBzdWIgPSByZXF1aXJlKCd2ZWN0b3JzL3N1YicpKDMpXG5gYGBcblxuSWYgeW91IHdhbnQgc29tZXRoaW5nIHRvdGFsbHkgZ2VuZXJpYywgeW91IGNhbiBhc3N1bWVcbmluIG1vc3QgY2FzZXMgdGhhdCBhcHBlbmRpbmcgYC1uZGAgdG8geW91ciByZXF1aXJlXG53aWxsIHJldHVybiBhIGxlc3MgcGVyZm9ybWFudCBidXQgbW9yZSBmbGV4aWJsZSBmdW5jdGlvbjpcblxuYGBgIGphdmFzY3JpcHRcbnZhciBtYWcgPSByZXF1aXJlKCd2ZWN0b3JzL21hZy1uZCcpXG52YXIgYWRkID0gcmVxdWlyZSgndmVjdG9ycy9hZGQtbmQnKVxudmFyIHN1YiA9IHJlcXVpcmUoJ3ZlY3RvcnMvc3ViLW5kJylcbmBgYFxuXG5Nb3N0IG9mIHRoZSBtZXRob2RzIGluIHRoaXMgbW9kdWxlIHN1cHBvcnQgdmVjdG9ycyBvZlxuYXJiaXRyYXJ5IGRpbWVuc2lvbnMsIGJ1dCB0aGUgb25lcyB0aGF0IGRvbid0IHdpbGwgdGhyb3dcbmFuIGVycm9yIHRvIGxldCB5b3Uga25vdy5cblxuRWFjaCBtZXRob2QgdGFrZXMgYSBgdmVjYCB2ZWN0b3IsIHdoaWNoIGlmIHJldHVybmluZyBhIG5ld1xudmVjdG9yIHdpbGwgYWxtb3N0IGFsd2F5cyBkbyBzbyBieSAqbW9kaWZ5aW5nIGl0IGRpcmVjdGx5KjpcblxuYGBgIGphdmFzY3JpcHRcbnZhciBzcGQgPSBbKzEsIDBdXG52YXIgYWNjID0gWy0xLCAwXVxudmFyIGNvcCA9IGNvcHkoc3BkKVxuXG5tYWcoc3BkKSAgICAgIC8vIDFcbmFkZChzcGQsIGFjYykgLy8gc3BkID09PSBbMCwgMF1cbm1hZyhzcGQpICAgICAgLy8gMFxubWFnKGNvcCkgICAgICAvLyAxXG5gYGBcblxuKiovXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFkZDogcmVxdWlyZSgnLi9hZGQnKVxuICAsIGFkZG46IHJlcXVpcmUoJy4vYWRkLW5kJylcblxuICAsIHN1YjogcmVxdWlyZSgnLi9zdWInKVxuICAsIHN1Ym46IHJlcXVpcmUoJy4vc3ViLW5kJylcblxuICAsIGRpdjogcmVxdWlyZSgnLi9kaXYnKVxuICAsIGRpdm46IHJlcXVpcmUoJy4vZGl2LW5kJylcblxuICAsIG11bHQ6IHJlcXVpcmUoJy4vbXVsdCcpXG4gICwgbXVsdG46IHJlcXVpcmUoJy4vbXVsdC1uZCcpXG5cbiAgLCBjb3B5OiByZXF1aXJlKCcuL2NvcHknKVxuICAsIGNvcHluOiByZXF1aXJlKCcuL2NvcHktbmQnKVxuXG4gICwgbWFnOiByZXF1aXJlKCcuL21hZycpXG4gICwgbWFnbjogcmVxdWlyZSgnLi9tYWctbmQnKVxuXG4gICwgZG90OiByZXF1aXJlKCcuL2RvdCcpXG4gICwgZG90bjogcmVxdWlyZSgnLi9kb3QtbmQnKVxuXG4gICwgZGlzdDogcmVxdWlyZSgnLi9kaXN0JylcbiAgLCBkaXN0bjogcmVxdWlyZSgnLi9kaXN0LW5kJylcblxuICAsIGxlcnA6IHJlcXVpcmUoJy4vbGVycCcpXG4gICwgbGVycG46IHJlcXVpcmUoJy4vbGVycC1uZCcpXG5cbiAgLCBjcm9zczogcmVxdWlyZSgnLi9jcm9zcycpXG4gICwgY3Jvc3NuOiByZXF1aXJlKCcuL2Nyb3NzLW5kJylcblxuICAsIGxpbWl0OiByZXF1aXJlKCcuL2xpbWl0JylcbiAgLCBsaW1pdG46IHJlcXVpcmUoJy4vbGltaXQtbmQnKVxuXG4gICwgaGVhZGluZzogcmVxdWlyZSgnLi9oZWFkaW5nJylcblxuICAsIG5vcm1hbGl6ZTogcmVxdWlyZSgnLi9ub3JtYWxpemUnKVxuICAsIG5vcm1hbGl6ZW46IHJlcXVpcmUoJy4vbm9ybWFsaXplLW5kJylcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gbGVycG5cblxuZnVuY3Rpb24gbGVycG4odmVjLCBhLCBiLCBzY2FsYXIpIHtcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCBhLmxlbmd0aDsgbisrKSB7XG4gICAgdmVjW25dID0gYVtuXSArIChiW25dIC0gYVtuXSkgKiBzY2FsYXJcbiAgfVxuICByZXR1cm4gdmVjXG59XG4iLCIvKipcblxuIyMjIGBsZXJwKHZlYywgc3RhcnQsIGZpbmlzaCwgc2NhbGFyKWBcblxuU2V0IGB2ZWNgIHRvIHRoZSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHZlY3RvcnMgYHN0YXJ0YFxuYW5kIGBmaW5pc2hgOlxuXG5gYGAgamF2YXNjcmlwdFxudmFyIGxlcnAgPSByZXF1aXJlKCd2ZWN0b3JzL2xlcnAnKSgyKVxudmFyIHN0YXJ0ID0gWzAsIDBdXG52YXIgZmluaXNoID0gWzEwMCwgMTAwXVxuXG5sZXJwKFtdLCBzdGFydCwgZmluaXNoLCAwLjc1KSA9PT0gWzc1LCA3NV1cbmBgYFxuXG4qKi9cblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0b3JcblxuZnVuY3Rpb24gZ2VuZXJhdG9yKGRpbXMpIHtcbiAgZGltcyA9ICtkaW1zfDBcblxuICB2YXIgYm9keSA9IFtdXG5cbiAgYm9keS5wdXNoKCdyZXR1cm4gZnVuY3Rpb24gbGVycCcgKyBkaW1zICsgJyh2ZWMsIGEsIGIsIHNjYWxhcikgeycpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaW1zOyBpICs9IDEpIHtcbiAgICAgIGJvZHkucHVzaChcbiAgICAgICAgJ3ZlY1skXSA9IGFbJF0gKyAoYlskXSAtIGFbJF0pICogc2NhbGFyJy5yZXBsYWNlKC9cXCQvZywgaSlcbiAgICAgIClcbiAgICB9XG4gICAgYm9keS5wdXNoKCdyZXR1cm4gdmVjJylcbiAgYm9keS5wdXNoKCd9JylcblxuICByZXR1cm4gRnVuY3Rpb24oYm9keS5qb2luKCdcXG4nKSkoKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBvcGVyYXRvclxuXG5mdW5jdGlvbiBvcGVyYXRvcihuYW1lLCBvcCkge1xuICByZXR1cm4gZnVuY3Rpb24gZ2VuZXJhdG9yKGRpbXMsIG9wdHMpIHtcbiAgICBkaW1zID0gK2RpbXN8MFxuICAgIG9wdHMgPSBvcHRzIHx8IHt9XG5cbiAgICB2YXIgc2NhbGFycyA9ICdzY2FsYXJzJyBpbiBvcHRzXG4gICAgICA/IG9wdHMuc2NhbGFycyA6IHRydWVcbiAgICB2YXIgdmVjdG9ycyA9ICd2ZWN0b3JzJyBpbiBvcHRzXG4gICAgICA/IG9wdHMudmVjdG9ycyA6IHRydWVcblxuICAgIHZhciBib3RoID0gc2NhbGFycyAmJiB2ZWN0b3JzXG4gICAgdmFyIGJvZHkgPSBbXVxuXG4gICAgaWYgKCFzY2FsYXJzICYmICF2ZWN0b3JzKSB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnWW91ciBmdW5jdGlvbiBtdXN0IGFjY2VwdCBlaXRoZXIgc2NhbGFycyBvciB2ZWN0b3JzJ1xuICAgIClcblxuICAgIGJvZHkucHVzaCgncmV0dXJuIGZ1bmN0aW9uICcgKyBuYW1lICsgZGltcyArICcodmVjKSB7JylcbiAgICAgIGJvZHkucHVzaCgndmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoJylcbiAgICAgIGJvZHkucHVzaCgnd2hpbGUgKC0taSkgeycpXG4gICAgICAgIGlmIChib3RoKSBib2R5LnB1c2goJ2lmIChBcnJheS5pc0FycmF5KGFyZ3VtZW50c1tpXSkpIHsnKVxuICAgICAgICBpZiAodmVjdG9ycykge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGltczsgaSArPSAxKSB7XG4gICAgICAgICAgICBib2R5LnB1c2goJ3ZlY1snICsgaSArICddICcgKyBvcCArICc9IGFyZ3VtZW50c1tpXVsnICsgaSArICddJylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvdGgpIGJvZHkucHVzaCgnfSBlbHNlIHsnKVxuICAgICAgICBpZiAoc2NhbGFycykge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGltczsgaSArPSAxKSB7XG4gICAgICAgICAgICBib2R5LnB1c2goJ3ZlY1snICsgaSArICddICcgKyBvcCArICc9IGFyZ3VtZW50c1tpXScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChib3RoKSBib2R5LnB1c2goJ30nKVxuICAgICAgYm9keS5wdXNoKCd9JylcbiAgICAgIGJvZHkucHVzaCgncmV0dXJuIHZlYycpXG4gICAgYm9keS5wdXNoKCd9JylcblxuICAgIHJldHVybiBGdW5jdGlvbihib2R5LmpvaW4oJ1xcbicpKSgpXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gbGltaXRuXG5cbmZ1bmN0aW9uIGxpbWl0bih2ZWMsIHNjYWxhcikge1xuICB2YXIgbWFnID0gMFxuICBmb3IgKHZhciBuID0gMDsgbiA8IHZlYy5sZW5ndGg7IG4rKykge1xuICAgIG1hZyArPSB2ZWNbbl0qdmVjW25dXG4gIH1cblxuICBpZiAobWFnID4gc2NhbGFyKnNjYWxhcikge1xuICAgIG1hZyA9IE1hdGguc3FydChtYWcpXG4gICAgZm9yICh2YXIgbiA9IDA7IG4gPCB2ZWMubGVuZ3RoOyBuKyspIHtcbiAgICAgIHZlY1tuXSA9IHZlY1tuXSAqIHNjYWxhciAvIG1hZ1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2ZWNcbn1cbiIsIi8qKlxuXG4jIyMgYGxpbWl0KHZlYywgc2NhbGFyKWBcblxuTGltaXRzIHRoZSB2ZWN0b3IgYHZlY2AgdG8gYSBtYWduaXR1ZGUgb2YgYHNjYWxhcmAgdW5pdHMuXG5cbmBgYCBqYXZhc2NyaXB0XG52YXIgbGltaXQgPSByZXF1aXJlKCd2ZWN0b3JzL2xpbWl0JykoMilcblxubGltaXQoWzMsIDBdLCAyKSAgPT09IFsyLCAwXVxubGltaXQoWzMsIDRdLCAxKSAgPT09IFswLjYsIDAuOF1cbmxpbWl0KFs1LCA1XSwgMjQpID09PSBbNSwgNV1cbmBgYFxuXG4qKi9cblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0b3JcblxuZnVuY3Rpb24gZ2VuZXJhdG9yKGRpbXMpIHtcbiAgZGltcyA9ICtkaW1zfDBcblxuICB2YXIgYm9keSA9IFtdXG5cbiAgYm9keS5wdXNoKCdyZXR1cm4gZnVuY3Rpb24gbGltaXQnICsgZGltcyArICcodmVjLCBzY2FsYXIpIHsnKVxuICAgIHZhciBtYWcgPSBbXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGltczsgaSArPSAxKSB7XG4gICAgICBtYWcucHVzaCgndmVjWycgKyBpICsgJ10gKiB2ZWNbJyArIGkgKyAnXScpXG4gICAgfVxuICAgIGJvZHkucHVzaCgndmFyIG1hZyA9ICcgKyBtYWcuam9pbignKycpKVxuXG4gICAgYm9keS5wdXNoKCdpZiAobWFnID4gc2NhbGFyKnNjYWxhcikgeycpXG4gICAgICBib2R5LnB1c2goJ21hZyA9IE1hdGguc3FydChtYWcpJylcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGltczsgaSArPSAxKSB7XG4gICAgICAgIGJvZHkucHVzaCgndmVjWycgKyBpICsgJ10gPSB2ZWNbJyArIGkgKyAnXSAqIHNjYWxhciAvIG1hZycpXG4gICAgICB9XG4gICAgYm9keS5wdXNoKCd9JylcbiAgICBib2R5LnB1c2goJ3JldHVybiB2ZWMnKVxuICBib2R5LnB1c2goJ30nKVxuXG4gIHJldHVybiBGdW5jdGlvbihib2R5LmpvaW4oJ1xcbicpKSgpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IG1hZ25cblxuZnVuY3Rpb24gbWFnbih2ZWMpIHtcbiAgdmFyIHJlcyA9IDBcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCB2ZWMubGVuZ3RoOyBuKyspIHtcbiAgICByZXMgKz0gdmVjW25dKnZlY1tuXVxuICB9XG4gIHJldHVybiBNYXRoLnNxcnQocmVzKVxufVxuIiwiLyoqXG5cbiMjIyBgbWFnKHZlYylgXG5cblJldHVybnMgdGhlIG1hZ25pdHVkZSBvZiB0aGUgdmVjdG9yOlxuXG5gYGAgamF2YXNjcmlwdFxudmFyIG1hZyA9IHJlcXVpcmUoJ3ZlY3RvcnMvbWFnJykoMilcbnZhciBzcGQgPSBbMiwgNF1cblxubWFnKHNwZCkgPT09IDQuNDcyMTM1OTU0OTk5NThcbmBgYFxuXG4qKi9cblxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0b3JcblxuZnVuY3Rpb24gZ2VuZXJhdG9yKGRpbXMpIHtcbiAgZGltcyA9ICtkaW1zfDBcblxuICB2YXIgYm9keSA9IFtdXG5cbiAgYm9keS5wdXNoKCdyZXR1cm4gZnVuY3Rpb24gbWFnJyArIGRpbXMgKyAnKHZlYykgeycpXG4gICAgYm9keS5wdXNoKCdyZXR1cm4gTWF0aC5zcXJ0KCcpXG4gICAgdmFyIGNvbnRlbnRzID0gW11cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpbXM7IGkgKz0gMSkge1xuICAgICAgY29udGVudHMucHVzaCgndmVjWycgKyBpICsgJ10qdmVjWycgKyBpICsgJ10nKVxuICAgIH1cbiAgICBib2R5LnB1c2goY29udGVudHMuam9pbignKycpKVxuICAgIGJvZHkucHVzaCgnKScpXG4gIGJvZHkucHVzaCgnfScpXG5cbiAgcmV0dXJuIEZ1bmN0aW9uKGJvZHkuam9pbignXFxuJykpKClcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gbXVsdG5cblxuZnVuY3Rpb24gbXVsdG4odmVjKSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJndW1lbnRzW2ldKSkge1xuICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCB2ZWMubGVuZ3RoOyBuKyspIHtcbiAgICAgICAgdmVjW25dICo9IGFyZ3VtZW50c1tpXVtuXVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHZlYy5sZW5ndGg7IG4rKykge1xuICAgICAgICB2ZWNbbl0gKj0gYXJndW1lbnRzW2ldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHZlY1xufVxuIiwiLyoqXG5cbiMjIyBgbXVsdCh2ZWMsIG90aGVyWywgLi4uXSlgXG5cbk11dGxpcGxpZXMgdGhlIHZlY3RvciBgdmVjYCBieSBhIGBvdGhlcmAgdmFsdWU6XG5cbmBgYCBqYXZhc2NyaXB0XG52YXIgbXVsdCA9IHJlcXVpcmUoJ3ZlY3RvcnMvbXVsdCcpKDIpXG52YXIgc3BkID0gWzUsIDVdXG5cbm11bHQoc3BkLCAyKSA9PT0gWzEwLCAxMF1cbmBgYFxuXG5PciBtdWx0aXBseSBtdWx0aXBsZSBhcnJheXM6XG5cbmBgYCBqYXZhc2NyaXB0XG52YXIgcmVzID0gbXVsdChbMiwgMiwgMl0sIFs0LCA0LCA0XSlcbmNvbnNvbGUubG9nKHJlcykgLy8gWzgsIDgsIDhdXG5gYGBcblxuWW91IGNhbiBkaXNhYmxlIHRoaXMgYnkgcGFzc2luZyBgdmVjdG9yczogZmFsc2VgIHRvXG50aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uIGZvciBmYXN0ZXIgcmVzdWx0czpcblxuYGBgIGphdmFzY3JpcHRcbnZhciBzdWIgPSByZXF1aXJlKCd2ZWN0b3JzL211bHQnKSgyLCB7IHZlY3RvcnM6IGZhbHNlIH0pXG5gYGBcblxuKiovXG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvb3BlcmF0b3InKSgnbXVsdCcsICcqJylcbiIsIm1vZHVsZS5leHBvcnRzID0gbm9ybWFsaXplXG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZSh2ZWMpIHtcbiAgdmFyIG1hZyA9IDBcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCB2ZWMubGVuZ3RoOyBuKyspIHtcbiAgICBtYWcgKz0gdmVjW25dICogdmVjW25dXG4gIH1cbiAgbWFnID0gTWF0aC5zcXJ0KG1hZylcblxuICAvLyBhdm9pZCBkaXZpZGluZyBieSB6ZXJvXG4gIGlmIChtYWcgPT09IDApIHtcbiAgICByZXR1cm4gQXJyYXkuYXBwbHkobnVsbCwgbmV3IEFycmF5KHZlYy5sZW5ndGgpKS5tYXAoTnVtYmVyLnByb3RvdHlwZS52YWx1ZU9mLCAwKVxuICB9XG5cbiAgZm9yICh2YXIgbiA9IDA7IG4gPCB2ZWMubGVuZ3RoOyBuKyspIHtcbiAgICB2ZWNbbl0gLz0gbWFnXG4gIH1cblxuICByZXR1cm4gdmVjXG59XG4iLCIvKipcblxuIyMjIGBub3JtYWxpemUodmVjLCBzY2FsYXIpYFxuXG5Ob3JtYWxpemVzIHRoZSB2ZWN0b3IgKGkuZS4gc2NhbGVzIGl0IHRvIG1ha2UgaXRzXG5kaXN0YW5jZSAxIHVuaXQpLlxuXG5gYGAgamF2YXNjcmlwdFxudmFyIG5vcm1hbGl6ZSA9IHJlcXVpcmUoJ3ZlY3RvcnMvbm9ybWFsaXplJykoMilcblxubm9ybWFsaXplKFszLCAwXSkgID09PSBbMSwgMF1cbm5vcm1hbGl6ZShbNCwgM10pICA9PT0gWzAuOCwgMC42XVxuYGBgXG5cbioqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRvclxuXG5mdW5jdGlvbiBnZW5lcmF0b3IoZGltcykge1xuICBkaW1zID0gK2RpbXN8MFxuXG4gIHZhciBib2R5ID0gW11cblxuICBib2R5LnB1c2goJ3JldHVybiBmdW5jdGlvbiBub3JtYWxpemUnK2RpbXMrJyh2ZWMsIHNjYWxhcikgeycpXG4gICAgdmFyIGVscyA9IFtdXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaW1zOyBpICs9IDEpIHtcbiAgICAgIGVscy5wdXNoKCd2ZWNbJytpKyddKnZlY1snK2krJ10nKVxuICAgIH1cbiAgICBib2R5LnB1c2goJ3ZhciBtYWcgPSBNYXRoLnNxcnQoJyArIGVscy5qb2luKCcrJykgKyAnKScpXG5cbiAgICBib2R5LnB1c2goJ2lmIChtYWcgPT09IDApIHsnKVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaW1zOyBpICs9IDEpIHtcbiAgICAgICAgYm9keS5wdXNoKCd2ZWNbJytpKyddID0gMCcpXG4gICAgICB9XG4gICAgYm9keS5wdXNoKCd9IGVsc2UgeycpXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpbXM7IGkgKz0gMSkge1xuICAgICAgICBib2R5LnB1c2goJ3ZlY1snK2krJ10gLz0gbWFnJylcbiAgICAgIH1cbiAgICBib2R5LnB1c2goJ30nKVxuICAgIGJvZHkucHVzaCgncmV0dXJuIHZlYycpXG5cbiAgYm9keS5wdXNoKCd9JylcblxuICByZXR1cm4gRnVuY3Rpb24oYm9keS5qb2luKCdcXG4nKSkoKVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBzdWJuXG5cbmZ1bmN0aW9uIHN1Ym4odmVjKSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJndW1lbnRzW2ldKSkge1xuICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCB2ZWMubGVuZ3RoOyBuKyspIHtcbiAgICAgICAgdmVjW25dIC09IGFyZ3VtZW50c1tpXVtuXVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHZlYy5sZW5ndGg7IG4rKykge1xuICAgICAgICB2ZWNbbl0gLT0gYXJndW1lbnRzW2ldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHZlY1xufVxuIiwiLyoqXG5cbiMjIyBgc3ViKHZlYywgb3RoZXJbLCAuLi5dKWBcblxuU3VidHJhY3RzIHRoZSBgb3RoZXJgIHZlY3RvciBmcm9tIGB2ZWNgOlxuXG5gYGAgamF2YXNjcmlwdFxudmFyIHN1YiA9IHJlcXVpcmUoJ3ZlY3RvcnMvc3ViJykoMilcbnZhciBwb3MgPSBbMCwgMF1cbnZhciBzcGQgPSBbMSwgMS41XVxuXG5zdWIocG9zLCBzcGQpXG5zdWIocG9zLCBzcGQpXG5cbmNvbnNvbGUubG9nKHBvcykgLy8gWy0yLCAtM11cbmBgYFxuXG5PciBzdWJ0cmFjdCBhIHNjYWxhciBmcm9tIHRoZSBlbnRpcmUgYXJyYXk6XG5cbmBgYCBqYXZhc2NyaXB0XG52YXIgcmVzID0gc3ViKFs5LCA4LCA3XSwgNilcbmNvbnNvbGUubG9nKHJlcykgLy8gWzMsIDIsIDFdXG5gYGBcblxuWW91IGNhbiBkaXNhYmxlIHRoaXMgYnkgcGFzc2luZyBgc2NhbGFyczogZmFsc2VgIHRvXG50aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uIGZvciBmYXN0ZXIgcmVzdWx0czpcblxuYGBgIGphdmFzY3JpcHRcbnZhciBzdWIgPSByZXF1aXJlKCd2ZWN0b3JzL3N1YicpKDIsIHsgc2NhbGFyczogZmFsc2UgfSlcbmBgYFxuXG4qKi9cblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9vcGVyYXRvcicpKCdzdWInLCAnLScpXG4iLCIvLyAndmVjdG9ycycgbWlnaHQgbm90IGhhdmUgYmVlbiB0aGUgYmVzdCBjaG9pY2VcbnZhciB2ZWN0b3JzID0gcmVxdWlyZShcInZlY3RvcnNcIilcblxudmFyIGFkZCA9IHZlY3RvcnMuYWRkKDIpXG4gICwgbXVsdCA9IHZlY3RvcnMubXVsdCgyKVxuICAsIGNvcHkgPSB2ZWN0b3JzLmNvcHkoMilcbiAgLCBzdWIgID0gdmVjdG9ycy5zdWIoMilcbiAgLCBjcm9zcyA9IHZlY3RvcnMuY3Jvc3MoMilcbiAgLCBkb3QgPSB2ZWN0b3JzLmRvdCgyKVxuICAsIG5vcm1hbGl6ZSA9IHZlY3RvcnMubm9ybWFsaXplKDIpXG4gICwgbWFnID0gdmVjdG9ycy5tYWcoMilcbiAgLCBkaXN0ID0gdmVjdG9ycy5kaXN0KDIpXG5cbm1vZHVsZS5leHBvcnRzID0gc2ltdWxhdG9yXG5cbmZ1bmN0aW9uIGRldChwMSwgcDIpIHtcbiAgICByZXR1cm4gcDFbMF0qcDJbMV0tcDFbMV0qcDJbMF1cbn1cblxuZnVuY3Rpb24gaW50ZXJzZWN0aW9uKHMxLCBlMSwgczIsIGUyKSB7XG4gICAgdmFyIHAgPSBzMS5zbGljZSgwKTtcbiAgICB2YXIgciA9IGUxLnNsaWNlKDApO1xuICAgIHN1YihyLHMxKTtcblxuICAgIHZhciBxID0gczIuc2xpY2UoMCk7XG4gICAgdmFyIHMgPSBlMi5zbGljZSgwKTtcbiAgICBzdWIocyxzMik7XG5cbiAgICB2YXIgY3Jvc3NzID0gY3Jvc3MocixzKTtcbiAgICBzdWIocSxwKTtcbiAgICB2YXIgbnVtZXIgPSBjcm9zcyhxLHMpO1xuICAgIHZhciB0ID0gbnVtZXIvY3Jvc3NzO1xuICAgIG11bHQocix0KVxuICAgIGFkZChwLHIpO1xuXG4gICAgcmV0dXJuIHA7XG59XG5cblxuXG5mdW5jdGlvbiBzaW11bGF0b3IocG9zaXRpb24sIHZlbG9jaXR5LCBncm91bmQsIGR0LCBwb2x5LCBwb2x5SGFzR3JvdW5kKSB7XG5cbiAgICBwb2x5SGFzR3JvdW5kID0gcG9seUhhc0dyb3VuZCB8fCBmYWxzZVxuXG5cbiAgICAvLyBwb2ludHMgb24gdGhlIHBvbHlnb24gZGVmaW5pbmcgdGhlIGJveFxuICAgIC8vIHRoaXMgc2hvdWxkIHByb2JhYmx5IGJlIHBhc3NlZCBpblxuICAgIHBvbHkgPSBwb2x5LnNsaWNlKDApIHx8IFtbMSwxXSxbLTEsMV1dO1xuXG4gICAgaWYgKCFwb2x5SGFzR3JvdW5kKSB7XG4gICAgICAgIHBvbHkucHVzaChbLTEsIGdyb3VuZFswXSAqICAxIC8gZ3JvdW5kWzFdIF0pO1xuICAgICAgICBwb2x5LnB1c2goWyAxLCBncm91bmRbMF0gKiAtMSAvIGdyb3VuZFsxXSBdKTtcbiAgICB9XG5cblxuICAgIHZhciBuZXh0UG9zaXRpb24gPSBuZXcgQXJyYXkocG9zaXRpb24ubGVuZ3RoKTtcbiAgICB2YXIgbmV4dFZlbG9jaXR5ID0gbmV3IEFycmF5KHZlbG9jaXR5Lmxlbmd0aCk7XG5cbiAgICBuZXh0UG9zaXRpb24gPSBwb3NpdGlvblxuICAgIG5leHRWZWxvY2l0eSA9IHZlbG9jaXR5XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5leHRQb3NpdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBobW0sIHNlZW1zIGxpa2UgdmVjdG9ycyBkb2VzIHRoaW5ncyBpbnBsYWNlLCB3b3JrIG9mZiBjb3BpZXNcbiAgICAgICAgLy8gY2FsY3VsYXRlIG5ldyBwb3NpdGlvbnNcbiAgICAgICAgdmFyIHByZXZQb2ludCA9IG5leHRQb3NpdGlvbltpXS5zbGljZSgwKVxuICAgICAgICBhZGQobmV4dFBvc2l0aW9uW2ldLCBtdWx0KGNvcHkobmV4dFZlbG9jaXR5W2ldKSwgZHQpKVxuXG4gICAgICAgIHZhciByZW1haW5pbmdUaW1lID0gZHRcblxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgcG9pbnQgaXMgaW5zaWRlIChjb252ZXgpIHBvbHlnb25cbiAgICAgICAgZm9yICh2YXIgaiA9MDsgaiA8IHBvbHkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHZhciBwMSA9IHBvbHlbal0uc2xpY2UoMClcbiAgICAgICAgICAgIHZhciBwMiA9IHBvbHlbKGorMSklcG9seS5sZW5ndGhdLnNsaWNlKDApXG4gICAgICAgICAgICB2YXIgdjEgPSBjb3B5KHAyKVxuICAgICAgICAgICAgdmFyIHYyID0gY29weShwMilcblxuICAgICAgICAgICAgc3ViKHYxLCBwMSlcbiAgICAgICAgICAgIHN1Yih2MiwgbmV4dFBvc2l0aW9uW2ldKVxuXG4gICAgICAgICAgICBpZiAoZGV0KHYyLHYxKSA8IDApIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBiZXR0ZXIgbG9nZ2luZyBmcmFtZXdvcmsvc2VlIGlmIGNvbnNvbGUgaGFzICdkZWJ1ZycvJ2luZm8nIHN0cmVhbXNcbiAgICAgICAgICAgICAgICAvLyBtb3JlICdpbmZvcm1hdGlvbmFsJy8nZGVidWcnIHRoYW4gdHlwaWNhbCBsb2dcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiICAgIFBvaW50OiAgIFwiICsgbmV4dFBvc2l0aW9uW2ldICsgXCJcXG4gICAgQ3Jvc3NlczogXCIgKyBwMSArIFwiXFxuICAgICAgICAgICAgIFwiICsgcDIpIFxuICAgICAgICAgICAgICAgIC8vbWlycm9yIHRoZSBwb2ludCBhY3Jvc3MgdGhlIGxpbmVcbiAgICAgICAgICAgICAgICAvL2Zyb206IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvODk1NDMyNi9ob3ctdG8tY2FsY3VsYXRlLXRoZS1taXJyb3ItcG9pbnQtYWxvbmctYS1saW5lXG4gICAgICAgICAgICAgICAgdmFyIEEgPSBwMlsxXSAtIHAxWzFdXG4gICAgICAgICAgICAgICAgdmFyIEIgPSAtKHAyWzBdIC0gcDFbMF0pXG4gICAgICAgICAgICAgICAgdmFyIEMgPSAtQSAqIHAxWzBdIC0gQiAqIHAxWzBdXG5cbiAgICAgICAgICAgICAgICB2YXIgViA9IG5leHRWZWxvY2l0eVtpXS5zbGljZSgwKVxuICAgICAgICAgICAgICAgIHZhciBOID0gbm9ybWFsaXplKFstQSwgLUJdKVxuXG4gICAgICAgICAgICAgICAgLy8gJ3ZlY3RvcnMnIHNlZW1zIGEgYml0IHVnbHlcbiAgICAgICAgICAgICAgICBtdWx0KE4sMipkb3QoTixWKS9kb3QoTixOKSlcbiAgICAgICAgICAgICAgICBzdWIobmV4dFZlbG9jaXR5W2ldLCBOKVxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCIgICAgTmV3IFZlbG9jaXR5OiBcIiArIG5leHRWZWxvY2l0eVtpXSlcblxuICAgICAgICAgICAgICAgIC8vIGZpbmQgaW50ZXJzZWN0aW9uXG4gICAgICAgICAgICAgICAgdmFyIGludGVycyA9IGludGVyc2VjdGlvbihwMSwgcDIsIG5leHRQb3NpdGlvbltpXSwgcHJldlBvaW50KVxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCIgICAgSW50ZXJzZWN0aW9uOiBcIiArIGludGVycyArIFwiXFxuXCIpXG5cbiAgICAgICAgICAgICAgICByZW1haW5pbmdUaW1lID0gcmVtYWluaW5nVGltZSooMS1kaXN0KHByZXZQb2ludCxpbnRlcnMpL2Rpc3QobmV4dFBvc2l0aW9uW2ldLHByZXZQb2ludCkpXG5cbiAgICAgICAgICAgICAgICBwcmV2UG9pbnQgPSBuZXh0UG9zaXRpb25baV0uc2xpY2UoMClcbiAgICAgICAgICAgICAgICBuZXh0UG9zaXRpb25baV0gPSBpbnRlcnMuc2xpY2UoMClcbiAgICAgICAgICAgICAgICBhZGQobmV4dFBvc2l0aW9uW2ldLCBtdWx0KGNvcHkobmV4dFZlbG9jaXR5W2ldKSwgcmVtYWluaW5nVGltZSkpXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIiAgICBOZXcgcG9pbnQ6ICAgXCIgKyBuZXh0UG9zaXRpb25baV0pXG5cbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIGogPSAwIC8vd2UndmUgbW92ZWQgdGhlIHBvaW50LCBuZWVkIHRvIHJlY2hlY2sgdG8gbWFrZSBzdXJlIHdlIGRvbid0IGNyb3NzIGFueSBvdGhlciBzaWRlc1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvL2NvbnNvbGUubG9nKFwiUG9zaXRpb246IFwiICsgbmV4dFBvc2l0aW9uICsgXCIgVmVsb2NpdHk6IFwiICsgbmV4dFZlbG9jaXR5KVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcG9zaXRpb246IG5leHRQb3NpdGlvbixcbiAgICAgICAgdmVsb2NpdHk6IG5leHRWZWxvY2l0eSxcbiAgICAgICAgcG9seTogcG9seVxuICAgIH1cbn1cbiIsIlxudmFyIHNpbSA9IHJlcXVpcmUoXCIuLi9zaW11bGF0b3IuanNcIilcblxudmFyIHBvc2l0aW9uID0gW1swLCAwLjFdXVxudmFyIHZlbG9jaXR5ID0gW1sxLCAxLjBdXVxudmFyIGdyb3VuZCAgID0gWzAsIDFdXG52YXIgZHQgICAgICAgPSAwLjFcblxudmFyIHBvbHkgPSBbWzEsMV0sWy0xLDFdXVxudmFyIHBvbHlIYXNHcm91bmQgPSBmYWxzZVxuXG52YXIgbnN0YXRlID0gc2ltKHBvc2l0aW9uLCB2ZWxvY2l0eSwgZ3JvdW5kLCBkdCwgcG9seSwgcG9seUhhc0dyb3VuZClcblxudmFyIG15Q2FudmFzID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKFwiI3Zpc3VhbHNcIilcbnZhciB2ZWxvY3MgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoXCIjdmVsb2NpdHlcIilcbnZhciBwb3NGaWVsZCA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihcIiNwb3NpdGlvbnNcIilcblxubXlDYW52YXMud2lkdGggPSA0MDBcbm15Q2FudmFzLmhlaWdodCA9IDQwMFxuXG50b3BMZWZ0ID0gWy0xLCAxXSAvL25lZWRlZCB0byBzd2l0Y2ggdG8gQ2FudmFzJyBjb29yZCBzeXN0ZW1cblxudmFyIHNjYWxlID0gMjAwOyAvL3NjYWxlIHVwIGZyb20gc2ltIGNvb3JkcywgRklYTUUgc2hvdWxkIGJlIGR5bmFtaWNcblxudmFyIGNvbnRleHQgPSBteUNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcblxuY29uc29sZS5sb2cobnN0YXRlLnBvbHkubGVuZ3RoKVxuXG5mdW5jdGlvbiBkcmF3Qm94KCkge1xuZm9yICh2YXIgaT0wOyBpIDwgbnN0YXRlLnBvbHkubGVuZ3RoOyBpKyspIHtcbiAgICBjb250ZXh0Lm1vdmVUbyhzY2FsZSooLXRvcExlZnRbMF0rbnN0YXRlLnBvbHlbaV1bMF0pLHNjYWxlKih0b3BMZWZ0WzFdLW5zdGF0ZS5wb2x5W2ldWzFdKSlcbiAgICBjb250ZXh0LmxpbmVUbyhzY2FsZSooLXRvcExlZnRbMF0rbnN0YXRlLnBvbHlbKGkrMSklbnN0YXRlLnBvbHkubGVuZ3RoXVswXSksc2NhbGUqKHRvcExlZnRbMV0tbnN0YXRlLnBvbHlbKGkrMSklbnN0YXRlLnBvbHkubGVuZ3RoXVsxXSkpXG59XG5cbmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBcIiMwMDBcIlxuY29udGV4dC5zdHJva2UoKTtcbn1cblxuZnVuY3Rpb24gdHJhbnNmb3JtQ29vcmRzKHgseSxzY2FsZSx0TCkge1xuICAgIHJldHVybiBbc2NhbGUqKHgtdExbMF0pLCBzY2FsZSoodExbMV0teSldXG59XG5cbmZ1bmN0aW9uIGRyYXdQb2ludChwb2ludCkge1xuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgY29udGV4dC5hcmMocG9pbnRbMF0sIHBvaW50WzFdLCA1LDAsMipNYXRoLlBJKTtcbiAgICBjb250ZXh0LmNsb3NlUGF0aCgpO1xufVxuXG5mdW5jdGlvbiBkcmF3UG9pbnRzKCkge1xuICAgIC8vcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXdQb2ludHMpXG4gICAgLy9jb250ZXh0LmNsZWFyUmVjdCgwLDAsbXlDYW52YXMud2lkdGgsbXlDYW52YXMuaGVpZ2h0KTtcbiAgICBkcmF3Qm94KCk7XG4gICAgbnN0YXRlID0gc2ltKHBvc2l0aW9uLCB2ZWxvY2l0eSwgZ3JvdW5kLCBkdCwgcG9seS5zbGljZSgwKSwgcG9seUhhc0dyb3VuZCk7XG4gICAgcG9zaXRpb24gPSBuc3RhdGUucG9zaXRpb247XG4gICAgdmVsb2NpdHkgPSBuc3RhdGUudmVsb2NpdHk7XG5cbiAgICBmb3IgKHZhciBpPTA7IGkgPCBuc3RhdGUucG9zaXRpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZHJhd1BvaW50KHRyYW5zZm9ybUNvb3Jkcyhuc3RhdGUucG9zaXRpb25baV1bMF0sIG5zdGF0ZS5wb3NpdGlvbltpXVsxXSwgc2NhbGUsIHRvcExlZnQpKVxuICAgICAgICB2ZWxvY3MuaW5uZXJIVE1MID0gbnN0YXRlLnZlbG9jaXR5W2ldXG4gICAgfVxufVxuXG5kcmF3UG9pbnQoWzMwLDMwXSlcblxuZnVuY3Rpb24gcGFyc2VGaWVsZChkYXRhKSB7XG4gICAgLy9yZWdleDpcbiAgICAvLyAtPyAgICAgICAgOiBvcHRpb25hbCBtaW51cyBzaWduXG4gICAgLy8gW1xcZFxcLl0rICAgOiBvbmUgb3IgbW9yZSBkaWdpdHMgb3IgLlxuICAgIC8vIFteXFxkXFwuXSsgIDogb25lIG9yIG1vcmUgY2hhcmFjdGVycyB0aGF0IGFyZW4ndCBkaWdpdHMgb3IgLlxuICAgIHJldHVybiBkYXRhLm1hdGNoKC8tP1tcXGRcXC5dK1teXFxkXFwuXSstP1tcXGRcXC5dKy9nKS5tYXAoZnVuY3Rpb24oeCl7cmV0dXJuIHguc3BsaXQoL1teXFxkXFwuLV0vKX0pXG59XG5cbmZ1bmN0aW9uIGNoZWNrUG9zaXRpb25zKGV2ZW50KSB7XG4gICAgZGF0YSA9IHBhcnNlRmllbGQocG9zRmllbGQudmFsdWUpXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgZm9yICh2YXIgaT0wOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBkcmF3UG9pbnQodHJhbnNmb3JtQ29vcmRzKGRhdGFbaV1bMF0sZGF0YVtpXVsxXSxzY2FsZSwgdG9wTGVmdCkpXG4gICAgfVxufVxuXG5wb3NGaWVsZC5hZGRFdmVudExpc3RlbmVyKFwib25LZXlVcFwiLGNoZWNrUG9zaXRpb25zKVxuXG5zZXRJbnRlcnZhbChkcmF3UG9pbnRzLDEwMDAqZHQpXG4iXX0=
;