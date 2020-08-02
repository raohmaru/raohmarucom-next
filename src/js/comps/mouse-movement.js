export class MouseMovement {
	constructor(xAxis = true, yAxis = true) {
		this.x = undefined;
		this.y = undefined;
		this.xAxis = xAxis;
		this.yAxis = yAxis;
	}

	update(delta) {
		if (Game.input.mouse.mouseDown) {
			if (this.xAxis) {
				this.x = Game.input.mouse.x;
			}
			if (this.yAxis) {
				this.y = Game.input.mouse.y;
			}
		} else {
			if (this.x !== undefined) {
				this.x = undefined;
			}
			if (this.y !== undefined) {
				this.y = undefined;
			}
		}
	}
};
