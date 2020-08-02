import Scene from './scene.js';
import Road from './game1/road.js';
import Car from './game1/car.js';
import Enemy from './game1/enemy.js';
import { Background, Transition } from '../comps/index.js';
import { $ } from '../util/dom.js';
import { randomBool } from '../util/math.js';

const boundLeft = 20;
const carSize = 10;
let spriteCount = 0;
let speed = 5;
let boundRight;

export default class Game1 extends Scene {
	constructor() {
		super();
		this.init();
	}

	init() {
		$('.container').classList.add('hidden');
		Game.ecs
			.createEntity('transition')
			.addComponents(
				new Background(),
				new Transition(
					Game.stage.width / 2,
					Game.stage.height / 2 - 30,
					20,
					'#000000',
					this.start.bind(this)
				)
			);
	}

	start() {
		boundRight = Game.stage.width - boundLeft;
		Game.ecs.destroyEntity('transition');
		Game.ecs.registerComponents(Road);
		Game.ecs
			.createEntity('road')
			.addComponents(
				new Background(),
				new Road(boundLeft, boundRight)
			);

		setTimeout(() => {
			this.car = new Car(carSize, boundLeft + carSize, boundRight - carSize);
		}, 1500);

		setTimeout(() => {
			this._started = true;
			this.car.move();
		}, 2500);
	}

	update(delta) {
		if (this._started) {
			Game.stage.redraw(0, speed);
			if (randomBool(.05)) {
				new Enemy(carSize, boundLeft, boundRight);
			}
		}
	}

	end() {
		Game.ecs.destroyEntity('road');
		this.car.destroy();
	}
}
