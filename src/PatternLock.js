/*!
 * HTML5 lock
 * Copyright(c) 2014 Gautier Fauchart <gautier.fauchart@gmail.com>
 * MIT Licensed
 */

function PatternLock(config, callback){

    var size = Math.min(config.width, config.height);

    var stage = new Kinetic.Stage({
	container: config.container,
	width: size,
	height: size
    });
    
    var layer = new Kinetic.Layer();

    var background = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: size,
	height: size,
    });
    layer.add(background);
    

    var selectionActive = false;
    var selected = [];
    var lines = [];

    var size = config.size;
    var circleCtnrSize = stage.width() / size;
    
    for (var i = 0; i < size; i++){
	for (var j = 0; j < size; j++){
	    var circle = new Kinetic.Circle({
		x: (i * circleCtnrSize) + (circleCtnrSize / 2),
		y: (j * circleCtnrSize) + (circleCtnrSize / 2),
		radius: ((circleCtnrSize / 2) * 0.45) | 0,
		fill: 'green',
		stroke: 'black',
		strokeWidth: 4,
		code : i+""+j
	    });
	    
	    layer.add(circle);
	     
	    circle.tween = new Kinetic.Tween({
		node: circle,
		scaleX: 2,
		scaleY: 2,
		easing: Kinetic.Easings.EaseOut,
		duration: 0.8
	    });
	    
	    circle.on('mouseover touchstart', function(evt) {
		evt.target.tween.play();
		if (selectionActive){
		    for (i in  selected){
			if (selected[i] == evt.target)
			    return;
		    }
		    selected.push(evt.target);
		    if (selected.length > 1){
			var from = selected[selected.length - 1];
			var to = selected[selected.length - 2];
			var line = new Kinetic.Line({
			    points: [from.getX(), from.getY(), to.getX(), to.getY()],
			    stroke: 'red',
			    strokeWidth: 15,
			    lineCap: 'round',
			    lineJoin: 'round'
			});
			lines.push(line);
			layer.add(line);
		    }
		} else {
		    selected = [evt.target];
		}
	    });
	    
	    circle.on('mouseout touchend', function(evt) {
		if (!selectionActive){
		    evt.target.tween.reverse();
		    selected = [];
		}
	    });
	}
    }

    stage.on('mousedown', function() {
    	selectionActive = true;
    });

    stage.on('mouseup', function() {
    	selectionActive = false;
	for (i in lines){
	    lines[i].destroy();
	}
	if (selected.length > 1){
	    var pre = "SALT";
	    for (i in selected){
		pre += selected[i].attrs.code;
	    }
	    var code = CryptoJS.SHA256(pre).toString(CryptoJS.enc.Hex);
	    callback(code);
	}
	for (i in selected){
	    selected[i].tween.reverse();
	}
	lines = [];
	selected = [];
    });
    stage.add(layer);   
}
