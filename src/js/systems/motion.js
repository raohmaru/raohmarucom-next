import Paprika from '../libs/paprika/paprika.js';
import Spice from '../libs/paprika/spice.js';
import Recipe from '../libs/paprika/recipe.js';

export function Motion() {
	const paprika = new Paprika();

	return {
		update: (delta, currentTime) => {
			paprika.update(currentTime);
		},

		add: (spice) => {
			if (!(spice instanceof Spice) && !(spice instanceof Recipe)) {
				spice = new Spice(spice);
			}
			paprika.add(spice);
			spice.start(Game.beat.now());
		},

		stop: () => {
			paprika.clear();
		},

		timeline: (cb) => {
			return new Recipe(cb);
		},

		create: (params) => {
			return new Spice(params);
		}
	};
}
