import Signal from '../util/signal.js';

export function Mouse(canvas) {
	const signals = {};
	const api = {
		mouseDown: false,
		on: (event, cb) => {
			if (!signals[event]) {
				signals[event] = new Signal(cb);
				signals[event](cb);
			}
		},
		off: (event, cb) => {
			if (signals[event]) {
				if (cb) {
					signals[event].remove(cb);
				} else {
					signals[event].clear();
				}
			}
		}
	}
	canvas.addEventListener('click', onClick);
	canvas.addEventListener('mousedown', onMouseDown);
	canvas.addEventListener('mouseup', onMouseUp);
	canvas.addEventListener('mousemove', onMouseMove);

	function onClick(e) {
		signals[e.type] && signals[e.type]();
	}

	function onMouseDown(e) {
		api.mouseDown = true;
	}

	function onMouseUp(e) {
		api.mouseDown = false;
	}

	function onMouseMove(e) {
		api.x = e.clientX / Game.stage.options.scale;
		api.y = e.clientY / Game.stage.options.scale;
	}

	return api;
}
