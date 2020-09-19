export class Movement {
	constructor(left, right) {
		this.x = undefined;
		this.y = undefined;
		this.left = left;
		this.right = right;
	}

	reset() {
		this.x = undefined;
		this.y = undefined;
	}
};
