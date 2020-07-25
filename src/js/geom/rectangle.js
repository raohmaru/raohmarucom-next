export default class Rectangle {
	constructor(width, height, x = 0, y = 0) {
		this.width  = width;
		this.height = height;
		this.x      = x;
		this.y      = y;
	}

	get top() {
		return this.y;
	}

	get right() {
		return this.x + this.width;
	}

	get bottom() {
		return this.y + this.height;
	}

	get left() {
		return this.y;
	}

	get area() {
		const a = this.width * this.height;
		return a > 0 ? a : 0;
	}

	clone() {
		return new Rectangle(this.width, this.height, this.x, this.y);
	}

	toArray() {
		return [this.x, this.y, this.width, this.height];
	}
}
