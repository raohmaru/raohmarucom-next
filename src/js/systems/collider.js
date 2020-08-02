function getColorInt(data) {
	return data[0] + data[1] + data[2];
}

export function Collider() {
	const entities = Game.ecs.getEntitiesByComponents('Sprite', 'Collision').entities;
	const stage = Game.stage;

	return {
		update: (delta, currentTime) => {
			let b;
			entities.forEach(e => {
				b = e.getComponent('Sprite').getBounds();
				if (
					getColorInt(stage.getPixel(b.x, b.y).data)          !== 0 ||
					getColorInt(stage.getPixel(b.right, b.y).data)      !== 0
					// getColorInt(stage.getPixel(b.right, b.bottom).data) !== 0 ||
					// getColorInt(stage.getPixel(b.x, b.right).data)      !== 0
				) {
					e.getComponent('Collision').hit();
				}
			});
		}
	};
}
