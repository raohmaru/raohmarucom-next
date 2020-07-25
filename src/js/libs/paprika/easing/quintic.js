export default {
	In: (k) => {
		return k * k * k * k * k;
	},
	Out: (k) => {
		return --k * k * k * k * k + 1;
	},
	InOut: (k) => {
		if ((k *= 2) < 1) {
			return 0.5 * k * k * k * k * k;
		}
		return 0.5 * ((k -= 2) * k * k * k * k + 2);
	}
};
