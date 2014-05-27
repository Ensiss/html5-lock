/*!
 * HTML5 lock
 * Copyright(c) 2014 Gautier Fauchart <gautier.fauchart@gmail.com>
 * MIT Licensed
 */

function PianoLock(config, callback){

    var size = Math.min(config.width, config.height);
    
    var stage = new Kinetic.Stage({
	container: config.container,
	width: size,
	height: size
    });
    
    var layer = new Kinetic.Layer();
    var code = "";

    var onValidation = null;
    function startTimer(){
	onValidation = setTimeout(function(){
	    callback(CryptoJS.SHA256(code).toString(CryptoJS.enc.Hex));
	    code = "";
	}, 1600);
    }
    function stopTimer(){
	if (onValidation)
	    clearTimeout(onValidation);
    }

    function onKeyPressed(evt){

	/**
	 * annimate key pressed
	 */
	if (config.display != false){
	    var oldColor = this.getFill();
	    this.setFill("yellow");
	    layer.draw();
	    setTimeout(function(){
		evt.target.setFill(evt.target.attrs.originFill)
		layer.draw();
	    }, 200);
	}

	if (config.sound != false)
	    evt.target.audio.play(); 
	evt.target.audio = new Audio(evt.target.path);

	stopTimer();
	startTimer();
	code += evt.target.note;
    }

    var size = 7;
    var circleCtnrSize = stage.width() / size;

    var notes = ["do", "re", "mi", "fa", "sol", "la", "si"]
    for (var i = 0; i < size; i++){
	var key = new Kinetic.Rect({
	    x: (i * circleCtnrSize),
	    y: 0,
	    width : circleCtnrSize,
	    height: stage.getHeight(),
	    fill: 'white',
	    originFill : 'white',
	    stroke: 'black',
	    cornerRadius : 6
	});

	var note = notes.shift();
	key.note = note;
	key.path = "dist/sounds/" + note + ".ogg";
	key.audio = new Audio(key.path);
	key.on('mousedown', onKeyPressed);
	layer.add(key);
    }

    var blackKeySize =  circleCtnrSize * 0.6;
    var notes = ["re_flat", "mi_sharp", "sol_flat", "la_sharp", "si_sharp"]
    for (var i = 0; i < 6; i++){
	if (i == 2)
	    continue;
	var key = new Kinetic.Rect({
	    x: ((i +1) * circleCtnrSize) - (blackKeySize / 2),
	    y: 0,
	    width : blackKeySize,
	    height: stage.getHeight() * 0.6,
	    fill: 'black',
	    originFill : 'black',
	});
	var note = notes.shift();
	key.path = "dist/sounds/" + note + ".ogg";
	key.audio = new Audio(key.path);
	key.on('mousedown', onKeyPressed);
	layer.add(key);	
    }   
    
    stage.add(layer);   
}
