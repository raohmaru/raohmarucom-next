const style = {
	strokeStyle: '#ffffff',
	lineWidth: 10
};

export class Road {
	constructor(x1, x2) {
		this.x1 = x1 - style.lineWidth / 2;
		this.x2 = x2 + style.lineWidth / 2;
		this.y = 0
	}

	render(delta) {
		if(this.y < Game.stage.height) {
			const y = this.y;
			this.y += .4 * delta;
			Game.stage.line(this.x1, y, this.x1, this.y, style);
			Game.stage.line(this.x2, y, this.x2, this.y, style);
		}
	}
};
