import { create, drop } from '../../render/index.js';

const style = {
	fillStyle: '#54568e',
	lineWidth: 2,
	strokeStyle: '#2b84d0'
};

export default function(size) {
	const canvas = create(size, size);
	canvas.clear(style);

	return {
		canvas,
		destroy: () => {
			drop(canvas);
		}
	};
};
