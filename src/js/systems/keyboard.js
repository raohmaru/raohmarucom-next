import Signal from '../util/signal.js';

export function Keyboard(canvas) {
	const signals = {};
	const api = {
		on: (key, cb) => {
			if (!signals[key]) {
				signals[key] = new Signal();
				signals[key](cb);
			}
		},
		off: (key, cb) => {
			if (signals[key]) {
				if (cb) {
					signals[key].remove(cb);
				} else {
					signals[key].clear();
				}
			}
		}
	};
	// Making the canvas focusable enables the keyboard events on it
	canvas.setAttribute('tabindex', '1');
	canvas.focus();
	canvas.addEventListener('keydown', onKeyDown);
	canvas.addEventListener('keyup', onKeyUp);

	function onKeyDown(e) {
		const code = e.code;
		api[code] = true;
		signals[code] && signals[code]();
	}

	function onKeyUp(e) {
		api[e.code] = false;
	}

	return api;
}
