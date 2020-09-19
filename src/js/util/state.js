import Signal from './signal.js';

function createStateFrom(obj, res) {
	Object.keys(obj).forEach((k) => {
		if (typeof obj[k] === 'object') {
			res[k] = {};
			return createStateFrom(obj[k], res[k]);
		}
		res[k] = {
			change: new Signal(),
			set: function(v) {
				this.value = v;
				this.change(v);
			},
			value: obj[k]
		};
	});
	return res;
}

export default function state(obj) {
	return createStateFrom(obj, {});
}
