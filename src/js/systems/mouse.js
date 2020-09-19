import EventSignal from '../util/event-signal.js';

export function Mouse(canvas) {
	const api = EventSignal();
	api.mouseDown = false;

	canvas.addEventListener('click', onClick);
	canvas.addEventListener('mousedown', onMouseDown);
	canvas.addEventListener('mouseup', onMouseUp);
	canvas.addEventListener('mousemove', onMouseMove);

	canvas.addEventListener('touchstart', onMouseDown);
	canvas.addEventListener('touchend', onMouseUp);
	canvas.addEventListener('touchcancel', onMouseUp);
	canvas.addEventListener('touchmove', onMouseMove);

	function onClick(e) {
		api.fire(e.type);
	}

	function onMouseDown(e) {
		api.mouseDown = true;
	}

	function onMouseUp(e) {
		api.mouseDown = false;
	}

	function onMouseMove(e) {
		let x;
		let y;
		if (e.touches) {
			x = e.touches[0].clientX;
			y = e.touches[0].clientY;
		} else {
			x = e.clientX;
			y = e.clientY;
		}
		api.x = x / Game.stage.options.scale;
		api.y = y / Game.stage.options.scale;
	}

	return api;
}
