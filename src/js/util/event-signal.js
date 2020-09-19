import Signal from './signal.js';

export default function EventSignal() {
	const signals = {};

    return {
		on: (name, cb) => {
			if (!signals[name]) {
				signals[name] = new Signal();
				signals[name](cb);
			}
		},
		off: (name, cb) => {
			if (signals[name]) {
				if (cb) {
					signals[name].remove(cb);
				} else {
					signals[name].clear();
				}
			}
		},
		fire: (name) => {
			signals[name] && signals[name]();
		}
	};
}
