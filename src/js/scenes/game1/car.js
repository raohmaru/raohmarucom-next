import CarSprite from './car-sprite.js';
import Cubic from '../../libs/paprika/easing/cubic.js';
import { Sprite, Movement, MouseMovement, Collision } from '../../comps/index.js';

export default function(carSize, x1, x2) {
	const sp = new Sprite(new CarSprite(carSize), Game.stage.width / 2, Game.stage.height);
	const mv = new Movement(x1, x2);
	const e = Game.ecs
		.createEntity('car')
		.addComponents(sp, mv);

	Game.motion.add({
		from: { y: sp.y },
		to: { y: sp.y - Game.stage.height / 3 },
		duration: 1000,
		easing: Cubic.Out,
		onUpdate: (p, model) => {
			mv.y = model.y;
		}
	});

	const onHit = () => {
		console.log('hit!');
	};

	return {
		move: () => {
			e.addComponents(
				new MouseMovement(true, false),
				new Collision(onHit)
			);
		},

		destroy() {
			Game.ecs.destroyEntity('car');
			e = null;
			sp = null;
			mv = null;
		}
	};
};
