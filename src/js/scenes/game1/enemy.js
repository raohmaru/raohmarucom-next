import cfg from '../../cfg.js';
import { randomInt } from '../../util/math.js';

const lineWidth = 2;
const style = {
	fillStyle: '#d96c00',
	strokeStyle: '#9b9b8c',
	lineWidth
};
const styleClear = {
	fillStyle: cfg.bgcolor,
	strokeStyle: cfg.bgcolor,
	lineWidth
};

export function Enemy(size, x, y) {
	Game.stage.rect(x, y, size, size, style);

	// Enemy length
	Game.motion.add({
		duration: randomInt(100, 1000),
		onComplete: () => {
			Game.stage.rect(x, 0, size, size, styleClear);
		}
	});
};
