import cfg from '../../cfg.js';
import { create, drop } from '../../render/index.js';

const style1 = {
	fillStyle: '#ffffff'
};
const style2 = {
	fillStyle: cfg.bgcolor
};

export default function(size, cb) {
	const maxRadius = size / 2;
	let canvas = create(size, size);
	let radius = 0;
	let step = 0;

	return {
		canvas,
		update: () => {
			if (step === 0) {
				if (++radius < maxRadius - 1) {
					radius++;
					canvas.circle(maxRadius, maxRadius, radius, style1);
				} else {
					radius = 0;
					step++;
				}
			} else if (step === 1) {
				if (++radius < maxRadius) {
					radius++;
					canvas.circle(maxRadius, maxRadius, radius, style2);
				} else {
					cb();
					step++;
				}
			}
		},
		destroy: () => {
			drop(canvas);
			canvas = null;
		}
	};
};
