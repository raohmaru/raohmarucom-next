function nothing() {}

export class Collision {
	constructor(cb) {
		this.cb = cb || nothing;
	}

	hit() {
		this.cb();
	}

	dispose() {
		this.cb = null;
	}
};
