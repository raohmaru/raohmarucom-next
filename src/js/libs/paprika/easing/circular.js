const sqrt = Math.sqrt;

export default {
	In: (k) => {
		return 1 - sqrt(1 - k * k);
	},
	Out: (k) => {
		return sqrt(1 - (--k * k));
	},
	InOut: (k) => {
		if ((k *= 2) < 1) {
			return - 0.5 * (sqrt(1 - k * k) - 1);
		}
		return 0.5 * (sqrt(1 - (k -= 2) * k) + 1);
	}
};
