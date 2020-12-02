const PI = Math.PI;
const cos = Math.cos;
const sin = Math.sin;

export default {
	In(t) {
		return 1 - cos(t * PI / 2);
	},
	Out(t) {
		return sin(t * PI / 2);
	},
	InOut(t) {
		return 0.5 * (1 - cos(PI * t));
	}
}
