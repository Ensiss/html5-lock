html5-lock
==========

html5 lock library using kineticjs

## Download
* [Compact build](https://raw.githubusercontent.com/gfauchart/html5-lock/master/dist/html5lock-compact.min.js) including kineticjs and sha256
* [light build](https://raw.githubusercontent.com/gfauchart/html5-lock/master/dist/html5lock.min.js)

### Documentation

```js
new PatternLock.js({
    container: "container",
    width: 600,
    height: 600
}, function(code){
    alert(code)
});
```

