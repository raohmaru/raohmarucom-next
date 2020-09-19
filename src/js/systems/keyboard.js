import EventSignal from '../util/event-signal.js';

export function Keyboard(canvas) {
	const api = EventSignal();
	// Making the canvas focusable enables the keyboard events on it
	canvas.setAttribute('tabindex', '1');
	canvas.focus();
	canvas.addEventListener('keydown', onKeyDown);
	canvas.addEventListener('keyup', onKeyUp);

	function onKeyDown(e) {
		const code = e.code;
		api[code] = true;
		api.fire(code);
	}

	function onKeyUp(e) {
		api[e.code] = false;
	}

	return api;
}
