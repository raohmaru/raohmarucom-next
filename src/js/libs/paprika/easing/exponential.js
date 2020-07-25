const pow = Math.pow;

export default {
	In: (k) => {
		return k === 0 ? 0 : pow(1024, k - 1);
	},
	Out: (k) => {
		return k === 1 ? 1 : 1 - pow(2, - 10 * k);
	},
	InOut: (k) => {
		if (k === 0) {
			return 0;
		}
		if (k === 1) {
			return 1;
		}
		if ((k *= 2) < 1) {
			return 0.5 * pow(1024, k - 1);
		}
		return 0.5 * (- pow(2, - 10 * (k - 1)) + 2);
	}
};
