export function BackgroundMan() {
	const entities = Game.ecs.getEntitiesByComponents('Background').entities;

	return {
		update: (delta, currentTime) => {
			entities.forEach(e => {
				e.getComponents().forEach((v, k) => {
					if (k !== 'Background') {
						v.render(delta, currentTime);
					}
				});
			});
		}
	};
}
