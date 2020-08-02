import Scene from './scene.js';
import { $ } from '../util/dom.js';
import { Background, Transition } from '../comps/index.js';

export default class Intro extends Scene {
	constructor() {
		super();
		this.init();
	}

	init() {
		Game.ecs
			.createEntity('transition')
			.addComponents(
				new Background(),
				new Transition(
					Game.stage.width / 2,
					Game.stage.height / 2 - 30,
					20,
					'#ffffff',
					Game.scene.next
				)
			);
	}

	end(delta) {
		Game.ecs.destroyEntity('transition');
		$('.container').classList.add('hidden');
	}
}
