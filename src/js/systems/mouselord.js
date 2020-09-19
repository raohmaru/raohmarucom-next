import { Movement, MouseMovement } from '../comps/index.js';

const max = Math.max;

export function MouseLord() {
	const entities = Game.ecs.getEntitiesByComponents(Movement, MouseMovement).entities;

	return {
		update: (delta, currentTime) => {
			let mv, mmv;
			entities.forEach(e => {
				mmv = e.getComponent(MouseMovement);
				mv = e.getComponent(Movement);
				mmv.update(delta);
				if (mmv.x !== undefined) {
					mv.x = mmv.x;
				}
				if (mmv.y !== undefined) {
					mv.y = mmv.y;
				}
			});
		}
	};
}
