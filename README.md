html5-lock
==========

html5 lock library using kineticjs

## Download
* [Compact build](https://raw.githubusercontent.com/gfauchart/html5-lock/master/dist/html5lock-compact.min.js) including kineticjs and sha256
* [light build](https://raw.githubusercontent.com/gfauchart/html5-lock/master/dist/html5lock.min.js)

## Documentation

### pattern lock

```js
new PatternLock({
    container: "container",
    width: 600,
    height: 600,
    size: 3, // Number of points, default 4
    slices: 4, // Number of sides of the points, default 100 (for a circle)
    amplitude: 0.5, // Amplitude of the waves, default 0
    frequency: 20, // Frequency of the waves, default 0
    rotation: 90 // Rotation of the shapes, in degrees, default 0
}, function(code){  // on input code
    alert(code)
});
```

### piano lock

```js
new PianoLock({
    container : "container",
    width : 400,
    height: 400,
    sound : false, // default true
    display : false // default true
}, function(code){ // on input code
    alert(code)
});
```
