import Point from '../geom/point.js';
import { randomInt, randomBool } from '../util/math.js';

const style = {
	strokeStyle: '#ffffff',
	lineWidth: 2
};
const vel = 1;

export class Dot {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.v = new Point();
		this.style = {
			strokeStyle: ['#ffffff', '#6f3761', '#585188', '#416bac', '#2b84d1'][randomInt(4)],
			lineWidth: [6,8,10][randomInt(2)]
		}
		this.changeDir();
	}

	render(delta, currentTime) {
		if ((currentTime | 0) % 30 === 0) {
			this.changeDir();
		}
		const {x, y} = this;
		this.x += this.v.x;
		this.y += this.v.y;
		Game.stage.line(
			x,
			y,
			this.x,
			this.y,
			this.style
		);
	}

	changeDir() {
		let x = 0;
		let y = 0;
		if (randomBool()) {
			x = this.v.x;
			x = x === 0 ? vel * [-1, 1][randomInt()] : x;
		}
		if (x === 0) {
			y = this.v.y;
			y = y === 0 ? vel * [-1, 1][randomInt()] : y;
		}
		// draw square line cap
		if(this.v.x !== x || this.v.y !== y) {
			const w = this.style.lineWidth;
			Game.stage.rect(this.x - w/2, this.y - w/2, w, w, {
				fillStyle: this.style.strokeStyle
			});
		}
		this.v.x = x;
		this.v.y = y;
	}
};
