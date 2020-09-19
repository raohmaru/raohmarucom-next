import ExplosionSprite from './explosion-sprite.js';
import { Sprite } from '../../comps/index.js';

function done() {
	Game.ecs.destroyEntity('explosion');
}

export function Explosion(x, y) {
	Game.ecs
		.createEntity('explosion')
		.addComponents(
			new Sprite(new ExplosionSprite(100, done), x, y)
		);
};
