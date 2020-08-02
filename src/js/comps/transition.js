export class Transition {
	constructor(x, y, lineWidth, color, cb) {
		this.x = x;
		this.y = y;
		this.lineWidth = lineWidth;
		this.cb = cb;
		this.radius = 1;
		this.maxRadius = Math.max(Game.stage.width, Game.stage.height);
		this.style = {
			strokeStyle: color,
			lineWidth: lineWidth + 1
		};
		Game.stage.circle(
			x,
			y,
			lineWidth,
			{
				fillStyle: color
			}
		);
	}

	render(delta) {
		this.radius += this.lineWidth;
		Game.stage.circle(
			this.x,
			this.y,
			this.radius,
			this.style
		);
		if(this.radius > this.maxRadius + 100) {
			this.cb();
			this.cb = null;
		}
	}
};
