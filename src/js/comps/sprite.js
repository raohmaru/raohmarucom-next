import Rectangle from '../geom/rectangle.js';

export class Sprite {
	constructor(view, x, y) {
		this.view = view;
		this.x = x;
		this.y = y;
		this.width = view.canvas.width;
		this.height = view.canvas.height;
		this.rect = new Rectangle();
	}

	getBounds() {
		this.rect.x      = this.x - this.width / 2;
		this.rect.y      = this.y - this.height / 2;
		this.rect.width  = this.width;
		this.rect.height = this.height;
		return this.rect;
	}

	dispose() {
		this.view.destroy();
		this.view = null;
	}
};
