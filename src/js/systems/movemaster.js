// const max = Math.max;

export function MoveMaster() {
	const entities = Game.ecs.getEntitiesByComponents('Sprite', 'Movement').entities;

	return {
		update: (delta, currentTime) => {
			let sp, mv;

			entities.forEach(e => {
				sp = e.getComponent('Sprite');
				mv = e.getComponent('Movement');
				if (mv.x !== undefined) {
					let dx = (mv.x - sp.x) / 10 + sp.x;
					// const x1 = sp.x < dx ? sp.x : dx;
					// const x2 = sp.x > dx ? sp.x : dx;
					if (dx < mv.left) {
						dx = mv.left;
					} else if (dx > mv.right) {
						dx = mv.right;
					}
					sp.x = dx;
				}
				if (mv.y !== undefined) {
					// const y1 = sp.y < mv.y ? sp.y : mv.y;
					// const y2 = sp.y > mv.y ? sp.y : mv.y;
					sp.y = mv.y;
				}
				// const w = max(x2 - x1, sp.width);
				// const h = max(y2 - y1, sp.height);
			});
		}
	};
}
