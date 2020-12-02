const PI = Math.PI;
const pow = Math.pow;
const sin = Math.sin;

export default {
	In(t) {
		if (t === 0) {
			return 0;
		}
		if (t === 1) {
			return 1;
		}
		return -pow(2, 10 * (t - 1)) * sin((t - 1.1) * 5 * PI);
	},
	Out(t) {
		if (t === 0) {
			return 0;
		}
		if (t === 1) {
			return 1;
		}
		return pow(2, -10 * t) * sin((t - 0.1) * 5 * PI) + 1;
	},
	InOut(t) {
		if (t === 0) {
			return 0;
		}
		if (t === 1) {
			return 1;
		}
		t *= 2;
		if (t < 1) {
			return -0.5 * pow(2, 10 * (t - 1)) * sin((t - 1.1) * 5 * PI);
		}
		return 0.5 * pow(2, -10 * (t - 1)) * sin((t - 1.1) * 5 * PI) + 1;
	}
};
