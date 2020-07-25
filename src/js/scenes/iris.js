import Scene from './scene.js';
import { $ } from '../util/dom.js';

const lineWidth = 20;
const color = '#ffffff';
const style = {
	strokeStyle: color,
	lineWidth: lineWidth + 1
};

export default class Intro extends Scene {
	constructor() {
		super();
		this.x = Game.stage.width / 2;
		this.y = Game.stage.height / 2 - 30;
		this.radius = 1;
		this.maxRadius = Math.max(window.innerWidth, window.innerHeight);
		this.init();
	}

	init() {
		Game.stage.circle(
			this.x,
			this.y,
			lineWidth,
			{
				fillStyle: color
			}
		);
	}

	update(delta) {
		this.radius += lineWidth;
		Game.stage.circle(
			this.x,
			this.y,
			this.radius,
			style
		);
		if(this.radius > this.maxRadius + 100) {
			$('.container').classList.add('hidden');
			Game.scene.next();
		}
	}
}
