import Scene from './scene.js';

export default class Game1 extends Scene {
	constructor() {
		super();
		this.init();
	}

	init() {
		console.log('Game 1');
	}

	update(delta) {
	}
}
