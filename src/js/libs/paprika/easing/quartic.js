export default {
	In: (k) => {
		return k * k * k * k;
	},
	Out: (k) => {
		return 1 - (--k * k * k * k);
	},
	InOut: (k) => {
		if ((k *= 2) < 1) {
			return 0.5 * k * k * k * k;
		}
		return - 0.5 * ((k -= 2) * k * k * k - 2);
	}
};
