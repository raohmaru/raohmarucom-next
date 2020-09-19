import { Sprite } from '../comps/index.js';

export function Renderer() {
	const entities = Game.ecs.getEntitiesByComponents(Sprite).entities;

	return {
		update: (delta, currentTime) => {
			let sp, b;
			entities.forEach(e => {
				sp = e.getComponent(Sprite);
				sp.update(delta, currentTime);
				if (sp.view) {
					b = sp.getBounds();
					Game.stage.drawImage(sp.view.canvas, b.x, b.y);
				}
			});
		}
	};
}
