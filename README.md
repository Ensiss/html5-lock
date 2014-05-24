html5-lock
==========

html5 lock library using kineticjs

## Download
* [Compact build](https://raw.githubusercontent.com/gfauchart/html5-lock/master/dist/html5lock-compact.min.js) including kineticjs and sha256
* [light build](https://raw.githubusercontent.com/gfauchart/html5-lock/master/dist/html5lock.min.js)

### Documentation

```js
new PatternLock({
    container: "container",
    width: 600,
    height: 600,
    size : 4
}, function(code){
    alert(code)
});
```

