import Signal from '../util/signal.js';

export default function Keyboard(canvas) {
	const keys = {};
	const signals = {};
	// Making the canvas focusable enables the keyboard events on it
	canvas.setAttribute('tabindex', '1');
	canvas.focus();
	canvas.addEventListener('keydown', onKeyDown);
	canvas.addEventListener('keyup', onKeyUp);

	function onKeyDown(e) {
		const code = e.code;
		keys[code] = true;
		signals[code] && signals[code]();
	}

	function onKeyUp(e) {
		keys[e.code] = false;
	}

	return {
		keys,
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
}
