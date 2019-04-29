(function(){

function rndInt(min, max) {
	if(!max) {
		if(!min) {
			min = 1;
		}
		max = min;
		min = 0;
	}
	if(min === max) {
		return min;
	}
	return parseInt( Math.round( Math.random()*(max-min) + min ), 10 );
}

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

function initBG() {
	// const SHAPE_COLOR = 'rgba(255, 255, 255)';
	const canvas = document.querySelector('.bgcanvas');
	const wfmin = 20;
	const wfmax = 40;
	// const hfmin = 10;
	// const hfmax = 20;
	const fps = 60 / 30 | 0;
	let cnvWidth;
	let cnvHeight;
	let ctx;
	let x;
	let y;
	let w = 1;
	let h = 1;
	let frame = 0;
	let dx = 0;
	let dy = 0;
	let erase = false;
	let paused = false;
	// let gradient;
	// let offCanvas;
	// let offCtx;

	if(canvas && canvas.getContext){
		ctx = canvas.getContext('2d');
		offCanvas = document.createElement('canvas');
		offCtx = offCanvas.getContext('2d');
		start();
	} else {
		return;
	}

	ctx.globalAlpha = 0.2;

	function start() {
		resizeCanvas();
		draw();
		window.addEventListener('mousemove', throttle(mousemoveListener, 50));
		window.addEventListener('resize', resizeCanvas, false);
		window.addEventListener('keyup', onKeyUp);
		document.querySelector('.home__logo').addEventListener('click', reset);
	}

	function resizeCanvas() {
		canvas.width  = /* offCanvas.width  = */ cnvWidth  = window.innerWidth;
		canvas.height = /* offCanvas.height = */ cnvHeight = window.innerHeight;
		// gradient = ctx.createLinearGradient(0,0, cnvWidth,cnvHeight);
		// gradient.addColorStop(0, 'rgba(113, 53,  95, 0.05)');
		// gradient.addColorStop(1, 'rgba(38, 138, 217, 0.05)');
	}

	function mousemoveListener(e) {
		if(!paused) {
			drawForm(e.clientX, e.clientY);
			dx = (cnvWidth/2  - e.clientX) / 2;
			dy = (cnvHeight/2 - e.clientY) / 2;
		}
	}

	function drawForm(cx, cy) {
		w = h = rndInt(wfmin, wfmax);
		// h = rndInt(hfmin, hfmax);
		x = cx + rndInt(-15, 15);
		y = cy + rndInt(-15, 15);
		// Odd numbers only
		if (x%2 === 1) x += 1;
		if (y%2 === 1) y += 1;

		ctx.fillStyle = `rgb(${rndInt(55,205)}, ${rndInt(55,205)}, ${rndInt(55,205)})`;
		ctx.fillRect(x, y, w, h);
	}

	function draw() {
		if (frame++ % fps == 0 && !paused) { // framerate
			// offCtx.clearRect(0, 0, cnvWidth, cnvHeight);
			// offCtx.globalAlpha = 0.1;
			// offCtx.drawImage(canvas, dx, dy);
			// ctx.globalCompositeOperation = 'destination-out';
			ctx.drawImage(canvas, dx, dy);
			// ctx.globalCompositeOperation = 'source-over';
			// ctx.fillStyle = gradient;
			// ctx.fillRect(0, 0, cnvWidth, cnvHeight);
		}
		window.requestAnimationFrame(draw);
	}
	
	function onKeyUp(e) {
		// console.log(e);
		const key = e.key.toLowerCase();
		if(key === 'c') {
			erase = !erase;
			ctx.globalCompositeOperation = erase ? 'overlay' : 'source-over';
			ctx.globalAlpha = erase ? 0.1 : 0.1;
		}
		else if(key === 'p') {
			paused = !paused;
		}
	}
	
	function reset(e) {
		ctx.clearRect(0, 0, cnvWidth, cnvHeight);
	}
}

function init() {
	initBG();
	setTimeout(() => document.querySelector('.footer').classList.add('footer__anim'), 1000);
}

init();

})();
