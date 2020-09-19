import cfg from '../cfg.js';
import Scene from './scene.js';
import { Road, Car, Enemy, Explosion } from './game1/index.js';
import { Renderer, MoveMaster, MouseLord, Collider } from '../systems/index.js';
import { Background, Transition } from '../comps/index.js';
import { $ } from '../util/dom.js';
import { randomBool, randomInt, clamp } from '../util/math.js';

let speed = 0.3;
let boundLeft;
let boundRight;

export default class Game1 extends Scene {
	constructor() {
		super();
		this.init();
	}

	init() {
		$('.container').classList.add('hidden');
		this._paused = true;

		Game.ecs.addSystems(
			new MouseLord(),
			new MoveMaster(),
			new Collider(),
			new Renderer()
		);
		Game.ecs.getSystem(Collider).on(this.damage.bind(this));

		Game.ecs
			.createEntity('transition')
			.addComponents(
				new Background(
					new Transition(
						Game.stage.width / 2,
						Game.stage.height / 2 - 30,
						20,
						cfg.bgcolor,
						this.start.bind(this)
					)
				)
			);
	}

	start() {
		boundLeft = clamp(Game.stage.width - 360, 0, 20);
		boundRight = Game.stage.width - boundLeft;
		Game.ecs.destroyEntity('transition');
		Game.ecs.registerComponents(Road, Explosion);
		Game.ecs
			.createEntity('road')
			.addComponents(
				new Background(new Road(boundLeft, boundRight)),
			);

		setTimeout(() => {
			this.car = new Car(boundLeft, boundRight);
			this.car.appear();
		}, 1500);

		setTimeout(() => {
			this._paused = false;
			this.car.start();
		}, 2500);

		Game.state.hits.change((v) => {
			console.log(v, Game.state.hits.value);
		});
	}

	restart() {
		this.car.appear();
		setTimeout(() => {
			this._paused = false;
			this.car.start();
		}, 1000);
	}

	update(delta) {
		if (!this._paused) {
			Game.stage.redraw(0, speed * delta);
			if (randomBool(.05)) {
				this.addEnemy();
			}
		}
	}

	addEnemy() {
		const size = Game.cfg.enemySize;
		const x = randomInt(boundLeft + size, boundRight - size);
		new Enemy(size, x, 0);
	}

	damage() {
		this._paused = true;
		Game.state.hits.set(Game.state.hits.value - 1);
		new Explosion(this.car.x, this.car.y);
		this.car.stop();
		setTimeout(this.restart.bind(this), 1500);
	}

	end() {
		Game.ecs.destroyEntity('road');
		this.car.destroy();
	}
}
