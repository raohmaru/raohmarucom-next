const PI = Math.PI;
const cos = Math.cos;
const sin = Math.sin;

export default {
	In: (k) => {
		return 1 - cos(k * PI / 2);
	},
	Out: (k) => {
		return sin(k * PI / 2);
	},
	InOut: (k) => {
		return 0.5 * (1 - cos(PI * k));
	}
}
