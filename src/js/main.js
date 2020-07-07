(function(){

// http://sampsonblog.com/749/simple-throttle-function
function throttle(callback, limit) {
	let wait = false;
	return (...args) => {
		if (!wait) {
			callback.apply(callback, args);
			wait = true;
			window.setTimeout(() => {
				wait = false;
			}, limit);
		}
	}
}

function initCanvas() {
	const canvas = document.querySelector('.bgcanvas');
	let cnvWidth;
	let cnvHeight;
	if(canvas && canvas.getContext){
		ctx = canvas.getContext('2d');
		start();
	} else {
		return;
	}

	function start() {
		resizeCanvas();
		window.addEventListener('resize', throttle(resizeCanvas, 50), false);
	}

	function resizeCanvas() {
		canvas.width  = cnvWidth  = window.innerWidth;
		canvas.height = cnvHeight = window.innerHeight;
	}

	function draw() {
		ctx.clearRect(0, 0, cnvWidth, cnvHeight);
		ctx.fillStyle = '#268ad9';
		ctx.fillRect(0, 0, cnvWidth, cnvHeight);
		window.requestAnimationFrame(draw);
	}
}

function init() {
	initCanvas();
}

init();

})();
