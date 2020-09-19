import { Background } from '../comps/index.js';

export function BackgroundMan() {
	const entities = Game.ecs.getEntitiesByComponents(Background).entities;

	return {
		update: (delta, currentTime) => {
			entities.forEach(e => {
				e.getComponent(Background).render(delta, currentTime);
			});
		}
	};
}
