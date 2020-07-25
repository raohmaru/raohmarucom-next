export default function Paprika() {
	const spices = new Map();
	return {
		clear: function() {
			spices.forEach((spice) => spice.dispose() );
			spices.clear();
		},

		add: function(spice) {
			spices.set(spice.id, spice);
		},

		update: function(time) {
			if (!spices.size) {
				return;
			}
			time = time || window.performance.now();
			spices.forEach((spice, key) => {
				if (!spice.update(time)) {
					spices.delete(key);
					spice.dispose();
				}
			});
		}
	};
}
