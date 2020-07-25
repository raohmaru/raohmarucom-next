export default {
	In: (k) => {
		return k * k;
	},
	Out: (k) => {
		return k * (2 - k);
	},
	InOut: (k) => {
		if ((k *= 2) < 1) {
			return 0.5 * k * k;
		}
		return - 0.5 * (--k * (k - 2) - 1);
	}
};
