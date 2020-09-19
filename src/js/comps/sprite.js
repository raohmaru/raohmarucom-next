import Rectangle from '../geom/rectangle.js';

export class Sprite {
	constructor(view, x, y) {
		this.view = view;
		this.x = x;
		this.y = y;
		this.width = view.canvas.width;
		this.height = view.canvas.height;
		this.rect = new Rectangle(this.width, this.height, 0, 0);
	}

	update(delta, currentTime) {
		this.view.update && this.view.update(delta, currentTime);
	}

	getBounds() {
		this.rect.x = this.x - this.width / 2;
		this.rect.y = this.y - this.height / 2;
		return this.rect;
	}

	dispose() {
		this.view.destroy();
		this.view = null;
	}
};
