const PI = Math.PI;
const pow = Math.pow;
const sin = Math.sin;

export default {
	In: (k) => {
		if (k === 0) {
			return 0;
		}
		if (k === 1) {
			return 1;
		}
		return -pow(2, 10 * (k - 1)) * sin((k - 1.1) * 5 * PI);
	},
	Out: (k) => {
		if (k === 0) {
			return 0;
		}
		if (k === 1) {
			return 1;
		}
		return pow(2, -10 * k) * sin((k - 0.1) * 5 * PI) + 1;
	},
	InOut: (k) => {
		if (k === 0) {
			return 0;
		}
		if (k === 1) {
			return 1;
		}
		k *= 2;
		if (k < 1) {
			return -0.5 * pow(2, 10 * (k - 1)) * sin((k - 1.1) * 5 * PI);
		}
		return 0.5 * pow(2, -10 * (k - 1)) * sin((k - 1.1) * 5 * PI) + 1;
	}
};
