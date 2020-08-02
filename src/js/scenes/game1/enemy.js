import { randomInt } from '../../util/math.js';
const lineWidth = 2;
const style = {
	fillStyle: '#d96c00',
	strokeStyle: '#9b9b8c',
	lineWidth
};
const styleClear = {
	fillStyle: '#000000',
	strokeStyle: '#000000',
	lineWidth
};

export default function(size, x1, x2) {
	const x = randomInt(x1 + size + lineWidth, x2 - size - lineWidth);
	Game.stage.rect(x, 0, size, size, style);

	Game.motion.add({
		duration: randomInt(100, 1000),
		onComplete: () => {
			Game.stage.rect(x, 0, size, size, styleClear);
		}
	});
};
