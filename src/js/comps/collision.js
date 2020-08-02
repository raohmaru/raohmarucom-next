export class Collision {
	constructor(cb) {
		this.cb = cb;
	}

	hit() {
		this.cb();
	}

	dispose() {
		this.cb = null;
	}
};
