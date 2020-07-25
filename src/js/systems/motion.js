import Paprika from '../libs/paprika/paprika.js';

export default function Motion() {
	const paprika = new Paprika();

	return {
		update: (delta, currentTime) => {
			paprika.update(currentTime);
		},

		add: (spice) => {
			paprika.add(spice);
			spice.start(Game.beat.now());
		},
		
		stop: () => {
			paprika.clear();
		}
	};
}
