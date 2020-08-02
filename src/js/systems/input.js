import { Keyboard } from './keyboard.js';
import { Mouse } from './mouse.js';

export function Input(canvas) {
	return {
		keys: Keyboard(canvas),
		mouse: Mouse(canvas)
	};
}
