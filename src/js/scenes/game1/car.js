import CarSprite from './car-sprite.js';
import Cubic from '../../libs/paprika/easing/cubic.js';
import { Sprite, Movement, MouseMovement, Collision } from '../../comps/index.js';

export function Car(x1, x2) {
	const size = Game.cfg.carSize;
	const sp = new Sprite(new CarSprite(size), Game.stage.width / 2, Game.stage.height);
	const mv = new Movement(x1 + size, x2 - size);
	const ent = Game.ecs
		.createEntity('car')
		.addComponents(sp, mv);

	const api = {
		appear: () => {
			Game.motion.add({
				from: { y: sp.y },
				to: { y: sp.y - Game.stage.height / 3 },
				duration: 1000,
				easing: Cubic.Out,
				onUpdate: (p, model) => {
					mv.y = model.y;
				}
			});
		},

		start: () => {
			ent.addComponents(
				new MouseMovement(true, false),
				new Collision(() => console.log('Car hit'))
			);
		},

		stop() {
			ent.removeComponents(MouseMovement, Collision);
			sp.x = Game.stage.width / 2;
			sp.y = Game.stage.height;
			mv.reset();
		},

		destroy() {
			Game.ecs.destroyEntity('car');
			ent = null;
			sp = null;
			mv = null;
		}
	};

	Object.defineProperty(api, 'x', {
		get: () => sp.x
	});

	Object.defineProperty(api, 'y', {
		get: () => sp.y
	});

	return api;
};
