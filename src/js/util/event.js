// http://sampsonblog.com/749/simple-throttle-function
export function throttle(callback, limit) {
	let wait = false;
	return (...args) => {
		if (!wait) {
			callback.apply(callback, args);
			wait = true;
			window.setTimeout(() => {
				wait = false;
			}, limit);
		}
	}
}

export function once(el, event, cb) {
	const fun = (e) => {
		cb(e);
		el.removeEventListener(event, fun);
	}
	el.addEventListener(event, fun);
}
